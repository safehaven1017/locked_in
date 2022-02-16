// Create an array of objects that contains information on each day in the month
// To clarify, "numerical day" and "day" are two different things in the comments - (numerical day ex: 20th) (day ex: a weekday (Thursday))
export function createMonth(year, month) {
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

// To create an array of day objects that form a week, we are going to filter out all the days that return the same
// floored number when divided by 7 (# of days in a week)
export function createWeek(month, dayIndex) {
    const week = month.filter((monthDay, index) => (Math.floor(index / 7) === Math.floor(dayIndex / 7)))
    return week;
}

// Finds the first day that is part of the selected month to display the name of the month
export function findMonth(week) {
    const validDay = week.find(day => day.inMonth === true);
    return {
      year: validDay.year,
      month: validDay.month
    }
  }

// determine if a day object has already past by comparing it todays date
export function isPast(day) {
 const todaysDate = new Date();
 if (todaysDate.getFullYear() > day.year) {
   return true;
 } else if (todaysDate.getMonth() > day.month && todaysDate.getFullYear() === day.year) {
    return true;
 } else if (todaysDate.getMonth() === day.month && todaysDate.getFullYear() === day.year && todaysDate.getDate() > day.number) {
     return true;
 } else {
     return false;
 }
}