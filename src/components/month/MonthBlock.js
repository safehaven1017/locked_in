import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { WEEKDAYS } from '../../calendarData';
import { useState } from 'react';
import { calendarModule } from '../../calendarFunctions';
import { useDispatch } from 'react-redux';
import { setWeek } from '../../redux/actions/weekActions';
import { setMonth } from '../../redux/actions/monthActions';
import { setYear } from '../../redux/actions/yearActions';
import { setDay } from '../../redux/actions/dayActions';

function MonthBlock(props) {
  // const dayArray = useSelector(state => state.month.dayArray);
  // Deconstructing props
  const { number, month, year, inMonth } = props.day;
  const day = number;
  // When user clicks on link, we set the week global state then navigate to weekpage
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoToDay = () => {
    dispatch(setDay(props.day))
    dispatch(setWeek(props.day, month, year));
    dispatch(setMonth(month, year));
    dispatch(setYear(year));
    navigate("/DayPage");
  }
  // Creating states: isHover for css, thisWeek to create a week upon clicking a day to go to week view
  const [ isHover, setIsHover ] = useState(false);
  // console.log(thisWeek);
  // Lets highlight day if it is today... need to create date object to do that
  const isToday = calendarModule(props.day).isToday();
  // To label each day with a weekday, will simply check modulus of the index (index % 7)
  const dayColor = inMonth ? '#0d53f7' : '#4e6a87';
  return (
    <StyledDay day_color={dayColor} onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} >
        <WeekdayContainer inMonth={inMonth} >{WEEKDAYS[props.index % 7]}</WeekdayContainer>
        <WeekLink isToday={isToday} onClick={() => handleGoToDay()} >
            <NumberContainer inMonth={inMonth} isToday={isToday} isHover={isHover} >{day}</NumberContainer>
        </WeekLink>
    </StyledDay>
  )
}

export default MonthBlock;

const StyledDay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  color: ${props => props.day_color};
  margin: 0;
  position: relative;
  border-style: solid;
  border-bottom-style: none;
  border-right-style: none;
  border-color: #0d53f77a;
  border-width: .5px;
  transition: color .5s, background-color .5s;
  &:hover {
    color: white;
    background-color: #ff000085;  
  }
  &:nth-child(7n+7) {
    border-right-style: solid;
  }
  &:nth-last-child(-n+7) {
    border-bottom-style: solid;
  }
`;

const WeekdayContainer = styled.span`
    left: .01vw;
    margin: .5rem;
    position: absolute;
    color: inherit;
    font-size: 1vh;
    font-weight: ${props => props.inMonth ? 700 : 400};
    `;

const WeekLink = styled.a`
    color: ${props => props.isToday ? 'red !important' : 'inherit'};
    width: 1.7vw;
    height: 1.7vw;
    left: 82%;
    margin-top: .04rem;
    position: absolute;
    text-decoration: none;
    transition: color .5s, background-color .5s;
    border-radius: 6px;
    cursor: pointer;
    &:hover {
        color: white;
        background-color: #0d53f7;
    }
`

const NumberContainer = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.7vw;
    height: 1.7vw;
    transition: color .5s, background-color .5s;
    color: ${props => props.isHover ? (props.isToday ? "white" : "red") : (props.isToday ? "red" : props.inMonth ? '#0d53f7': "#4e6a87")};
    text-align: center;
    font-size: 1.5vh;
    font-weight: ${props => props.inMonth ? 700 : 400};
    background-color: ${props => props.isHover ? (props.isToday ? "red" : "white") : "transparent"};
    border-radius: 6px;
    text-decoration: none;
 `;