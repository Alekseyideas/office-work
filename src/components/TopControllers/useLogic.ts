import React from 'react';
import { Store } from '../../store';
import { IStore } from '../../store/types';
import { ISelectData } from '../ui/Select';
import { EmplDepSelect } from './helpers';

export const useLogic = () => {
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

  return {
    departments,
    employees,
    setCurrentDep,
    setCurrentEmp,
    currentDep,
    currentEmp,
  };
};
