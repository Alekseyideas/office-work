import moment from 'moment';
import React from 'react';
import { Store } from '../store';
import { StoreAction } from '../store/StoreAction';
import { IStore } from '../store/types';
import { callApi } from '../utils/callApi';

export const useApi = () => {
  const { dispatch } = React.useContext<IStore>(Store);
  const Actions = React.useCallback(() => new StoreAction(dispatch), [dispatch]);
  const monthNum = moment(new Date()).format('MM');

  const getUser = React.useCallback(async () => {
    try {
      const user = await callApi('get', '/user.json');
      Actions().setUser(user);
    } catch (error) {
      console.log(error);
    }
  }, [Actions]);

  const getUsers = React.useCallback(
    async (month: string = monthNum) => {
      try {
        const users = await callApi('get', `/data-${month}.json`);
        if (users && users[0]) {
          Actions().setUsers(users);
        } else {
          throw Error(`Error to get users - ${users}`);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [Actions]
  );
  return {
    getUser,
    getUsers,
  };
};
