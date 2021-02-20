import React from 'react';
import { IUser } from '../../store/types';
import { CloseIcon } from '../svgs/Close';
import { ButtonDefault } from '../ui';
import * as Styles from './styles';

interface DetailingProps {
  data: IUser[];
  closeHandler?: () => void;
  title: string;
}

export const Detailing: React.FC<DetailingProps> = ({ data, closeHandler = () => null, title }) => {
  return (
    <Styles.ModalWrapperS>
      <Styles.ModalInnerS>
        <Styles.ModalHeaderS>
          <Styles.ModalTitleS>{title}</Styles.ModalTitleS>
          <Styles.ModalCloseBtnS onClick={closeHandler}>
            <CloseIcon />
          </Styles.ModalCloseBtnS>
        </Styles.ModalHeaderS>
        <Styles.ModalBodyS>
          <table cellPadding={0} cellSpacing={0}>
            <thead>
              <tr>
                <th>#</th>
                <th>ПІБ</th>
                <th>Департамент</th>
                <th>Мiсце</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                Array.isArray(data) &&
                data[0] &&
                data.map((itm, i) => (
                  <tr key={itm.id}>
                    <td>{i + 1}</td>
                    <td>{itm.fio}</td>
                    <td>{itm.department}</td>
                    <td>{itm.numberTable}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </Styles.ModalBodyS>
        <Styles.ModalFooterS>
          <ButtonDefault title="Закрити" onClick={closeHandler} />
        </Styles.ModalFooterS>
      </Styles.ModalInnerS>
    </Styles.ModalWrapperS>
  );
};
