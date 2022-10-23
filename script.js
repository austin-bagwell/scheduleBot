"use strict";
// TODO create dummy data to test the cust parameter of main function

// TODO getting inputs from DOM

// TODO correctly formatting dates to pass into all Date functions?
// works with a string formatted "MM/DD/YYYY"
// need to validate that all inputs passed from forms match that input

// FAKE DATA
const dummyData = {
  "KeHE - Chino": 3,
  Wegmans: 4,
  "UNFI - Dayville": 1,
};

// DOM
const screen = document.querySelector("#screen");
const selectConsignee = document.querySelector("#select-consignee");
const consignees = ["KeHE - Chino", "Wegmans", "UNFI - Dayville"];
const btnSubmit = document.querySelector("#submit");

for (const consignee of consignees) {
  let option = document.createElement("option");
  option.innerText = consignee;
  option.value = consignee;
  selectConsignee.appendChild(option);
}

// will need to link this to the main function at some point
// long term, this will go on the main script while the functionality
// that handles calculating ship date will become a module
btnSubmit.addEventListener("click", () => {
  const selection = selectConsignee.value;
  const transitTime = dummyData[selection];
  console.log(selection);
  console.log(`Transit time for this customer: ${transitTime}`);
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

function findBestShipDate(cust, due) {
  const transitTime = 7;
  const dueDate = new Date(due);
  let bestShipDate = new Date(due);
  let daysInTransit = 0;
  let weekendDays = 0;
  let dayToCheck = new Date(due);
  while (daysInTransit < transitTime) {
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
}

findBestShipDate("Chino", "10/28/2022");
