import React from 'react'
import styled from 'styled-components';
import { CalendarContainer, PageContainer } from '../month/MonthCalendar';
import { MONTHS } from '../../calendarData';
import DayHeader from './DayHeader';
import { useSelector, useDispatch } from 'react-redux';
import WeekCalendar from './WeekCalendar';

function WeekPage() {
  const { dayArray, calendarMonth, calendarYear } = useSelector(state => state.week);
  return (
    <PageContainer>
      <WeekTitle>{MONTHS[calendarMonth]} {calendarYear}</WeekTitle>
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
  margin: 0;
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export default WeekPage;



