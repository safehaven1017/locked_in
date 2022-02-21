import React from 'react';
import { calendarModule, createYear } from '../../calendarFunctions';
import { PageContainer, CalendarContainer } from '../month/MonthCalendar';
import styled from 'styled-components';
import MonthInYearCal from './MonthInYearCal';
import { useSelector, useDispatch } from 'react-redux';
import { nextYear, previousYear } from '../../redux/actions/yearActions';
import { setDay } from '../../redux/actions/dayActions';
import { setMonth } from '../../redux/actions/monthActions';
import { setWeek } from '../../redux/actions/weekActions';

function YearPage() {
    const year = useSelector(state => state.year);
    const yearArray = createYear(year);
    const thisYear = new Date().getFullYear();
    const dispatch = useDispatch();
    const handlePreviousYear = () => {
        const newDay = calendarModule({ year: year - 1, month: 0, number: 1 }).getDaysCalendar();
        dispatch(previousYear(year));
        dispatch(setMonth(0, newDay.year));
        dispatch(setWeek(newDay, newDay.month, newDay.year));
        dispatch(setDay(newDay));
    }
    const handleNextYear = () => {
        const newDay = calendarModule({ year: year + 1, month: 0, number: 1 }).getDaysCalendar();
        dispatch(nextYear(year))
        dispatch(setMonth(0, newDay.year));
        dispatch(setWeek(newDay, newDay.month, newDay.year));
        dispatch(setDay(newDay));
    }
    return (
   <PageContainer>
       <YearHeader year={year} thisYear={thisYear} ><PrevButton onClick={handlePreviousYear} >◀</PrevButton><TitleContainer>{year}</TitleContainer><NextButton onClick={handleNextYear} >▶</NextButton></YearHeader>
       <YearCalendarContainer>
            {yearArray.map((_, index) => <MonthInYearCal index={index} year={year} thisYear={thisYear} key={index} />)}
       </YearCalendarContainer>
   </PageContainer>
  )
}

const YearCalendarContainer = styled(CalendarContainer)`
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    height: 80vh;
    width: 90vw;
    box-shadow: none;
    border-style: none;
`

export const YearHeader = styled.div`
    height: 15vh;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.year < props.thisYear ? '#4e6a87' : props.year === props.thisYear ? 'red' : 'inherit'}
`

export const TitleContainer = styled.h1`
    width: 20vw;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const PrevButton = styled.button`
    width: 4vw;
    height: 4vw;
    border-radius: 100px;
    box-shadow: 0px 0px 5px 1px #00000020;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2vw;
    background-color: white;
    border-style: none;
    padding-left: .1vw;
    color: #0d53f7;
    transition: .3s;
    &:hover {
        box-shadow: 0px 0px 5px 1px #0d53f7;
    }
    &:active {
        box-shadow: 0px 0px 5px 1px black;
        background-color: gray;
    }
`
export const NextButton = styled(PrevButton)`
    padding-left: .8vw;
`

export default YearPage;