import { IntrospectionResultData } from 'apollo-cache-inmemory';

declare global {
  const __INTROSPECTION__: IntrospectionResultData;

  // tslint:disable-next-line:interface-name
  interface Window {
    __API__: string;
  }
}
