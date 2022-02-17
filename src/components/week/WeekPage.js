import React from 'react'
// import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import { CalendarContainer, PageContainer } from '../month/MonthCalendar';
import { MONTHS, WEEKDAYS } from '../../calendarData';
import { findMonthFromWeek } from '../../calendarFunctions';
import DayHeader from './DayHeader';
import { useSelector } from 'react-redux';

function WeekPage() {
  const location = useLocation();
  const thisWeek = location.state;
  const { monthArray, calendarMonth, calendarYear } = useSelector(state => state);
  const thisMonth = findMonthFromWeek(thisWeek);
  return (
    <PageContainer>
      <h1>{MONTHS[calendarMonth]} {calendarYear}</h1>
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



