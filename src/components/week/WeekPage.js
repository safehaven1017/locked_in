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
import { PrevButton, NextButton, YearHeader } from '../year/YearPage';
import { getNextWeek, getPreviousWeek } from '../../calendarFunctions';
import { TitleContainer } from '../year/TitleContainer';

function WeekPage() {
  const { dayArray, calendarMonth, calendarYear } = useSelector(state => state.week);
  const dispatch = useDispatch();
  const handlePreviousWeek = () => {
    
    dispatch(previousWeek(dayArray, calendarMonth, calendarYear));
    dispatch(setMonth(calendarMonth, calendarYear));
    dispatch(setDay(getPreviousWeek(dayArray)[0]));
  }
  const handleNextWeek = () => {
    dispatch(nextWeek(dayArray, calendarMonth, calendarYear));
    dispatch(setMonth(calendarMonth, calendarYear));
    dispatch(setDay(getNextWeek(dayArray)[0]));
  }
  const isToday = calendarMonth === new Date().getMonth() && calendarYear === new Date().getFullYear();
  const isPast = calendarYear < new Date().getFullYear() ?
   true : calendarYear === new Date().getFullYear() && calendarMonth < new Date().getMonth() ?
    true : false;
  return (
    <PageContainer>
      <WeekTitle>
        <PrevButton onClick={handlePreviousWeek} >◀</PrevButton>
        <WTitleContainer isPast={isPast} isToday={isToday} >{MONTHS[calendarMonth]} {calendarYear}</WTitleContainer>
        <NextButton onClick={handleNextWeek} >▶</NextButton>
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
  border-style: none;
  box-shadow: none;
`
export const WeekTitle = styled(YearHeader)``;

const WTitleContainer = styled(TitleContainer)`
  width: 30vw;
  color: ${props => props.isPast ? '#4e6a87' : props.isToday ? 'red' : '#0d53f7'};
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export default WeekPage;



