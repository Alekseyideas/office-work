import React from 'react';
import { CloseIcon } from '../svgs/Close';
import { ButtonDefault } from '../ui';
import * as Styles from './styles';

interface ErrorModalProps {
  closeHandler?: () => void;
  title: string;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ closeHandler = () => null, title }) => {
  return (
    <Styles.ModalWrapperS>
      <Styles.ModalInnerS style={{ maxWidth: '500px' }}>
        <Styles.ModalHeaderS>
          <Styles.ModalTitleS>{title}</Styles.ModalTitleS>
          <Styles.ModalCloseBtnS onClick={closeHandler}>
            <CloseIcon />
          </Styles.ModalCloseBtnS>
        </Styles.ModalHeaderS>
        <Styles.ModalBodyS style={{ textAlign: 'center' }}>
          <Styles.IconBody>
            <CloseIcon />
          </Styles.IconBody>

          <p>Стол вже зайнято</p>
        </Styles.ModalBodyS>
        <Styles.ModalFooterS>
          <ButtonDefault title="Закрити" onClick={closeHandler} />
        </Styles.ModalFooterS>
      </Styles.ModalInnerS>
    </Styles.ModalWrapperS>
  );
};
