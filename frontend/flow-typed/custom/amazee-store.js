import type { Store } from 'redux';

declare type AmazeeStore<S, A> = Store<S, A> & {
  asyncReducers: Object,
  apolloClient: any,
};
