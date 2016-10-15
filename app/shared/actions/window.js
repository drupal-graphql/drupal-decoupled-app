/**
 * window action creator
 *
 * @flow
 */

// Resize action type.
export const RESIZE       : string = 'window/resize';

// Resize action creator.
export const windowResize = (window: Window) => ({
  type    : RESIZE,
  payload : {
    width  : window.innerWidth,
    height : window.innerHeight,
  },
});
