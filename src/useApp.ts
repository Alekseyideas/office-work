import React from 'react';
import { Store } from './store';
import { StoreAction } from './store/StoreAction';
import { IStore } from './store/types';
import { callApi } from './utils/callApi';

export const useApp = () => {
  const { dispatch } = React.useContext<IStore>(Store);
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
  return {};
};
