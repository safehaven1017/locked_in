import React from 'react';
import { createYear } from '../../calendarFunctions';
import { PageContainer, CalendarContainer } from '../month/MonthCalendar';
import styled from 'styled-components';
import MonthInYearCal from './MonthInYearCal';

function YearPage() {
    const calendarYear = 2022
    const yearArray = createYear(calendarYear);
    return (
   <PageContainer>
       <h2>{calendarYear}</h2>
       <YearCalendarContainer>
            {yearArray.map((_, index) => <MonthInYearCal index={index} key={index} />)}
       </YearCalendarContainer>
   </PageContainer>
  )
}

const YearCalendarContainer = styled(CalendarContainer)`
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    height: 80vh;
    width: 90vw;
`

export default YearPage;