"use strict";
// For a customer with a known average time in transit and a known due date,
// Best ship date = the Date value of:
//   availableShipDays - avgTimeInTransit
//   where availableShipDays = dueDate - today - weekend days

// FIXME not correctly calculating 'ship in x days' - need to think more mathematically about that bit

// TODO correctly formatting dates to pass into all Date functions?
// works with a string formatted "MM/DD/YYYY"
// need to validate that all inputs passed from forms match that input

// TODO how to turn # of days into an actual Date value
// aka go from "ship in 3 days" to "ship on 10/31/22"

// DOM ELEMENTS
const screen = document.querySelector("#screen");

// HELPER FUNCTIONS
function numDaysBetweenDates(start, end) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const utc2 = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function countWeekendDays(startDate, endDate) {
  let count = 0;

  while (startDate < endDate) {
    startDate.setDate(startDate.getDate() + 1);
    if (startDate.getDay() === 0 || startDate.getDay() === 6) {
      count++;
    }
  }
  return count;
}

// MAIN FUNCTION
function findBestShipDate(cust, due) {
  const today = new Date();
  let shipDate = new Date();
  const testDate = new Date("10/26/22");
  const dueDate = new Date(due);
  const transitTime = 3;

  //   formats day-of-week index into longfrom day-of-week
  const options = { weekday: "long" };
  //   console.log(new Intl.DateTimeFormat("en-US", options).format(today));

  const totalDaysTodayTilDue = numDaysBetweenDates(testDate, dueDate);
  const numWeekendDays = countWeekendDays(testDate, dueDate);
  const daysNoWeekends = totalDaysTodayTilDue - numWeekendDays;

  const shipInThisManyDays = totalDaysTodayTilDue - transitTime;
  console.log(`Total days from today until due date: ` + totalDaysTodayTilDue);
  console.log(
    `Total number of weekend days in that time frame: ` + numWeekendDays
  );
  console.log(
    `Total days - weekend days: ${totalDaysTodayTilDue - numWeekendDays}`
  );

  //   shipDate.setDate(31);
  //   console.log(`Ship Date: ${shipDate}`);
  const message = `Customer ${cust} has a due date of ${due}\nThe best day to ship this order is in ${shipInThisManyDays} days.`;

  console.log(message);
  screen.innerText = message;
}

findBestShipDate("chino", "11/1/2022");
