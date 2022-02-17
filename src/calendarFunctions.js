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
    // We will use count to determine what week the specific day is is: floor( count / 7 ) will give us a week index
    let weekCount = 0;
    if (previousMonth.getDay() < 6) {
      for (let i = (previousMonth.getDate() - previousMonth.getDay()); i <= previousMonth.getDate(); i++) {
        daysArray.push({
          year: previousMonth.getFullYear(),
          month: previousMonth.getMonth(),
          week: createWeekIndex(weekCount),
          number: i,
          inMonth: false
        });
        weekCount++;
      }
    }
    // Push all the numerical days of this month
    for (let i = 1; i <= thisMonthsDays; i++) {
      daysArray.push({
        year: lastDayThisMonth.getFullYear(),
        month: lastDayThisMonth.getMonth(),
        week: createWeekIndex(weekCount),
        number: i,
        inMonth: true
      });
      weekCount++
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
          week: createWeekIndex(weekCount),
          number: count,
          inMonth: false
        });
        count++;
        weekCount++;
      }
    }
    return daysArray;
}

export function createWeekIndex(indexInMonth) {
    return Math.floor(indexInMonth / 7);
}

// To create an array of day objects that form a week, we are going to grab all the days that return the same
// week index
export function createWeek(monthArray, day) {
    return monthArray.filter(monthDay => monthDay.week === day.week);
}

// Compare dates to see if it is the current date
export function calculateIsToday(day) {
    const today = new Date();
    if (today.getFullYear() === day.year && today.getMonth() === day.month && today.getDate() === day.number) {
        return day;
    } else {
        return false;
    }
}

// export const currentCalendarDate = {
//     currentDate: () => {
//         return new Date();
//     },
//     createMonth: () => {
//         return createMonth(currentCalendarDate.currentDate().getFullYear(), currentCalendarDate.currentDate().getMonth());
//     },
//     createToday: () => {
//         return currentCalendarDate.createMonth().filter(calculateIsToday);
//     },
//     createWeek: () => {
//         return createWeek(currentCalendarDate.createMonth(), currentCalendarDate.createToday()); 
//     }
// }

export function calendarModule(day = { year: new Date().getFullYear(), month: new Date().getMonth(), number: new Date().getDate() }) {
    return {
        getCurrentDate: () => {
            return new Date();
        },
        getMonthCalendar: () => {
            return createMonth(day.year,day.month);
        },
        getDaysCalendar: () => {
            const daysArray = createMonth(day.year, day.month).filter(monthDay => monthDay.year === day.year && monthDay.month === day.month && monthDay.number === day.number);
            if (daysArray.length === 1) {
                return daysArray[0]
            } else {
                return daysArray;
            }
        },
        isToday: () => {
            const today = new Date();
            if (today.getFullYear() === day.year && today.getMonth() === day.month && today.getDate() === day.number) {
                return day;
            } else {
                return false;
            }
        }, 
        getWeekCalendar: () => {
            console.log(createMonth(day.year, day.month))
            console.log(calendarModule(day).getDaysCalendar());
            return createWeek(createMonth(day.year, day.month), calendarModule(day).getDaysCalendar()); 
        }
    }
}


// Finds the first day that is part of the selected week to display the name of the month
export function findMonthFromWeek(week) {
    const validDay = week.find(day => day.inMonth === true);
    return {
      year: validDay.year,
      month: validDay.month
    }
  }
// Finds the first day that is part of the selected week to display the name of the month
export function findMonthFromMonth(month) {
    const validDay = month.find(day => day.inMonth === true);
    return {
      year: validDay.year,
      month: validDay.month
    }
  }

// Determine if a day object has already past by comparing it todays date
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

// Convert "YYYY-MM" date string to numbers
export function dateStringToObject(string) {
    const splitDate = string.split('-');
    return {
        month: parseInt(splitDate[1]) - 1,
        year: parseInt(splitDate[0])
    }
}