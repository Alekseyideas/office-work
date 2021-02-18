import moment from 'moment';
import 'moment/locale/uk';
import React from 'react';
import { Calendar, EventProps, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { CustomToolbar } from '../components/CustomToolbar';
import { TopControllers } from '../components/TopControllers';
import { Store } from '../store';
import { IStore } from '../store/types';
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
}

const MonthEvent = (data: EventProps) => {
  console.log(data, 'data');
  return <div>{1}</div>;
};

export const Home: React.FC<HomeProps> = () => {
  const { store } = React.useContext<IStore>(Store);
  const [events, setEvents] = React.useState<IEvent[]>([]);

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
        });
      }

      setEvents(dates);
    }
  }, [store.users]);

  return (
    <>
      <TopControllers />
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          components={{
            month: {
              event: ({ event }) => <div>{event.count}</div>,
            },

            toolbar: CustomToolbar,
          }}
          onSelectSlot={(slot) => console.log(slot)}
          onSelectEvent={(slot) => console.log(slot)}
          defaultView="month"
          views={['month']}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onShowMore={() => console.log(111)}
          onNavigate={(e) => console.log(e)}
          timeslots={300}
        />
      </div>
    </>
  );
};
