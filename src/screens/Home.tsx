import moment from 'moment';
import 'moment/locale/uk';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CustomToolbar } from '../components/CustomToolbar';
import { Detailing, MyRequests } from '../components/Modals';
import { TopControllers } from '../components/TopControllers';
import { Store } from '../store';
import { IStore, IUser } from '../store/types';
const localizer = momentLocalizer(moment);
const navigate = {
  PREVIOUS: 'PREV',
  NEXT: 'NEXT',
  TODAY: 'TODAY',
  DATE: 'DATE',
};
interface HomeProps {}

interface IEvent {
  title: string;
  count: number;
  start: Date;
  end: Date;
  idDate: string;
}

export const Home: React.FC<HomeProps> = () => {
  const { store } = React.useContext<IStore>(Store);
  const [events, setEvents] = React.useState<IEvent[]>([]);
  const [isShowDayInfo, setIsShowDayInfo] = React.useState(false);
  const [isShowMyRequests, setIsShowMyRequests] = React.useState(false);
  const [filteredUsers, setFilteredUsers] = React.useState<IUser[]>([]);

  React.useEffect(() => {
    if (store.users && Array.isArray(store.users) && store.users[0]) {
      const dates: IEvent[] = [];
      const cash: { [key: string]: number } = {};

      store.users.forEach((user) => {
        if (!cash[String(user.dateReserve)]) {
          cash[String(user.dateReserve)] = 1;
        } else {
          cash[String(user.dateReserve)] += 1;
        }
      });

      for (let key in cash) {
        dates.push({
          title: '',
          count: cash[key],
          start: new Date(key),
          end: new Date(key),
          idDate: key,
        });
      }

      setEvents(dates);
    }
  }, [store.users]);

  const clickEventHandler = (event: IEvent) => {
    const users =
      (store.users &&
        Array.isArray(store.users) &&
        store.users.filter((user) => String(user.dateReserve) === String(event.idDate))) ||
      [];
    setFilteredUsers(users);
    setIsShowDayInfo(true);
  };

  return (
    <>
      <TopControllers showMyRequestsHandler={() => setIsShowMyRequests(true)} />
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          components={{
            month: {
              event: ({ event }) => <span>{event.count}</span>,
            },

            toolbar: CustomToolbar,
          }}
          onSelectSlot={(slot) => null}
          onSelectEvent={clickEventHandler}
          defaultView="month"
          views={['month']}
          startAccessor="start"
          endAccessor="end"
          style={{ minHeight: 700 }}
          onShowMore={() => console.log(111)}
          onNavigate={(e) => console.log(e)}
        />
      </div>

      {!isShowMyRequests ? null : (
        <MyRequests
          title="Мої заявки"
          closeHandler={() => {
            setIsShowMyRequests(false);
          }}
        />
      )}
      {!isShowDayInfo ? null : (
        <Detailing
          data={filteredUsers}
          title="Деталізація"
          closeHandler={() => {
            setIsShowDayInfo(false);
            setFilteredUsers([]);
          }}
        />
      )}
    </>
  );
};
