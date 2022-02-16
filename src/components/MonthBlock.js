import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

function MonthBlock(props) {
  // To label each day with a weekday, will simply check modulus of the index
  const weekdayArray = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const dayColor = props.day.inMonth ? '#0d53f7' : '#4e6a87';
  return (
    <StyledLink to="/" dayColor={dayColor} >
        <Block>
            <WeekdayContainer inMonth={props.day.inMonth} >{weekdayArray[props.index % 7]}</WeekdayContainer>
            <NumberContainer inMonth={props.day.inMonth} >{props.day.number}</NumberContainer>
        </Block>
    </StyledLink>
  )
}

export default MonthBlock;

/* animation: ${highlightOut} .5s forwards;  */
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
    margin: 0;
    padding: 0;
    color: inherit;
    `;

const WeekdayContainer = styled.span`
    margin: .5rem;
    position: absolute;
    font-size: 1vh;
    font-weight: ${props => props.inMonth ? 700 : 400};
    `;

const NumberContainer = styled.span`
    width: 87%;
    margin: .5rem;
    position: absolute;
    text-align: right;
    font-size: 1.5vh;
    font-weight: ${props => props.inMonth ? 700 : 400};
    `;