import * as uk from 'date-fns/locale/uk';
import moment from 'moment';
import React from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { TableCh } from '../components/svgs/TableCh';
import { TableChSecond } from '../components/svgs/TableChSecond';
import { ButtonDefault } from '../components/ui';
import FirstFloorSrc from '../images/floors/firstFloor.png';
import SecondFloorSrc from '../images/floors/secondFloor.png';
import { BORDER_RADIUS, COLORS } from '../utils/config';

registerLocale('uk', uk);

interface RequestProps {}

export const Request: React.FC<RequestProps> = ({}) => {
  const [showFirstFloor, setShowFirstFloor] = React.useState(false);
  const [showSecondFloor, setShowSecondFloor] = React.useState(false);
  const [selected, setSelected] = React.useState(0);
  const [startDate, setStartDate] = React.useState(new Date());
  const d = moment(new Date()).add(14, 'days');

  return (
    <WrapperS>
      <TitleS>Заявка на роботу в офiсi</TitleS>
      <DescS>Тут Ви можете подати заявку на роботу в офiсi</DescS>
      <DateWrapperS>
        <span>Виберiть дату: </span>
        <DatePicker
          minDate={new Date()}
          maxDate={new Date(d.format())}
          locale="uk"
          dateFormat="dd.MM.yyyy"
          selected={startDate}
          onChange={(date) => setStartDate(date as Date)}
        />
      </DateWrapperS>

      <ImageWrapperS>
        <img
          src={FirstFloorSrc}
          alt="FirstFloorSrc"
          loading="lazy"
          onLoad={() => setShowFirstFloor(true)}
        />
        {showFirstFloor ? (
          <TableCh clickHandler={setSelected} selected={selected} reserved={[2, 3, 4]} />
        ) : null}
      </ImageWrapperS>
      <ImageWrapperS>
        <img
          src={SecondFloorSrc}
          alt="FirstFloorSrc"
          loading="lazy"
          onLoad={() => setShowSecondFloor(true)}
        />
        {showSecondFloor ? (
          <TableChSecond clickHandler={setSelected} selected={selected} reserved={[32, 3, 4]} />
        ) : null}
      </ImageWrapperS>

      <ButtonDefault title="Ok" onClick={() => console.log(11)} />
    </WrapperS>
  );
};

const WrapperS = styled.div`
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: ${BORDER_RADIUS};
  max-width: 900px;
`;

const TitleS = styled.h4`
  font-size: 20px;
  margin: 0;
`;
const DescS = styled.h4`
  font-size: 16px;
  margin: 20px 0;
  color: ${COLORS.default};
`;

const ImageWrapperS = styled.div`
  position: relative;
  img {
    width: 100%;
    height: auto;
  }
  svg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
  }

  .tableCh {
    cursor: pointer;

    &.active {
      cursor: default;
      polygon,
      rect {
        fill: #ee4444 !important;
      }
    }
    &.selected {
      cursor: default;
      polygon,
      rect {
        fill: #dfe208 !important;
      }
    }

    &:hover {
      polygon,
      rect {
        fill: #0bd648;
      }
    }
    &:active {
      polygon,
      rect {
        fill: #05a736;
      }
    }
  }
`;

const DateWrapperS = styled.div`
  span {
    margin-right: 20px;
  }
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
