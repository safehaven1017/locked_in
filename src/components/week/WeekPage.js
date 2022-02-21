import React from 'react'
import styled from 'styled-components';
import { CalendarContainer, PageContainer } from '../month/MonthCalendar';
import { MONTHS } from '../../calendarData';
import DayHeader from './DayHeader';
import { useSelector, useDispatch } from 'react-redux';
import WeekCalendar from './WeekCalendar';
import { previousWeek, nextWeek } from '../../redux/actions/weekActions';
import { setMonth } from '../../redux/actions/monthActions';
import { setDay } from '../../redux/actions/dayActions';

function WeekPage() {
  const { dayArray, calendarMonth, calendarYear } = useSelector(state => state.week);
  const dispatch = useDispatch();
  const handlePreviousWeek = () => {
    
    dispatch(previousWeek(dayArray, calendarMonth, calendarYear));
    dispatch(setMonth(calendarMonth, calendarYear));
    dispatch(setDay(dayArray[0]));
  }
  const handleNextWeek = () => {
    dispatch(nextWeek(dayArray, calendarMonth, calendarYear));
    dispatch(setMonth(calendarMonth, calendarYear));
    dispatch(setDay(dayArray[0]));
  }
  return (
    <PageContainer>
      <WeekTitle>
        <button onClick={handlePreviousWeek} >Previous Week</button>
        {MONTHS[calendarMonth]} {calendarYear}
        <button onClick={handleNextWeek} >Next Week</button>
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
export const WeekTitle = styled.h1`
  display: flex;
  margin: 0;
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export default WeekPage;



