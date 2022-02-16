import React from 'react'
// import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import { CalendarContainer, PageContainer } from '../month/MonthCalendar';
import { MONTHS, WEEKDAYS } from '../../calendarData';
import { findMonth } from '../../calendarFunctions';
import DayHeader from './DayHeader';

function WeekPage() {
  const location = useLocation();
  const thisWeek = location.state;
  const thisMonth = findMonth(thisWeek);
  return (
    <PageContainer>
      <h1>{MONTHS[thisMonth().month]} {thisMonth().year}</h1>
      <DayHeaderContainer>
        {thisWeek.map((day, index) => <DayHeader day={day} index={index} key={index} />)}
      </DayHeaderContainer>
      {/* <CalendarContainer></CalendarContainer> */}
    </PageContainer>
  )
}

const DayHeaderContainer = styled(CalendarContainer)`
  height: 15%;
`

export default WeekPage;



