"use strict";

// FAKE DATA

const dummyJSON = {
  consignees: [
    "KeHE - Chino",
    "Wegmans",
    "UNFI - Dayville",
    "UNFI - Moreno Valley",
  ],
  avgTransitTimes: [2, 3, 1, 7],
};

// DOM
const screen = document.querySelector("#screen");
const selectConsignee = document.querySelector("#select-consignee");
const consignees = ["KeHE - Chino", "Wegmans", "UNFI - Dayville"];
const btnSubmit = document.querySelector("#submit");
// p just to test shit
const testy = document.querySelector("#testy");

for (const consignee of dummyJSON.consignees) {
  const option = document.createElement("option");
  option.innerText = consignee;
  option.value = consignee;
  selectConsignee.appendChild(option);
}

// will need to link this to the main function at some point
// long term, this will go on the main script while the functionality
// that handles calculating ship date will become a module
// FIXME not passing due date correctly - might need to reform or get a raw value
// looks like the dueDate is being reduced by 1 somehow?
btnSubmit.addEventListener("click", () => {
  const selection = selectConsignee.value;
  const transitTime =
    dummyJSON.avgTransitTimes[dummyJSON.consignees.indexOf(selection)];
  const dueDate = document.querySelector("#due-date").value;
  console.log(`Due date from event listener: ${dueDate}`);
  console.log(selection);
  console.log(`Transit time for this customer: ${transitTime}`);
  if (dummyJSON.consignees.includes(selection)) {
    testy.innerText = findBestShipDate(transitTime, dueDate);
  } else {
    alert("Something went wrong");
  }
});

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
