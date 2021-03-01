import React from 'react';
import { CloseIcon } from '../svgs/Close';
import { ButtonDefault } from '../ui';
import * as Styles from './styles';

interface AlreadyReservedProps {
  closeHandler?: () => void;
}

export const AlreadyReserved: React.FC<AlreadyReservedProps> = ({ closeHandler = () => null }) => {
  return (
    <Styles.ModalWrapperS>
      <Styles.ModalInnerS style={{ maxWidth: '600px' }}>
        <Styles.ModalHeaderS>
          <Styles.ModalTitleS>Помилка</Styles.ModalTitleS>
          <Styles.ModalCloseBtnS onClick={closeHandler}>
            <CloseIcon />
          </Styles.ModalCloseBtnS>
        </Styles.ModalHeaderS>
        <Styles.ModalBodyS style={{ textAlign: 'center' }}>
          <Styles.IconBody>
            <CloseIcon />
          </Styles.IconBody>
          <p>На одну дату можна забронювати лише оди стіл. </p>
          <p>Виберіть будь-ласка іншу дату.</p>
        </Styles.ModalBodyS>
        <Styles.ModalFooterS>
          <ButtonDefault title="Ok" onClick={closeHandler} />
        </Styles.ModalFooterS>
      </Styles.ModalInnerS>
    </Styles.ModalWrapperS>
  );
};
