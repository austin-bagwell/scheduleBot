"use strict";
// For a customer with a known average time in transit and a known due date,
// Best ship date = the Date value of:
//   availableShipDays - avgTimeInTransit
//   where availableShipDays = dueDate - today - weekend days

// TODO correctly formatting dates to pass into all Date functions

// getting total difference of dueDate and today
function dateDiffInDays(start, end) {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  const utc1 = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const utc2 = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

const today = new Date();
const weekFromToday = new Date(2022, 9, 28);
const difference = dateDiffInDays(today, weekFromToday);
console.log(difference + ` days`);

// counting num of weekend days
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

function findBestShipDate(cust, due) {
  const today = new Date();
  const dueDate = new Date(due);
  console.log(
    `Customer ${cust} has a due date of ${due}\nThe best day to ship this order is in X days.`
  );
}
