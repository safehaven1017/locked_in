import React from 'react';
import styled from 'styled-components';
import MonthBlock from './MonthBlock';
import { MONTHS } from '../../calendarData';
import { useSelector, useDispatch } from 'react-redux';
import { nextMonth, setMonth } from '../../redux/actions/monthActions';
import { createMonth } from '../../calendarFunctions';
import { useEffect } from 'react';

// The purpose of this component is to display a monthly calendar. It should automatically change out number days based on the month
// each calendar page should display all the weeks encapsulating the month
function MonthCalendar() {
  const { monthArray, calendarMonth, calendarYear } = useSelector(state => state);
  const dispatch = useDispatch();
  return (
    <PageContainer>
      <h2>{MONTHS[calendarMonth]} {calendarYear}</h2>
      <button onClick={() => dispatch(nextMonth((calendarMonth === 0 ? 11 : calendarMonth - 1), (calendarMonth === 0 ? calendarYear - 1 : calendarYear)))} >previous month</button>
      <button onClick={() => dispatch(nextMonth(((calendarMonth + 1) % 12), (calendarMonth === 11 ? calendarYear + 1 : calendarYear)))} >next month</button>
      <CalendarContainer>
        {monthArray.map((day, index) => <MonthBlock monthArray={monthArray} day={day} index={index} key={index} />)}
      </CalendarContainer>
    </PageContainer>
  )
}

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #0d53f7;
`

export const CalendarContainer = styled.div`
  width: 70vw;
  height: 90vh;
  margin: 5vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`

export default MonthCalendar;
