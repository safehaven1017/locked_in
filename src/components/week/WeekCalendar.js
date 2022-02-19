import React from 'react';
import styled from 'styled-components';
import TimeGrid from './TimeGrid';
import WeekGrid from './WeekGrid';

function WeekCalendar() {
  return (
    <CalendarContainer>
      <TimeGrid />
      <WeekGrid />
    </CalendarContainer>
  )
}

const CalendarContainer = styled.div`
  width: 80vw;
  height: 70vh;
  overflow-y: scroll;
  position: relative;
  border-top-style: solid;
  display: flex;
  overflow-x: auto;
`

export default WeekCalendar;