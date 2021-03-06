import React from 'react';
import styled from 'styled-components';
import { Store } from '../../store';
import { StoreAction } from '../../store/StoreAction';
import { IStore, IUser } from '../../store/types';
import { ButtonDefault, Select } from '../ui';
import { useLogic } from './useLogic';

export type TFilter = 'department' | 'employee';

interface TopControllersProps {
  showMyRequestsHandler: () => void;
  filterHandler: (users: IUser[]) => void;
}

export const TopControllers: React.FC<TopControllersProps> = React.memo(
  ({ showMyRequestsHandler, filterHandler }) => {
    const { dispatch } = React.useContext<IStore>(Store);
    const Actions = new StoreAction(dispatch);
    const {
      departments,
      employees,
      setCurrentDep,
      setCurrentEmp,
      currentDep,
      currentEmp,
    } = useLogic(filterHandler);

    // const []
    return (
      <WrapperS>
        <BtnsWrapperS>
          <ButtonDefault title="Створити заявку" onClick={() => Actions.setPage('createRequest')} />
          <ButtonDefault title="Мої Заявки" onClick={showMyRequestsHandler} />
        </BtnsWrapperS>
        <SelectsWrapperS>
          <Select
            data={departments}
            placeholder="Департамент"
            title={(currentDep && currentDep.title) || ''}
            selectHandler={setCurrentDep}
          />
          <Select
            placeholder="Співробітник"
            data={employees}
            title={(currentEmp && currentEmp.title) || ''}
            selectHandler={setCurrentEmp}
          />
        </SelectsWrapperS>
      </WrapperS>
    );
  }
);

const WrapperS = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BtnsWrapperS = styled.div`
  display: flex;
  align-items: center;

  button {
    &:first-child {
      margin-right: 15px;
    }
  }
`;
const SelectsWrapperS = styled.div`
  display: flex;
  align-items: center;

  & > div {
    &:first-child {
      margin-right: 15px;
    }
  }
`;
