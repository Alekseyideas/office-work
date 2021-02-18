import React from 'react';
import styled from 'styled-components';
import { ButtonDefault, Select } from '../ui';
import { useLogic } from './useLogic';

interface TopControllersProps {}

export const TopControllers: React.FC<TopControllersProps> = React.memo(({}) => {
  const {
    departments,
    employees,
    setCurrentDep,
    setCurrentEmp,
    currentDep,
    currentEmp,
  } = useLogic();

  // const []
  return (
    <WrapperS>
      <BtnsWrapperS>
        <ButtonDefault title="Створити заявку" onClick={() => console.log(1111)} />
        <ButtonDefault title="Мої Заявки" onClick={() => console.log(1111)} />
      </BtnsWrapperS>
      <SelectsWrapperS>
        <Select
          data={departments}
          placeholder="Департамент"
          title={(currentDep && currentDep.title) || ''}
          selectHandler={(itm) => setCurrentDep(itm)}
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
});

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
