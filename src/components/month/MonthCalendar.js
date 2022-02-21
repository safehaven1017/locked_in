import React from 'react';
import styled from 'styled-components';
import MonthBlock from './MonthBlock';
import { MONTHS } from '../../calendarData';
import { useSelector, useDispatch } from 'react-redux';
import { previousMonth, nextMonth } from '../../redux/actions/monthActions';
import { setYear } from '../../redux/actions/yearActions';
import { setWeek } from '../../redux/actions/weekActions';
import { setDay } from '../../redux/actions/dayActions';
import { PrevButton, NextButton, YearHeader } from '../year/YearPage';
import { TitleContainer } from '../year/TitleContainer';

// The purpose of this component is to display a monthly calendar. It should automatically change out number days based on the month
// each calendar page should display all the weeks encapsulating the month
function MonthCalendar() {
  const { dayArray, calendarMonth, calendarYear } = useSelector(state => state.month);
  const dispatch = useDispatch();
  const handlePreviousMonth = () => {
    const newDate = new Date(calendarYear, calendarMonth - 1);
    dispatch(setYear(newDate.getFullYear()));
    dispatch(previousMonth(calendarMonth, calendarYear));
    dispatch(setWeek({ 
      year: newDate.getFullYear(), 
      month: newDate.getMonth(), 
      number: newDate.getDate() 
    }, 
    newDate.getMonth(), newDate.getFullYear()));
    dispatch(setDay({ 
      year: newDate.getFullYear(), 
      month: newDate.getMonth(), 
      number: newDate.getDate() 
    }))
  }

  const handleNextMonth = () => {
    const newDate = new Date(calendarYear, calendarMonth + 1);
    dispatch(setYear(newDate.getFullYear()));
    dispatch(nextMonth(calendarMonth, calendarYear));
    dispatch(setWeek({ 
      year: newDate.getFullYear(), 
      month: newDate.getMonth(), 
      number: newDate.getDate() 
    }, 
    newDate.getMonth(), newDate.getFullYear()));
    dispatch(setDay({ 
      year: newDate.getFullYear(), 
      month: newDate.getMonth(), 
      number: newDate.getDate() 
    }))
  }
  const isToday = calendarMonth === new Date().getMonth() && calendarYear === new Date().getFullYear();
  const isPast = calendarYear < new Date().getFullYear() ?
   true : calendarYear === new Date().getFullYear() && calendarMonth < new Date().getMonth() ?
    true : false;
  return (
    <PageContainer>
      <YearHeader>
        <PrevButton onClick={handlePreviousMonth} >◀</PrevButton>
          <MTitleContainer isToday={isToday} isPast={isPast} >{MONTHS[calendarMonth]} {calendarYear}</MTitleContainer>
        <NextButton onClick={handleNextMonth} >▶</NextButton>
      </YearHeader>
      <CalendarContainer>
        {dayArray.map((day, index) => <MonthBlock day={day} index={index} key={index} />)}
      </CalendarContainer>
    </PageContainer>
  )
}

export const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #0d53f7;
  overflow: hidden;
`

const MTitleContainer = styled(TitleContainer)`
  width: 30vw;
  color: ${props => props.isPast ? '#4e6a87' : props.isToday ? 'red' : '#0d53f7'};
`

export const CalendarContainer = styled.div`
  width: 70vw;
  height: 90vh;
  margin: 5vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  border-width: 3px;
  box-shadow: 0px 0px 10px 1px #00000030;
`

export default MonthCalendar;