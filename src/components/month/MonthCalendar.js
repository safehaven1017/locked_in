import React from 'react';
import styled from 'styled-components';
import MonthBlock from './MonthBlock';
import { createMonth } from '../../calendarFunctions';
import { MONTHS } from '../../calendarData';

const YEAR = 2022;
const MONTH = 1;

// The purpose of this component is to display a monthly calendar. It should automatically change out number days based on the month
// each calendar page should display all the weeks encapsulating the month
function MonthCalendar() {
  return (
    <PageContainer>
      <h2>{MONTHS[MONTH]} {YEAR}</h2>
      <CalendarContainer>
        {createMonth(YEAR, MONTH).map((day, index) => <MonthBlock day={day} index={index} key={index} />)}
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

