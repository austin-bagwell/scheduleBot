"use strict";
//
// HELPER FUNCTIONS
//
Date.prototype.subtractDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getUTCDate() - days);
  return date;
};

//
//
// MAIN FUNCTION
//
//
export function findBestShipDate(timeInTransit, due) {
  const transitTime = timeInTransit;
  const dueDate = new Date(`${due}T00:00`);
  let bestShipDate = new Date(`${due}T00:00`);
  let daysInTransit = 0;
  let weekendDays = 0;

  while (daysInTransit < transitTime) {
    let dayToCheck = new Date(due);
    dayToCheck = dueDate.subtractDays(daysInTransit + 1);
    if (dayToCheck.getDay() === 0 || dayToCheck.getDay() === 6) {
      weekendDays++;
    }
    daysInTransit++;
  }

  const calDaysInTransit = daysInTransit + weekendDays;
  bestShipDate = bestShipDate.subtractDays(calDaysInTransit);

  if ([0, 6].includes(bestShipDate.getDay())) {
    bestShipDate = bestShipDate.subtractDays(1);
  }

  const message = `Best day to ship: ${
    bestShipDate.getMonth() + 1
  }/${bestShipDate.getDate()}`;

  return message;
}
