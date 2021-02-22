import * as uk from 'date-fns/locale/uk';
import moment from 'moment';
import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ErrorModal, SuccessModal } from '../components/Modals';
import { TableCh } from '../components/svgs/TableCh';
import { TableChSecond } from '../components/svgs/TableChSecond';
import { ButtonDefault } from '../components/ui';
import FirstFloorSrc from '../images/floors/firstFloor.png';
import SecondFloorSrc from '../images/floors/secondFloor.png';
import { Store } from '../store';
import { StoreAction } from '../store/StoreAction';
import { IStore } from '../store/types';
import * as Styles from './requestStyles';
import { useRequest } from './useRequest';

registerLocale('uk', uk);

interface RequestProps {}

export const Request: React.FC<RequestProps> = () => {
  const { dispatch } = React.useContext<IStore>(Store);
  const Actions = new StoreAction(dispatch);
  const [showFirstFloor, setShowFirstFloor] = React.useState(false);
  const [showSecondFloor, setShowSecondFloor] = React.useState(false);
  const [selected, setSelected] = React.useState(0);
  const [startDate, setStartDate] = React.useState(new Date());
  const [loading, setLoading] = React.useState(false);
  const [isSuccessModal, setIsSuccessModal] = React.useState(false);
  const [isErrorModal, setIsErrorModal] = React.useState(false);
  const { reserved, setReserved } = useRequest(startDate);

  const d = moment(new Date()).add(14, 'days');

  const saveHandler = async () => {
    if (!selected) return null;

    try {
      setLoading(true);
      // const data = await callApi('post', '/', { tableId: selected, date: startDate });

      console.log({ tableId: selected, date: startDate });
      setIsSuccessModal(true);
    } catch (e) {
      console.log(e);
      setIsErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Styles.WrapperS>
        <Styles.TitleS>Заявка на роботу в офiсi</Styles.TitleS>
        <Styles.DescS>Тут Ви можете подати заявку на роботу в офiсi</Styles.DescS>
        <Styles.DateWrapperS>
          <span>Виберiть дату: </span>
          <DatePicker
            minDate={new Date()}
            maxDate={new Date(d.format())}
            locale="uk"
            dateFormat="dd.MM.yyyy"
            selected={startDate}
            onChange={(date) => setStartDate(date as Date)}
          />
        </Styles.DateWrapperS>
        <Styles.WrapperTextS>
          <p>Оберiть вiльний стiл</p>
        </Styles.WrapperTextS>
        <Styles.TitleImageS>
          <h3>Cхема розміщення столів (1 поверх)</h3>
        </Styles.TitleImageS>
        <Styles.ImageWrapperS>
          <img
            src={FirstFloorSrc}
            alt="FirstFloorSrc"
            loading="lazy"
            onLoad={() => setShowFirstFloor(true)}
          />
          {showFirstFloor ? (
            <TableCh clickHandler={setSelected} selected={selected} reserved={reserved} />
          ) : null}
        </Styles.ImageWrapperS>
        <Styles.TitleImageS style={{ marginTop: '30px' }}>
          <h3>Cхема розміщення столів (2 поверх)</h3>
        </Styles.TitleImageS>
        <Styles.ImageWrapperS>
          <img
            src={SecondFloorSrc}
            alt="FirstFloorSrc"
            loading="lazy"
            onLoad={() => setShowSecondFloor(true)}
          />
          {showSecondFloor ? (
            <TableChSecond clickHandler={setSelected} selected={selected} reserved={reserved} />
          ) : null}
        </Styles.ImageWrapperS>
        <Styles.FooterWrapperS>
          {loading ? (
            <Styles.LoaderWrapperS>Зачекайте ...</Styles.LoaderWrapperS>
          ) : (
            <>
              <ButtonDefault title="Відмінити" onClick={() => Actions.setPage('home')} />
              <ButtonDefault title="Зберегти" onClick={saveHandler} />
            </>
          )}
        </Styles.FooterWrapperS>
      </Styles.WrapperS>
      {isSuccessModal ? (
        <SuccessModal
          title="Шановний колего"
          date={moment(startDate).format('DD.MM.YYYY')}
          tableNumber={selected}
          closeHandler={() => {
            setIsSuccessModal(false);
            Actions.setPage('home');
          }}
        />
      ) : null}
      {isErrorModal ? (
        <ErrorModal
          title="Помилка"
          closeHandler={() => {
            setIsErrorModal(false);
            setReserved((oldR) => [...oldR, selected]);
            setSelected(0);
          }}
        />
      ) : null}
    </>
  );
};
