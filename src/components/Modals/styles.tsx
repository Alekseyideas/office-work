import styled from 'styled-components';
import { BORDER_RADIUS, COLORS } from '../../utils/config';
import { BtnIconS } from '../ui/Buttons';

export const ModalWrapperS = styled.div`
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ModalInnerS = styled.div`
  background: rgba(0, 0, 0, 0.2);
  position: relative;
  background: white;
  width: 96%;
  max-width: 900px;
  border-radius: ${BORDER_RADIUS};
`;

export const ModalHeaderS = styled.header`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
export const ModalFooterS = styled.footer`
  padding: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

export const ModalBodyS = styled.header`
  padding: 20px 20px;

  table {
    width: 100%;

    th,
    td {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding: 20px 10px;
      text-align: left;
      color: darkgray;
      font-size: 14px;
    }

    tbody {
      tr {
        &:last-child {
          td {
            border-bottom: 0;
          }
        }
      }
    }
  }
`;

export const ModalTitleS = styled.h4`
  font-size: 22px;
  margin: 0;
`;

export const ModalCloseBtnS = styled(BtnIconS)`
  padding: 0;
  svg {
    width: 30px;
    height: 30px;
  }
`;

export const IconBody = styled.div<{ success?: boolean }>`
  svg {
    width: 100px;
    height: 100px;
    margin-bottom: -20px;
    path {
      ${({ success }) =>
        success
          ? `
        fill: ${COLORS.default};`
          : `  fill: red;`}
    }
  }
`;

export const LoadingWrapperS = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;
