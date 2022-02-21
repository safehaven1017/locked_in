import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { dateStringToObject, calendarModule } from '../calendarFunctions';
import { setMonth } from '../redux/actions/monthActions';

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/YearPage");
  });
  const {  calendarMonth, calendarYear } = useSelector(state => state);
  const dispatch = useDispatch();
  // When setting default state for calendar month must convert to proper "MM" format  
  const [ dateString, setDateString ] = useState(`${calendarYear}-${(0 + (calendarMonth + 1).toString()).slice(-2)}`);
  // Function will dispatch date to global state on change
  const handleChange = (e) => {
      setDateString(e.target.value);
      const dateObj = dateStringToObject(e.target.value);
      dispatch(setMonth(dateObj.month, dateObj.year));
  }
  return (
    <div>
        <div>Home</div>
        <Link to="/MonthPage">Month Page</Link>
        <input type="month" value={dateString} onChange={(e) => handleChange(e)} />
    </div>
  )
}

export default Home