import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MONTHS, WEEKDAYS } from '../calendarData'

function MonthBlock(props) {
  const { number, month, year, inMonth } = props.day;
  const day = number;
  // To label each day with a weekday, will simply check modulus of the index
  const week = Math.floor((props.index) / 7) + 1
  const dayColor = inMonth ? '#0d53f7' : '#4e6a87';
  return (
    <StyledLink to="/" dayColor={dayColor} >
            <WeekdayContainer inMonth={inMonth} >{WEEKDAYS[props.index % 7]}</WeekdayContainer>
            <NumberContainer inMonth={inMonth} >{day}</NumberContainer>
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
  color: ${props => props.dayColor};
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
    margin: .5rem;
    position: absolute;
    color: inherit;
    font-size: 1vh;
    font-weight: ${props => props.inMonth ? 700 : 400};
    `;

const NumberContainer = styled.span`
    width: 87%;
    margin: .5rem;
    position: absolute;
    color: inherit;
    text-align: right;
    font-size: 1.5vh;
    font-weight: ${props => props.inMonth ? 700 : 400};
 `;

const InnerSpan = styled.span`
    font-size: 10px;
`