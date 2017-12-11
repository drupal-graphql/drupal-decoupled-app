// @flow

import Cookies from 'universal-cookie';

export const storeUserToken = (token, cookieSource = undefined) => {
  const cookies = new Cookies(cookieSource);
  cookies.set('token', token, { path: '/' });
};

export const removeUserToken = (cookieSource = undefined) => {
  const cookies = new Cookies(cookieSource);
  cookies.remove('token', { path: '/' });
};

export const getUserToken = (cookieSource = undefined) => {
  const cookies = new Cookies(cookieSource);
  return cookies.get('token');
};
