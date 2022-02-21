import { WEEKDAYS } from "./calendarData";

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
    let count = 1;
    if (lastDayThisMonth.getDay() < 6) {
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
    // I want each month to have 6 weeks.
    if (daysArray.length < 42) {
        for (let i = 0; i < 7; i++) {
          daysArray.push({
            year: nextMonth.getFullYear(),
            month: nextMonth.getMonth(),
            week: createWeekIndex(weekCount),
            number: count,
            inMonth: false
          });
          count++;
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

// Load first week of month
export function getFirstWeek(monthArray) {
    return monthArray.filter((_, index) => index < 7);
}

// Load end week of month
export function getEndWeek(monthArray) {
    return monthArray.filter((_, index) => index > monthArray.length - 8);
}

// Load previous week: determine what week to load based on what days of the week are "inMonth"
export function getPreviousWeek(weekArray) {
    if (!weekArray[0].inMonth) {
        const newMonth = createMonth(weekArray[0].year, weekArray[0].month);
        return newMonth.filter((_, index) => index > newMonth.length - 15 && index < newMonth.length - 7)
    } else if (weekArray[0].week === 0 && weekArray[0].inMonth) {
        return getEndWeek(createMonth(weekArray[0].year, weekArray[0].month - 1));
    } else {
        return createMonth(weekArray[0].year, weekArray[0].month).filter(day => day.week === weekArray[0].week - 1);
    }
} 

// Load next week: determine what week to load based on what days of the week are "inMonth"
export function getNextWeek(weekArray) {
    if (weekArray[0].week > 0 && weekArray[6].number < 8) {
        const newMonth = createMonth(weekArray[6].year, weekArray[6].month);
        return newMonth.filter((_, index) => index > 6 && index < 14);
    } else if (!weekArray.find(day => !day.inMonth) && JSON.stringify(getEndWeek(createMonth(weekArray[0].year, weekArray[0].month))) === JSON.stringify(weekArray)) {
        return getFirstWeek(createMonth(weekArray[0].year, weekArray[0].month + 1));
    } else {
        return createMonth(weekArray[6].year, weekArray[6].month).filter(day => day.week === weekArray[6].week + 1);
    }
}

// Created library to handle a few common things with a day object
export function calendarModule(day = { year: new Date().getFullYear(), month: new Date().getMonth(), number: new Date().getDate() }) {
    return {
        getCurrentDate: () => {
            return new Date();
        },
        getMonthCalendar: () => {
            return createMonth(day.year,day.month);
        },
        getDaysCalendar: (days = [day]) => {
            const daysArray = days.map(day => 
                createMonth(day.year, day.month).filter(monthDay => monthDay.year === day.year && monthDay.month === day.month && monthDay.number === day.number)[0]
            )
            if (daysArray.length === 1) {
                return daysArray[0]
            } else {
                return daysArray;
            }
        },
        getWeekCalendar: () => {
            return createWeek(createMonth(day.year, day.month), calendarModule(day).getDaysCalendar()); 
        },
        // Find weekday out of seven day week from day object
        findWeekDay: () => {
            return WEEKDAYS[calendarModule(day).getWeekCalendar().findIndex(weekday => day.number === weekday.number)];  
        },
        // Determine if a day object has already past by comparing it todays date
        isToday: () => {
            const today = new Date();
            if (today.getFullYear() === day.year && today.getMonth() === day.month && today.getDate() === day.number) {
                return day;
            } else {
                return false;
            }
        },
        // Determine if day is already past 
        isPast: () => {
            const today = new Date();
            if (today.getFullYear() > day.year) {
            return true;
            } else if (today.getMonth() > day.month && today.getFullYear() === day.year) {
                return true;
            } else if (today.getMonth() === day.month && today.getFullYear() === day.year && today.getDate() > day.number) {
                return true;
            } else {
                return false;
            }
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

// Finds the first day that is part of the selected week to display the month/year
export function findMonthFromCalendar(dayArray) {
    const validDay = dayArray.find(day => day.inMonth === true);
    return {
      year: validDay.year,
      month: validDay.month
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