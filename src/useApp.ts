import React from 'react';
import { useApi } from './hooks/useApi';
import { Store } from './store';
import { StoreAction } from './store/StoreAction';
import { IStore, IUser } from './store/types';

export const useApp = () => {
  const { store, dispatch } = React.useContext<IStore>(Store);
  const { getUser, getUsers } = useApi();
  const Actions = React.useCallback(() => new StoreAction(dispatch), [dispatch]);

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
