import React from 'react';
import styled from 'styled-components';
import { CalendarContainer } from '../month/MonthCalendar';
import { MONTHS } from '../../calendarData';
import { createMonth } from '../../calendarFunctions';

function MonthInYearCal(props) {
  const month = createMonth()
  return (
    <MonthInYearContainer>
      <span style={{fontSize: '2vw'}} >{MONTHS[props.index]}</span>
      <MiniMonthCalendar></MiniMonthCalendar>
    </MonthInYearContainer>
  )
}

const MonthInYearContainer = styled.div`
  width: 15vw;
  height: 15vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MiniMonthCalendar = styled(CalendarContainer)`
  width: 10vw;
  height: 10vw;
`

export default MonthInYearCal;