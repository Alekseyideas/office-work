import React from 'react';
import { Check } from '../svgs/Check';
import { CloseIcon } from '../svgs/Close';
import { ButtonDefault } from '../ui';
import * as Styles from './styles';

interface SuccessModalProps {
  closeHandler?: () => void;
  title: string;
  date?: string;
  tableNumber?: number;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  closeHandler = () => null,
  title,
  date,
  tableNumber,
}) => {
  return (
    <Styles.ModalWrapperS>
      <Styles.ModalInnerS style={{ maxWidth: '600px' }}>
        <Styles.ModalHeaderS>
          <Styles.ModalTitleS>{title}</Styles.ModalTitleS>
          <Styles.ModalCloseBtnS onClick={closeHandler}>
            <CloseIcon />
          </Styles.ModalCloseBtnS>
        </Styles.ModalHeaderS>
        <Styles.ModalBodyS style={{ textAlign: 'center' }}>
          <Styles.IconBody success>
            <Check />
          </Styles.IconBody>
          <p>Ваша заявка на роботу в офісі прийнята.</p>
          <p>
            Ви забронювали стіл № <b>{tableNumber}</b> на <b>{date}</b>.
          </p>
          <p>
            Якщо у Вас змінилися обставини та Ви не плануєте в цей день приходити в офіс –
            обов’язково відмініть свою заявку!
          </p>
          <p>Не забудьте взяти робочий ноутбук та гарний настрій.</p>
          <p>До зустрічі у офісі!</p>
        </Styles.ModalBodyS>
        <Styles.ModalFooterS>
          <ButtonDefault title="Ok" onClick={closeHandler} />
        </Styles.ModalFooterS>
      </Styles.ModalInnerS>
    </Styles.ModalWrapperS>
  );
};
