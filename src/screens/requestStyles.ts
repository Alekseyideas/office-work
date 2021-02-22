import styled from 'styled-components';
import { BORDER_RADIUS, COLORS } from '../utils/config';

export const WrapperS = styled.div`
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: ${BORDER_RADIUS};
  max-width: 900px;
`;

export const TitleS = styled.h4`
  font-size: 20px;
  margin: 0;
`;
export const DescS = styled.h4`
  font-size: 16px;
  margin: 20px 0;
  color: ${COLORS.default};
`;

export const ImageWrapperS = styled.div`
  position: relative;
  img {
    width: 100%;
    height: auto;
  }
  svg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
  }

  .tableCh {
    cursor: pointer;

    &.active {
      cursor: default;
      polygon,
      rect {
        fill: #ee4444 !important;
      }
    }
    &.selected {
      cursor: default;
      polygon,
      rect {
        fill: #dfe208 !important;
      }
    }

    &:hover {
      polygon,
      rect {
        fill: #0bd648;
      }
    }
    &:active {
      polygon,
      rect {
        fill: #05a736;
      }
    }
  }
`;

export const DateWrapperS = styled.div`
  span {
    margin-right: 20px;
  }
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

export const WrapperTextS = styled.div`
  text-align: center;
  font-size: 23px;
`;

export const TitleImageS = styled.div`
  background: #e9e4bd;
  text-align: center;
  padding: 10px 0;
  margin-bottom: 10px;

  & > * {
    margin: 0;
  }
`;

export const FooterWrapperS = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  & > button {
    margin-left: 20px;
  }
`;

export const LoaderWrapperS = styled.div`
  height: 40px;
  width: 200px;
  text-align: center;
`;
