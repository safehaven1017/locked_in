import React from 'react';
import styled from 'styled-components';
import MonthBlock from './MonthBlock';
import { createMonth, findMonthFromMonth } from '../../calendarFunctions';
import { MONTHS } from '../../calendarData';
import { useSelector, useDispatch } from 'react-redux';

// The purpose of this component is to display a monthly calendar. It should automatically change out number days based on the month
// each calendar page should display all the weeks encapsulating the month
function MonthCalendar() {
  const monthState = useSelector(state => state.month);
  const { month, year } = findMonthFromMonth(monthState)
  return (
    <PageContainer>
      <h2>{MONTHS[monthState[10].month]} {year}</h2>
      <CalendarContainer>
        {monthState.map((day, index) => <MonthBlock monthArray={monthState} day={day} index={index} key={index} />)}
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

