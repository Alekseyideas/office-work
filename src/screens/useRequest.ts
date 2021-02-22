import moment from 'moment';
import React from 'react';
import { Store } from '../store';
import { IStore } from '../store/types';

export const useRequest = (startDate: Date) => {
  const [reserved, setReserved] = React.useState<number[]>([]);
  const { store } = React.useContext<IStore>(Store);
  React.useEffect(() => {
    if (store.users && store.users[0]) {
      const tableIds: number[] = [];
      store.users.forEach((user) => {
        const selectedDate = moment(startDate).format('YYYY MM DD');
        const userReservedDate = moment(user.dateReserve).format('YYYY MM DD');
        if (selectedDate === userReservedDate) {
          tableIds.push(+user.numberTable);
        }
        setReserved(tableIds);
      });
    }
  }, [store.users, startDate]);

  return {
    reserved,
    setReserved
  };
};
