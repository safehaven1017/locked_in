import React from 'react'
import styled from 'styled-components'
import { MONTHS, WEEKDAYS } from '../../calendarData';
import { isPast } from '../../calendarFunctions'

function DayHeader(props) {
    const { year, month, number, inMonth } = props.day;
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
`

export default DayHeader;