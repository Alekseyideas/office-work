import React from 'react';
import { Store } from './store';
import { StoreAction } from './store/StoreAction';
import { IStore, IUser } from './store/types';
import { callApi } from './utils/callApi';

export const useApp = () => {
  const { dispatch, store } = React.useContext<IStore>(Store);
  const Actions = React.useCallback(() => new StoreAction(dispatch), [dispatch]);

  const getUser = React.useCallback(async () => {
    try {
      const user = await callApi('get', '/user.json');
      Actions().setUser(user);
    } catch (error) {
      console.log(error);
    }
  }, [Actions]);

  const getUsers = React.useCallback(async () => {
    try {
      const users = await callApi('get', '/users.json');
      if (users && users[0]) {
        Actions().setUsers(users);
      } else {
        throw Error(`Error to get users - ${users}`);
      }
    } catch (error) {
      console.log(error);
    }
  }, [Actions]);

  const init = React.useCallback(async () => {
    try {
      Actions().setLoading(true);
      await getUser();
      await getUsers();
    } catch (error) {
      Actions().openModal({ title: 'Error', open: true, message: JSON.stringify(error) });
    } finally {
      Actions().setLoading(false);
    }
  }, [getUser, getUsers, Actions]);

  React.useEffect(() => {
    init();
  }, [init]);

  React.useEffect(() => {
    if (
      store.user &&
      store.user.email &&
      store.users &&
      Array.isArray(store.users) &&
      store.users[0]
    ) {
      const data: IUser[] = store.users.filter(
        (userInner) => userInner.email === store.user?.email
      );

      Actions().setMyRequests(data);
    }
  }, [store.user, store.users, Actions]);
  return {};
};
