import React from 'react'
import styled from 'styled-components'
import { HOURS } from '../../calendarData';

function TimeGrid() {
    
    return (
    <TimeGridDiv>
        {HOURS.map((time, index) => <HourSpan key={index} >{time}</HourSpan>)}
    </TimeGridDiv>
  )
}

const TimeGridDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: min-content;
  margin: 0;
  padding: 0;
`

const HourSpan = styled.span`
    height: 8rem;
    width: 5vw;
    margin: 0;
    padding: 0;
    right: 3vw;
`

export default TimeGrid