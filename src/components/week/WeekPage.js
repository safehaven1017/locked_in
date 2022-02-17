import React from 'react'
// import { useState } from 'react';
import { useLocation } from 'react-router-dom'
import styled from 'styled-components';
import { CalendarContainer, PageContainer } from '../month/MonthCalendar';
import { MONTHS } from '../../calendarData';
import DayHeader from './DayHeader';
import { useSelector } from 'react-redux';

function WeekPage() {
  const location = useLocation();
  const thisWeek = location.state;
  const { calendarMonth, calendarYear } = useSelector(state => state);
  return (
    <PageContainer>
      <h1>{MONTHS[calendarMonth]} {calendarYear}</h1>
      <DayHeaderContainer>
        {thisWeek.map((day, index) => <DayHeader day={day} index={index} key={index} />)}
      </DayHeaderContainer>
    </PageContainer>
  )
}

const DayHeaderContainer = styled(CalendarContainer)`
  height: 15%;
`

export default WeekPage;



