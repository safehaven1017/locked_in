import React from 'react';
import { PageContainer } from '../month/MonthCalendar';
import DayHeader from '../week/DayHeader';
import { useSelector } from 'react-redux';
import { WeekTitle, ContentContainer } from '../week/WeekPage';
import styled from 'styled-components';
import WeekCalendar from '../week/WeekCalendar';
import { MONTHS, WEEKDAYS } from '../../calendarData';
import { calendarModule } from '../../calendarFunctions';

function DayPage() {
    const { day } = useSelector(state => state.day);
    const isToday = calendarModule(day).isToday();
    const isPast = calendarModule(day).isPast();
  return (
    <PageContainer>
      <DayTitle isToday={isToday} isPast={isPast} >
         {MONTHS[day.month]} &nbsp; <DayHeader day={day} />
      </DayTitle>
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
    ${props => props.isToday ? "background-color: red; color: white;" : props.isPast ? 'color: #4e6a87;' : 'color: #0d53f7;'}
`

export default DayPage;