import React from 'react';
import styled from 'styled-components';
import { HOURS, WEEKDAYS  } from '../../calendarData';

function WeekGrid() {
    return (
    <WeekGridContainer>
        {new Array(WEEKDAYS.length).fill().map((_, index) => 
        <GridColumn key={index} >
            {HOURS.map((_, index) => <GridRow key={index} />)}
        </GridColumn>)}
    </WeekGridContainer>
  )
}

const WeekGridContainer = styled.div`
    display: flex;
    flex-grow: 1;
    width: 100%;
    opacity: .3;
    position: absolute;
`

export const GridColumn = styled.div` 
    flex-grow: 1;
    padding: 0;
    margin: 0;
`

export const GridRow = styled.div`
    height: 8rem;
    width: inherit;
    border-bottom-style: solid;
    border-right-style: solid;
    border-width: .01px;
    padding: 0;
    margin: 0;
    box-sizing: border-box;

`

export default WeekGrid;