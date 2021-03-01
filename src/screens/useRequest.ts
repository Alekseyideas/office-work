import moment from 'moment';
import React from 'react';
import { Store } from '../store';
import { IStore, IUser } from '../store/types';

export const useRequest = (startDate: Date) => {
  const [reserved, setReserved] = React.useState<number[]>([]);
  const { store } = React.useContext<IStore>(Store);

  const getReserved = React.useCallback((users: IUser[], date: Date): number[] => {
    const tableIds: number[] = [];
    users.forEach((user) => {
      const selectedDate = moment(date).format('YYYY MM DD');
      const userReservedDate = moment(user.dateReserve).format('YYYY MM DD');
      if (selectedDate === userReservedDate) {
        tableIds.push(+user.numberTable);
      }
    });
    return tableIds;
  }, []);

  React.useEffect(() => {
    if (store.users && store.users[0]) {
      const tableIds = getReserved(store.users, startDate);
      setReserved(tableIds);
    }
  }, [store.users, getReserved, startDate]);

  return {
    reserved,
    setReserved,
    getReserved,
  };
};
