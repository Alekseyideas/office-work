import * as uk from 'date-fns/locale/uk';
import moment from 'moment';
import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AlreadyReserved, ErrorModal, SuccessModal } from '../components/Modals';
import { TableCh } from '../components/svgs/TableCh';
import { TableChSecond } from '../components/svgs/TableChSecond';
import { ButtonDefault } from '../components/ui';
import { useApi } from '../hooks/useApi';
import FirstFloorSrc from '../images/floors/firstFloor.png';
import SecondFloorSrc from '../images/floors/secondFloor.png';
import shNew from '../images/shNew.svg';
import { Store } from '../store';
import { StoreAction } from '../store/StoreAction';
import { IStore } from '../store/types';
import * as Styles from './requestStyles';
import { useRequest } from './useRequest';
import {Tables} from "../components/svgs/Tables";

registerLocale('uk', uk);

interface RequestProps {}

export const Request: React.FC<RequestProps> = () => {
  const { dispatch, store } = React.useContext<IStore>(Store);
  const { getUsers, getMyReq } = useApi();
  const Actions = new StoreAction(dispatch);
  const [showFirstFloor, setShowFirstFloor] = React.useState(false);
  const [showSecondFloor, setShowSecondFloor] = React.useState(false);
  const [selected, setSelected] = React.useState(0);
  const dNext = moment(new Date()).add(1, 'days').format();
  const [startDate, setStartDate] = React.useState(new Date(dNext));
  const [loading, setLoading] = React.useState(false);
  const [isSuccessModal, setIsSuccessModal] = React.useState(false);
  const [isErrorModal, setIsErrorModal] = React.useState(false);
  const { reserved, setReserved, getReserved } = useRequest(startDate);
  const [isCalOpen, setIsCalOpen] = React.useState(false);
  const d = moment(new Date()).add(14, 'days');
  const [canSentModal, setCanSentModal] = React.useState(false);
  const [canSent, setCanSent] = React.useState(true);
  const [countTables, setCountTables] = React.useState(0);

  React.useEffect(() => {
    if (store.users && Array.isArray(store.users)) {
      const itms = getReserved(store.users, startDate);
      setCountTables(itms.length);
    }
  }, [startDate, store.users, getReserved]);

  React.useEffect(() => {
    const date = moment(startDate).format('YYYY-MM-DD');
    if (store.myRequests && Array.isArray(store.myRequests)) {
      const hasDate = store.myRequests.some((itm) => itm.dateReserve === date);
      setCanSent(!hasDate);
    }
  }, [startDate, store.myRequests]);

  const saveHandler = async () => {
    if (!selected) return console.log('Does not selected');
    if (!store.user || (store.user && !store.user.email)) return console.log('No email in user');
    if (!canSent) return setCanSentModal(true);

    try {
      setLoading(true);
      // const data = await callApi('post', '/', { tableId: selected, date: startDate }); запрос на проверку заявки
      // if(data.isOk) ....
      // await callApi('post', '/', { tableId: selected, date: startDate }); запрос на добавление заявки

      await getMyReq(store.user.email);
      await getUsers();

      setIsSuccessModal(true);
    } catch (e) {
      console.log(e);
      setIsErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (isCalOpen) {
      const arrs = document.querySelectorAll('.react-datepicker__day');
      if (arrs) {
        const hoverEvent = (itm: any) => {
          if (!itm || (itm && itm.classList.contains('react-datepicker__day--disabled')))
            return null;
          const day = itm.innerText;
          const mmYY = moment(startDate).format('YYYY-MM');

          const date = moment(`${mmYY}-${day}`).format();

          const itms = getReserved(store.users, new Date(date));

          setCountTables(itms.length);
        };

        arrs.forEach((itm) => itm.addEventListener('mouseover', () => hoverEvent(itm)));
      }
    }
  }, [isCalOpen, startDate, getReserved, store.users]);
  return (
    <>
      <Styles.WrapperS>
        {/* <Styles.TitleS>Заявка на роботу в офiсi</Styles.TitleS> */}
        {/* <Styles.DescS>Тут Ви можете подати заявку на роботу в офiсi</Styles.DescS> */}
        <Styles.WrapperNumS>
          <Styles.DateWrapperS>
            <span>Виберiть дату: </span>
            <DatePicker
              minDate={new Date(dNext)}
              maxDate={new Date(d.format())}
              locale="uk"
              dateFormat="dd.MM.yyyy"
              selected={startDate}
              onChange={(date) => setStartDate(date as Date)}
              onMonthChange={(e) => console.log(e)}
              onCalendarOpen={() => setIsCalOpen(true)}
              onCalendarClose={() => setIsCalOpen(false)}
            />
          </Styles.DateWrapperS>
          {isCalOpen ? (
            <span className="numWrapper">
              Зайнято <b>{countTables}</b> iз 36 столiв
            </span>
          ) : null}
        </Styles.WrapperNumS>

        <Styles.WrapperTextS>
          <p>Оберiть вiльний стiл</p>
        </Styles.WrapperTextS>
        <Styles.TitleImageS>
          <h3>Cхема розміщення столів</h3>
        </Styles.TitleImageS>
        <Styles.ImageWrapperS>
          <img src={shNew} alt="FirstFloorSrc" onLoad={() => setShowFirstFloor(true)} />
          {showFirstFloor ? (
            <Tables clickHandler={setSelected} selected={selected} reserved={reserved} />
            // <TableCh clickHandler={setSelected} selected={selected} reserved={reserved} />
          ) : null}
        </Styles.ImageWrapperS>

        <Styles.FooterWrapperS>
          {loading ? (
            <Styles.LoaderWrapperS>Зачекайте ...</Styles.LoaderWrapperS>
          ) : (
            <>
              <ButtonDefault title="Зберегти" onClick={saveHandler} disabled={!selected} />
              <ButtonDefault title="Закрити" onClick={() => Actions.setPage('home')} />
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
            // getUsers();
          }}
        />
      ) : null}
      {canSentModal ? <AlreadyReserved closeHandler={() => setCanSentModal(false)} /> : null}
    </>
  );
};
