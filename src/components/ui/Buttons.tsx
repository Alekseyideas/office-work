import React from 'react';
import styled from 'styled-components';
import { BORDER_RADIUS, COLORS } from '../../utils/config';

interface ButtonProps {
  title: string | React.Component;
  onClick: () => void;
  styles?: React.CSSProperties;
  disabled?: boolean;
}

export const ButtonDefault: React.FC<ButtonProps> = ({ title, onClick, styles, disabled }) => {
  return (
    <BtnDefS onClick={onClick} style={styles ? styles : {}} disabled={disabled}>
      {title}
    </BtnDefS>
  );
};

const BtnDefS = styled.button`
  color: ${COLORS.default};
  border: 1px solid ${COLORS.default};
  background: white;
  padding: 10px 20px;
  box-shadow: none;
  border-radius: ${BORDER_RADIUS};
  font-size: 16px;
  cursor: pointer;
  outline: 0;

  &:hover {
    color: white;
    background: ${COLORS.default};
    box-shadow: none;
    border: 1px solid ${COLORS.default};
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

export const BtnIconS = styled(BtnDefS)`
  padding: 10px;
  background: none;
  border: 0;

  &:hover {
    color: ${COLORS.default};
    background: none;
    box-shadow: none;
    border: 0;
    opacity: 0.8;
  }
`;
