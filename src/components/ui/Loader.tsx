import React from 'react';
import styled from 'styled-components';

interface LoaderProps {}

export const Loader: React.FC<LoaderProps> = ({}) => {
  return (
    <WrapperS>
      <p>Зачекайте ...</p>
    </WrapperS>
  );
};

const WrapperS = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  text-align: center;
  display: flex;
  justify-content: center;
`;
