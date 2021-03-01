import moment from 'moment';
import 'moment/locale/uk';
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CustomToolbar } from '../components/CustomToolbar';
import { Detailing, MyRequests } from '../components/Modals';
import { TopControllers } from '../components/TopControllers';
import { useApi } from '../hooks/useApi';
import { Store } from '../store';
import { IStore, IUser } from '../store/types';
const localizer = momentLocalizer(moment);

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
  const [filteredUsers, setFilteredUsers] = React.useState<IUser[]>([]);
  const [isShowDayInfo, setIsShowDayInfo] = React.useState(false);
  const [isShowMyRequests, setIsShowMyRequests] = React.useState(false);
  const [selectedDayUsers, setSelectedDayUsers] = React.useState<IUser[]>([]);
  const { getUsers } = useApi();

  const renderEvents = React.useCallback((data: IUser[]) => {
    const dates: IEvent[] = [];
    const cash: { [key: string]: number } = {};

    data.forEach((user) => {
      const key = moment(user.dateReserve).format('YYYY-MM-DD');
      if (!cash[String(key)]) {
        cash[String(key)] = 1;
      } else {
        cash[String(key)] += 1;
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
  }, []);

  React.useEffect(() => {
    if (store.users && Array.isArray(store.users) && store.users[0]) {
      setFilteredUsers(store.users);
    }
  }, [store.users, renderEvents]);

  React.useEffect(() => {
    if (filteredUsers && Array.isArray(filteredUsers)) {
      renderEvents(filteredUsers);
    }
  }, [filteredUsers, renderEvents]);

  const clickEventHandler = (event: IEvent) => {
    const users =
      filteredUsers[0] &&
      filteredUsers.filter((user) => {
        const key = moment(user.dateReserve).format('YYYY-MM-DD');
        return key === String(event.idDate);
      });
    setSelectedDayUsers(users);
    setIsShowDayInfo(true);
  };

  return (
    <>
      <TopControllers
        filterHandler={setFilteredUsers}
        showMyRequestsHandler={() => setIsShowMyRequests(true)}
      />
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
          onSelectSlot={() => null}
          onSelectEvent={clickEventHandler}
          defaultView="month"
          views={['month']}
          startAccessor="start"
          endAccessor="end"
          style={{ minHeight: 700 }}
          onShowMore={() => null}
          onNavigate={(e) => {
            const month = moment(e).startOf('month').format('YYYY-MM-DD');
            getUsers(month);
          }}
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
          data={selectedDayUsers}
          title="Деталізація"
          closeHandler={() => {
            setIsShowDayInfo(false);
            setSelectedDayUsers([]);
          }}
        />
      )}
    </>
  );
};
