import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { WEEKDAYS } from '../calendarData';
import { useState } from 'react';

function MonthBlock(props) {
  const [ isHover, setIsHover ] = useState(false);
  const { number, month, year, inMonth } = props.day;
  const day = number;
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
    <StyledLink to="/" day_color={dayColor} onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} >
            <WeekdayContainer inMonth={inMonth} >{WEEKDAYS[props.index % 7]}</WeekdayContainer>
            <NumberContainer inMonth={inMonth} isToday={isToday} isHover={isHover} >{day}</NumberContainer>
        <Block>
            <InnerSpan>WEEK: {week}</InnerSpan>
            <InnerSpan>DATE: {month + 1}/{day}/{year}</InnerSpan>
        </Block>
    </StyledLink>
  )
}

export default MonthBlock;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.day_color};
  margin: 0;
  position: relative;
  border-style: solid;
  border-bottom-style: none;
  border-right-style: none;
  border-color: #00000061;
  border-width: .01px;
  transition: color 1s, background-color 1s;
  &:hover {
    color: white;
        background-color: red;  
    }
    &:nth-child(7n+7) {
        border-right-style: solid;
    }
    &:nth-last-child(-n+7) {
        border-bottom-style: solid;
    }
`;

const Block = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    color: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const WeekdayContainer = styled.span`
    width: 2vw;
    height: 2vw;
    margin: .5rem;
    position: absolute;
    color: inherit;
    font-size: 1vh;
    font-weight: ${props => props.inMonth ? 700 : 400};
    `;

const NumberContainer = styled.span`
    margin-top: .04rem;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.7vw;
    height: 1.7vw;
    left: 82%;
    transition: color 1s, background-color 1s;
    color: ${props => props.isToday ? (props.isHover ? "red" : "white") : "inherit"};
    text-align: center;
    font-size: 1.5vh;
    font-weight: ${props => props.inMonth ? 700 : 400};
    background-color: ${props => props.isToday ? (props.isHover ? "white" : "red") : "transparent"};
    border-radius: 6px;
 `;

const InnerSpan = styled.span`
    font-size: 10px;
`