import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { WEEKDAYS } from '../../calendarData';
import { useState } from 'react';
import { createWeek, createMonth, findMonth } from '../../calendarFunctions';

function MonthBlock(props) {
  // Deconstructing props
  const { number, month, year, inMonth } = props.day;
  const day = number;
  // Creating states: isHover for css, thisWeek to create a week upon clicking a day to go to week view
  const [ isHover, setIsHover ] = useState(false);
  // const propDate = new Date(year, month)
  // const monthOfIndex = (inMonth === false && number > 15) ? month - 1 
  const [ thisWeek, setThisWeek ] = useState(createWeek(props.monthArray, props.index))
  // Lets highlight day if it is today... need to create date object to do that
  const today = new Date();
  let isToday = false;
  if (today.getFullYear() === year && today.getMonth() === month && today.getDate() === day) {
      isToday = true;
  }
  // To label each day with a weekday, will simply check modulus of the index
  const week = Math.floor((props.index) / 7) + 1
  const dayColor = inMonth ? '#0d53f7' : '#4e6a87';
  return (
    <StyledDay day_color={dayColor} onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} >
        <WeekdayContainer inMonth={inMonth} >{WEEKDAYS[props.index % 7]}</WeekdayContainer>
        <WeekLink to="/WeekPage" state={thisWeek} >
            <NumberContainer inMonth={inMonth} isToday={isToday} isHover={isHover} >{day}</NumberContainer>
        </WeekLink>
        <Block> 
            <InnerSpan>WEEK: {week}</InnerSpan>
            <InnerSpan>DATE: {month + 1}/{day}/{year}</InnerSpan>    
        </Block>  
    </StyledDay>
  )
}

export default MonthBlock;

const StyledDay = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  color: ${props => props.day_color};
  margin: 0;
  position: relative;
  border-style: solid;
  border-bottom-style: none;
  border-right-style: none;
  border-color: #00000061;
  border-width: .01px;
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

const Block = styled.button`
    margin: 0;
    padding: 0;
    /* height: 2vh; */
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border-style: none;
    &:hover {
    color: #0d53f7;
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

const WeekLink = styled(Link)`
    width: 1.7vw;
    height: 1.7vw;
    left: 82%;
    margin-top: .04rem;
    position: absolute;
    text-decoration: none;
    transition: color .5s, background-color .5s;
    border-radius: 6px;
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
    color: ${props => props.isToday ? (props.isHover ? "red" : "white") : "inherit"};
    text-align: center;
    font-size: 1.5vh;
    font-weight: ${props => props.inMonth ? 700 : 400};
    background-color: ${props => props.isToday ? (props.isHover ? "white" : "red") : "transparent"};
    border-radius: 6px;
    text-decoration: none;
 `;

const InnerSpan = styled.span`
    font-size: 10px;
`