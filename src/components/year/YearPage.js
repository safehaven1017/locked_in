import React from 'react';
import { calendarModule, createYear } from '../../calendarFunctions';
import { PageContainer, CalendarContainer } from '../month/MonthCalendar';
import styled from 'styled-components';
import MonthInYearCal from './MonthInYearCal';
import { useSelector, useDispatch } from 'react-redux';
import { nextYear, previousYear } from '../../redux/actions/yearActions';
import { setDay } from '../../redux/actions/dayActions';

function YearPage() {
    const year = useSelector(state => state.year);
    const yearArray = createYear(year);
    const dispatch = useDispatch();
    const handlePreviousYear = () => {
        const newDay = calendarModule({ year: year - 1, month: 0, number: 1 }).getDaysCalendar();
        dispatch(previousYear(year));
        dispatch(setDay(newDay));
    }
    const handleNextYear = () => {
        const newDay = calendarModule({ year: year + 1, month: 0, number: 1 }).getDaysCalendar();
        dispatch(nextYear(year))
        dispatch(setDay(newDay));
    }
    return (
   <PageContainer>
       <YearHeader><button onClick={handlePreviousYear} >Previous</button>{year}<button onClick={handleNextYear} >Next</button></YearHeader>
       <YearCalendarContainer>
            {yearArray.map((_, index) => <MonthInYearCal index={index} year={year} key={index} />)}
       </YearCalendarContainer>
   </PageContainer>
  )
}

const YearCalendarContainer = styled(CalendarContainer)`
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    height: 80vh;
    width: 90vw;
`

const YearHeader = styled.h1`
    margin: 0;
    padding: 0;
    display: flex;
`

export default YearPage;