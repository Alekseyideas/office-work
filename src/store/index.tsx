import React from 'react';
import reducer, { initialModalState } from './reducer';
import { IState, IStore } from './types';

const initialState: IState = {
  user: null,
  users: [],
  myRequests: [],
  loading: false,
  modal: initialModalState,
  page: 'home',
};

export const Store = React.createContext<IStore>({
  store: initialState,
  dispatch: {
    type: '',
    payload: null,
  },
});

export function StoreProvider(props: any): JSX.Element {
  const [store, dispatch] = React.useReducer(reducer, initialState);
  return <Store.Provider value={{ store, dispatch }}>{props.children}</Store.Provider>;
}
