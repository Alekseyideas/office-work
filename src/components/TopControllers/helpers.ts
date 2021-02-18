import { IUser } from '../../store/types';
import { ISelectData } from '../ui/Select';

const defVal: ISelectData = { value: '0', title: 'Всi', id: 0 };

export const EmplDepSelect = {
  users: [] as IUser[],
  employeesSelect: [{ ...defVal, title: 'Всi спiвробiтники' }] as ISelectData[],
  departmentsSelect: [{ ...defVal, title: 'Всi департаменти' }] as ISelectData[],
  cash: {} as { [key: string]: 1 },

  set setUsers(data: IUser[]) {
    this.users = data;
  },

  get selectData() {
    this.users.forEach((user) => {
      const id = user.id;
      if (!this.cash[user.department]) {
        this.cash[user.department] = 1;
        this.departmentsSelect.push({ id, value: user.department, title: user.department });
      }

      if (!this.cash[user.email]) {
        this.cash[user.email] = 1;
        this.employeesSelect.push({ id, value: user.email, title: user.fio });
      }
    });

    return {
      employeesSelect: this.employeesSelect,
      departmentsSelect: this.departmentsSelect,
    };
  },
};
