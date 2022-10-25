"use strict";

//
// HELPER FUNCTIONS
//

Date.prototype.subtractDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() - days);
  return date;
};

//
//
// MAIN FUNCTION
//
//

function findBestShipDate(transit, due) {
  const transitTime = transit;
  const dueDate = new Date(due);
  let bestShipDate = new Date(due);
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

  const calendarDays = daysInTransit + weekendDays;
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
  //   bestShipDate.getDay() === 0 || bestShipDate.getDay() === 6
  //     ? console.log(`Looks like you are trying to ship on a weekend`)
  //     : console.log(`Ship day looks good`);

  const message = `Best day to ship: ${
    bestShipDate.getMonth() + 1
  }/${bestShipDate.getDate()}`;
  return message;
}
