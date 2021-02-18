import React from 'react';
import styled from 'styled-components';
import { BORDER_RADIUS, COLORS } from '../../utils/config';
import { useClickOutside } from '../../utils/useClickOutside';
import { Chevron } from '../svgs/Chevron';

export interface ISelectData {
  value: string;
  title: string;
  id: number;
}

interface SelectProps {
  title?: string;
  placeholder?: string;
  data: ISelectData[];
  selectHandler: (data: ISelectData) => void;
  styles?: React.CSSProperties;
}

export const Select: React.FC<SelectProps> = ({
  title,
  data,
  placeholder = '',
  styles,
  selectHandler,
}) => {
  const [isDataShow, setIsDataShow] = React.useState(false);
  const ref = React.useRef<HTMLDivElement | null>(null);
  useClickOutside(ref, () => setIsDataShow(false));

  return (
    <WrapperS style={styles ? styles : {}} ref={ref} isActive={isDataShow}>
      <span onClick={() => setIsDataShow(true)}>
        {title || placeholder || 'Виберiть'} <Chevron />
      </span>
      {isDataShow ? (
        <WrapperItemsS>
          {data &&
            data[0] &&
            data.map((itm) => (
              <li
                key={itm.id}
                onClick={() => {
                  setIsDataShow(false);
                  selectHandler(itm);
                }}
              >
                {itm.title}
              </li>
            ))}
        </WrapperItemsS>
      ) : null}
    </WrapperS>
  );
};

const WrapperS = styled.div<{ isActive: boolean }>`
  position: relative;
  span {
    vertical-align: middle;
    color: #000;
    border: 1px solid ${COLORS.default};
    border-radius: ${BORDER_RADIUS};
    padding: 10px;
    font-size: 16px;
    line-height: 1.15em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 200px;
    svg {
      margin-left: 20px;
    }
  }

  ${({ isActive }) =>
    isActive
      ? `
  svg {
    transform: rotate(180deg);

  }
  `
      : null}
`;

const WrapperItemsS = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 100%;
  background: white;
  z-index: 1;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 0;
  margin-top: 2px;
  border-radius: ${BORDER_RADIUS};
  overflow: auto;
  max-height: 300px;

  li {
    padding: 5px 10px;
    font-size: 14px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;

    &:hover {
      background: rgba(0, 0, 0, 0.03);
    }

    &:active {
      color: white;
      background: ${COLORS.default};
    }

    &:last-child {
      border-bottom: 0;
    }
  }
`;
