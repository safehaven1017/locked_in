import React from 'react'
import styled from 'styled-components'
import { WEEKDAYS } from '../../calendarData';
import { isPast, calculateIsToday } from '../../calendarFunctions'

function DayHeader(props) {
    const currentDate = new Date();
    const isToday = calculateIsToday(props.day);
    const { number, month, year } = props.day;
    return (
    <DayHeaderContainer>
        <InnerHeader isPast={isPast(props.day)} >
            {WEEKDAYS[props.index]} {number}
        </InnerHeader>
    </DayHeaderContainer>
    )
}

const DayHeaderContainer = styled.div`
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    `

const InnerHeader = styled.span`
  color: ${props => !props.isPast ? '#0d53f7' : '#4e6a87'};
  font-size: 2vw;
  border-radius: 15px;
  padding: 13px;
`

export default DayHeader;