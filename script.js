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

Date.prototype.subtractDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() - days);
  return date;
};

// MAIN FUNCTION
// best = dueDate - transitTime - any num of weekend days
// TODO add proper return value
// TODO add test cases - seems to work appropriately now

function findBestShipDate(cust, due) {
  const transitTime = 3;
  const dueDate = new Date(due);
  let bestShipDate = new Date(due);
  let daysInTransit = 0;
  let weekendDays = 0;
  let dayToCheck = new Date(due);
  let calendarDays = 0;

  while (daysInTransit < transitTime) {
    dayToCheck = dueDate.subtractDays(daysInTransit + 1);
    // console.log(
    //   `Checking day: ${dayToCheck.getMonth() + 1}/${dayToCheck.getDate()}`
    // );
    if (dayToCheck.getDay() === 0 || dayToCheck.getDay() === 6) {
      console.log(`^^ that's a weekend day`);
      weekendDays++;
    }
    daysInTransit++;
  }

  calendarDays = daysInTransit + weekendDays;
  bestShipDate = bestShipDate.subtractDays(calendarDays);

  if (bestShipDate.getDay() === 0) {
    bestShipDate -= 2;
  } else if (bestShipDate.getDay() === 6) {
    bestShipDate -= 1;
  }

  console.log(`Order is due: ${dueDate.getMonth() + 1}/${dueDate.getDate()}`);
  console.log(
    `Best day to ship: ${bestShipDate.getMonth() + 1}/${bestShipDate.getDate()}`
  );
  bestShipDate.getDay() === 0 || bestShipDate.getDay() === 6
    ? console.log(`Looks like you are trying to ship on a weekend`)
    : console.log(`Ship day looks good`);
}

findBestShipDate("Chino", "10/28/2022");
