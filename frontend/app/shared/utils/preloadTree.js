// @flow

import reactTreeWalker from 'react-tree-walker';

export const preloadApolloQueries = (
  element: React$Element<any>,
  instance: React$Component<any, any, any>,
  context: Object,
  previous: boolean | Promise<boolean>,
  schedule: (boolean | Promise<boolean>) => void,
): boolean | Promise<boolean> => {
  // Check if the current component is an Apollo query wrapper.
  if (instance && typeof instance.fetchData === 'function') {
    // Execute the graphql query for this component.
    const fetch = instance.fetchData();

    if (fetch) {
      // Once the fetching is done, run another tree walker cycle.
      schedule(Promise.resolve(fetch).then(() => true));

      // Do not continue with the current component tree.
      return Promise.reject(false);
    }
  }

  return previous;
};

export const preloadUniversalComponents = (
  element: React$Element<any>,
  instance: React$Component<any, any, any>,
  context: Object,
  previous: boolean | Promise<boolean>,
  schedule: (boolean | Promise<boolean>) => void,
): boolean | Promise<boolean> => {
  // Check if the current component is a react-universal-component wrapper.
  if (
    __CLIENT__ &&
    element &&
    element.type &&
    typeof element.type.preload === 'function'
  ) {
    // Preload the component.
    const preload = element.type.preload();

    if (preload) {
      // Once the loading is done, run another tree walker cycle.
      schedule(Promise.resolve(preload).then(() => true));

      // Do not continue with the current component tree.
      return Promise.reject(false);
    }
  }

  return previous;
};

const preloadTree = (
  rootElement: React$Element<any>,
  rootContext: Object = {},
  visitRoot: boolean = true,
  preloadFns: Array<Function> = [
    preloadUniversalComponents,
    preloadApolloQueries,
  ],
): Promise<void> => {
  const scheduled = [];

  const nodeVisitor = (element, instance, context) => {
    if (visitRoot && element !== rootElement) {
      const schedule = (repeat: boolean | Promise<boolean>) => {
        // TODO: Theoretically, we could support a race of multiple promises.
        scheduled.push(() =>
          Promise.race([repeat]).then(result =>
            preloadTree(element, context, result),
          ),
        );
      };

      return preloadFns
        .reduce((sequence, fn) => sequence.then(result =>
            fn(element, instance, context, result, schedule),
          ), Promise.resolve(true))
        .catch((reason = false) => {
          if (reason instanceof Error) {
            throw reason;
          }

          return !!reason;
        });
    }

    return true;
  };

  return reactTreeWalker(rootElement, nodeVisitor, rootContext).then(() =>
    Promise.all(
      scheduled.map(
        // $FlowIgnore
        Function.prototype.call,
        Function.prototype.call,
      ),
    ),
  );
};

export default preloadTree;
