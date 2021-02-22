import React from 'react';
import { Store } from '../../store';
import { IStore, IUser } from '../../store/types';
import { ISelectData } from '../ui/Select';
import { EmplDepSelect } from './helpers';

export const useLogic = (filterHandler: (users: IUser[]) => void) => {
  const { store } = React.useContext<IStore>(Store);
  const [departments, setDepartments] = React.useState<ISelectData[]>([]);
  const [currentDep, setCurrentDep] = React.useState<ISelectData | null>(null);
  const [employees, setEmployees] = React.useState<ISelectData[]>([]);
  const [currentEmp, setCurrentEmp] = React.useState<ISelectData | null>(null);

  React.useEffect(() => {
    if (store.users && Array.isArray(store.users) && store.users[0]) {
      EmplDepSelect.setUsers = store.users;
      const { departmentsSelect, employeesSelect } = EmplDepSelect.selectData;

      setDepartments(departmentsSelect);
      setEmployees(employeesSelect);
    }
  }, [store.users]);

  React.useEffect(() => {
    if (currentDep || currentEmp) {
      const users = store.users.filter((userInner) => {
        if (currentDep && currentDep.id !== 0 && currentEmp && currentEmp.id !== 0) {
          return userInner.department === currentDep.title && userInner.fio === currentEmp.title;
        }
        if (currentDep && currentDep.id !== 0) {
          return userInner.department === currentDep.title;
        }
        if (currentEmp && currentEmp.id !== 0) {
          return userInner.fio === currentEmp.title;
        }
        return true;
      });

      filterHandler(users);
    }
  }, [currentDep, currentEmp, store.users]);

  return {
    departments,
    employees,
    setCurrentDep,
    setCurrentEmp,
    currentDep,
    currentEmp,
  };
};
