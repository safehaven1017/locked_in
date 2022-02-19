import React from 'react'
import styled from 'styled-components'
import { WEEKDAYS } from '../../calendarData';
import { calendarModule } from '../../calendarFunctions'
import { useDispatch } from 'react-redux';
import { setDay } from '../../redux/actions/dayActions';
import { useNavigate } from 'react-router-dom';

function DayHeader(props) {
    const isToday = calendarModule(props.day).isToday();
    const { number, month, year } = props.day;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const navigateToDay = () => {
        dispatch(setDay(props.day));
        navigate("/DayPage");
    }
    return (
    <DayHeaderContainer>
        <InnerHeader isToday={isToday} onClick={navigateToDay} isPast={calendarModule(props.day).isPast()} >
            {WEEKDAYS[props.index]} {number}
        </InnerHeader>
    </DayHeaderContainer>
    )
}

export const DayHeaderContainer = styled.div`
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-self: flex-end;
    `

const InnerHeader = styled.span`
  color: ${props => !props.isPast ? props.isToday ? 'white' : '#0d53f7' : '#4e6a87'};
  font-size: 2vw;
  border-radius: 15px;
  padding: .3vw;
  cursor: pointer;
  ${props => props.isToday && 'background-color: red;'}
`

export default DayHeader;