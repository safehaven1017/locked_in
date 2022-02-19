import React from 'react'
import styled from 'styled-components';
import { CalendarContainer, PageContainer } from '../month/MonthCalendar';
import { MONTHS } from '../../calendarData';
import DayHeader from './DayHeader';
import { useSelector, useDispatch } from 'react-redux';
import WeekCalendar from './WeekCalendar';
import { previousWeek } from '../../redux/actions/weekActions';

function WeekPage() {
  const { dayArray, calendarMonth, calendarYear } = useSelector(state => state.week);
  const dispatch = useDispatch();
  return (
    <PageContainer>
      <WeekTitle>
        <button onClick={() => dispatch(previousWeek(dayArray, calendarMonth, calendarYear))} >Previous Week</button>
        {MONTHS[calendarMonth]} {calendarYear}
        <button>Next Week</button>
      </WeekTitle>
      <ContentContainer>
        <DayHeaderContainer>
          {dayArray.map((day, index) => <DayHeader day={day} index={index} key={index} />)}
        </DayHeaderContainer>
        <WeekCalendar></WeekCalendar>
      </ContentContainer>
    </PageContainer>
  )
}

const DayHeaderContainer = styled(CalendarContainer)`
  height: 15%;
  width: 100%;
  margin: 0;
  margin-bottom: 3%;
  flex-grow: 1;
  align-self: flex-end;
`
const WeekTitle = styled.h1`
  display: flex;
  margin: 0;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export default WeekPage;



