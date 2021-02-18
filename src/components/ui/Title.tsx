import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../utils/config';

interface TitleProps {
  title: string;
}

export const Title: React.FC<TitleProps> = ({ title }) => {
  return <TitleS>{title}</TitleS>;
};

const TitleS = styled.h2`
  color: ${COLORS.default};
  font-size: 28px;
  font-family: inherit;
`;
