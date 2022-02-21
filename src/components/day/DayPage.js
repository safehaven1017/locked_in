import React from 'react';
import { PageContainer } from '../month/MonthCalendar';
import { useSelector, useDispatch } from 'react-redux';
import { WeekTitle, ContentContainer } from '../week/WeekPage';
import styled from 'styled-components';
import WeekCalendar from '../week/WeekCalendar';
import { MONTHS } from '../../calendarData';
import { calendarModule, createMonth } from '../../calendarFunctions';
import { previousDay, nextDay } from '../../redux/actions/dayActions'
import { setWeek } from '../../redux/actions/weekActions';
import { setMonth } from '../../redux/actions/monthActions';
import { setYear } from '../../redux/actions/yearActions';

function DayPage() {
    const { day } = useSelector(state => state.day);
    const dispatch = useDispatch();
    const isToday = calendarModule(day).isToday();
    const isPast = calendarModule(day).isPast();
    const handlePreviousDay = () => {
      dispatch(previousDay(day));
      const newDay = day.number === 1 ?
        createMonth(day.year, day.month - 1).reverse().find(day => day.inMonth)
        :
        calendarModule({ ...day, number: day.number - 1 }).getDaysCalendar();
      dispatch(setWeek(newDay, newDay.month, newDay.year));
      dispatch(setMonth(newDay.month, newDay.year));
      dispatch(setYear(newDay.year));
    }
    const handleNextDay = () => {
      dispatch(nextDay(day));
      const newDay = createMonth(day.year, day.month).reverse().find(day => day.inMonth).number === day.number ?
        createMonth(day.year, day.month + 1).find(day => day.inMonth)
        :
        calendarModule({ ...day, number: day.number + 1 }).getDaysCalendar();
      dispatch(setWeek(newDay, newDay.month, newDay.year));
      dispatch(setMonth(newDay.month, newDay.year));
      dispatch(setYear(newDay.year));
    }
  return (
    <PageContainer>
      <DayTitle isToday={isToday} isPast={isPast} >
         <button onClick={handlePreviousDay} >Previous Day</button>
         <span>{MONTHS[day.month]}  {day.number}, {day.year}</span>
         <button onClick={handleNextDay} >Next Day</button>
      </DayTitle>
      <div style={{fontSize: '3vw', fontWeight: '200'}}>{calendarModule(day).findWeekDay()}</div>
      <ContentContainer>
          <WeekCalendar />
      </ContentContainer>
    </PageContainer>
  )
}

const DayTitle = styled(WeekTitle)`
    margin-bottom: 5vh;
    border-radius: 10px;
    padding: .5vw;
    display: flex;
    ${props => props.isToday ? "background-color: red; color: white;" : props.isPast ? 'color: #4e6a87;' : 'color: #0d53f7;'}
`

export default DayPage;