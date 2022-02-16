import React from 'react';
import styled from 'styled-components';
import MonthBlock from './MonthBlock';

const YEAR = 2023;
const MONTH = 11;

// Create an array of objects that contains information on each day in the month
// To clarify, "numerical day" and "day" are two different things in the comments - (numerical day ex: 20th) (day ex: a weekday (Thursday))
export function createMonthArray(year, month) {
  const daysArray = [];
  // To create our calendar, we need the number of numerical days in this month and the previous month
  const lastDayThisMonth = new Date(year, month + 1, 0);
  const thisMonthsDays = lastDayThisMonth.getDate();
  // We need to reference the last numerical day of the last month in case the first day of the current month does not start on Sunday.
  // With this, we can display the last numerical days of the month leading up to the current month
  const previousMonth = new Date(year, month, 0);
  // Subtract the last numerical day of last month minus the day of the week to push the days starting from monday in the last week of the
  // previous month. This should only happen if the previous month doesn't end on a Saturday
  if (previousMonth.getDay() < 6) {
    for (let i = (previousMonth.getDate() - previousMonth.getDay()); i <= previousMonth.getDate(); i++) {
      daysArray.push({
        year: previousMonth.getFullYear(),
        month: previousMonth.getMonth(),
        number: i,
        inMonth: false
      });
    }
  }
  // Push all the numerical days of this month
  for (let i = 1; i <= thisMonthsDays; i++) {
    daysArray.push({
      year: lastDayThisMonth.getFullYear(),
      month: lastDayThisMonth.getMonth(),
      number: i,
      inMonth: true
    });
  }
  // We'll go ahead and create a date object to determine if the next month is in the next year
  const nextMonth = new Date(year, month + 1, 1);
  // on the last week of this month we should still display the rest of the days of the week even if it is next month
  if (lastDayThisMonth.getDay() < 6) {
    let count = 1;
    for (let i = lastDayThisMonth.getDay(); i < 6; i++) {
      daysArray.push({
        year: nextMonth.getFullYear(),
        month: nextMonth.getMonth(),
        number: count,
        inMonth: false
      });
      count++;
    }
  }
  return daysArray;
}

// The purpose of this component is to display a monthly calendar. It should automatically change out number days based on the month
// each calendar page should display all the weeks encapsulating the month
function MonthCalendar() {
  return (
    <PageContainer>
      <CalendarContainer>
        {createMonthArray(YEAR, MONTH).map((day, index) => <MonthBlock day={day} index={index} key={index} />)}
      </CalendarContainer>
    </PageContainer>
  )
}

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const CalendarContainer = styled.div`
  width: 70vw;
  height: 90vh;
  margin: 5vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`

export default MonthCalendar;

