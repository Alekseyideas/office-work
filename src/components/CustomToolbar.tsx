import React from 'react';
import styled from 'styled-components';
import { Chevron } from './svgs/Chevron';
import { BtnIconS } from './ui/Buttons';

export const CustomToolbar: React.FC<any> = ({ onNavigate, label }) => {
  return (
    <WrapperS>
      <BtnLeftS onClick={() => onNavigate('PREV')}>
        <Chevron />
      </BtnLeftS>
      <LabelS>{label}</LabelS>
      <BtnRightS onClick={() => onNavigate('NEXT')}>
        <Chevron />
      </BtnRightS>
    </WrapperS>
  );
};

const WrapperS = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 30px;
`;

const LabelS = styled.h3`
  text-transform: uppercase;
`;

const BtnS = styled(BtnIconS)`
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 8px 10px 5px;
  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.4);
  }
  &:active {
    border: 1px solid rgba(0, 0, 0, 0.8);
  }
`;

const BtnLeftS = styled(BtnS)`
  svg {
    transform: rotate(90deg);
  }
`;
const BtnRightS = styled(BtnS)`
  svg {
    transform: rotate(-90deg);
  }
`;
