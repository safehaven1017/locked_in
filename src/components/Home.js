import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'


function Home() {
  const { monthArray, calendarMonth, calendarYear } = useSelector(state => state);
  const [ monthNum, setMonthNum ] = useState(calendarMonth);
  return (
    <div>
        <div>Home</div>
        <Link to="/MonthPage">Month Page</Link>
        <button onClick={() => setMonthNum((monthNum + 1) % 12)} >up</button>
        <div>{monthNum}</div>
    </div>
  )
}

export default Home