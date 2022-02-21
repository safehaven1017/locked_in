import React from 'react';
import { PageContainer } from '../month/MonthCalendar';
import DayHeader from '../week/DayHeader';
import { useSelector, useDispatch } from 'react-redux';
import { WeekTitle, ContentContainer } from '../week/WeekPage';
import styled from 'styled-components';
import WeekCalendar from '../week/WeekCalendar';
import { MONTHS } from '../../calendarData';
import { calendarModule } from '../../calendarFunctions';
import { previousDay, nextDay } from '../../redux/actions/dayActions'

function DayPage() {
    const { day } = useSelector(state => state.day);
    const dispatch = useDispatch();
    const isToday = calendarModule(day).isToday();
    const isPast = calendarModule(day).isPast();
  return (
    <PageContainer>
      <DayTitle isToday={isToday} isPast={isPast} >
         <button onClick={() => dispatch(previousDay(day))} >Previous Day</button>
         {MONTHS[day.month]} &nbsp; <DayHeader day={day} />
         <button onClick={() => dispatch(nextDay(day))} >Next Day</button>
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