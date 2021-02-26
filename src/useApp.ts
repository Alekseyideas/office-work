import React from 'react';
import { useApi } from './hooks/useApi';
import { Store } from './store';
import { StoreAction } from './store/StoreAction';
import { IStore } from './store/types';

export const useApp = ({ email }: { email: string }) => {
  const { dispatch } = React.useContext<IStore>(Store);
  const { getUsers, getMyReq } = useApi();
  const Actions = React.useCallback(() => new StoreAction(dispatch), [dispatch]);

  const init = React.useCallback(async () => {
    try {
      Actions().setLoading(true);
      Actions().setUser({ email });
      await getMyReq(email);
      await getUsers();
    } catch (error) {
      Actions().openModal({ title: 'Error', open: true, message: JSON.stringify(error) });
    } finally {
      Actions().setLoading(false);
    }
  }, [getMyReq, getUsers, Actions, email]);

  React.useEffect(() => {
    init();
  }, [init]);

  return {};
};
