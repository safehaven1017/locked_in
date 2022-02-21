import React from 'react';
import styled from 'styled-components';
import { CalendarContainer } from '../month/MonthCalendar';
import { MONTHS } from '../../calendarData';
import { calendarModule, createMonth } from '../../calendarFunctions';
import { useDispatch } from 'react-redux';
import { setDay } from '../../redux/actions/dayActions';
import { useNavigate } from 'react-router-dom';
import { setWeek } from '../../redux/actions/weekActions';
import { setMonth } from '../../redux/actions/monthActions';

function MonthInYearCal(props) {
  const month = createMonth(props.year, props.index);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDayClick = (day) => {
    dispatch(setDay(day));
    dispatch(setWeek(day, day.month, day.year));
    dispatch(setMonth(day.month, day.year));
    navigate("/DayPage");
  }
  return (
    <MonthInYearContainer>
      <MonthHeader month={props.index} year={props.year} thisYear={props.thisYear} >{MONTHS[props.index]}</MonthHeader>
      <MiniMonthCalendar>{month.map((day, index) => <DayNumber onClick={() => handleDayClick(day)} day={day} key={index} >{day.number}</DayNumber>)}</MiniMonthCalendar>
    </MonthInYearContainer>
  )
}

const MonthInYearContainer = styled.div`
  width: 15vw;
  height: 35vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const MonthHeader = styled.h1`
    margin-bottom: 1vw;
    font-weight: 300;
    font-size: 1.5vw;
    color: ${props => props.year < props.thisYear ? 
      '#4e6a87' 
      : 
      props.year === props.thisYear && props.month < new Date().getMonth() ?
        '#4e6a87'
        :
        props.year === props.thisYear && props.month === new Date().getMonth() ?
        'red'
        :
        'inherit'
    }
`

const MiniMonthCalendar = styled(CalendarContainer)`
  width: 14vw;
  height: 100%;
  padding: .1vw;
  background-color: #80808024;
  border-radius: 10px;
  margin: 0;
  box-shadow: 0px 0px 3px 1px #00000026;
`

const DayNumber = styled.div`
  width: 1.5vw;
  height: 1.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1vw;
  color: ${props => calendarModule(props.day).isToday() ? 'white' : 'inherit'};
  background-color: ${props => calendarModule(props.day).isToday() ? 'red' : 'transparent'};
  border-radius: 15px;
  transition: .2s;
  cursor: pointer;
  &:hover {
    background-color: white;
    color: ${props => calendarModule(props.day).isToday() ? 'red' : 'inherit'};
    box-shadow: 0px 0px 3px 1px #00000026;
  }
`

export default MonthInYearCal;