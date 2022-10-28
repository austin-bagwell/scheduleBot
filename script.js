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
const elDueDate = document.querySelector("#due-date");

function minDateTomorrow() {
  const today = new Date();
  let dd = today.getDate() + 1;
  dd.toString().padStart(2, "0");
  let mm = today.getMonth() + 1;
  mm = mm.toString().padStart(2, "0");
  const yyyy = today.getFullYear().toString();
  const date = [yyyy, mm, dd].join("-");
  return date;
}

elDueDate.setAttribute("min", minDateTomorrow());
elDueDate.addEventListener("change", function (e) {
  const day = new Date(this.value).getUTCDay();
  if ([0, 6].includes(day)) {
    alert("Deliveries are not made on weekends. Please pick a different date.");
    elDueDate.value = "";
  }
});

const testy = document.querySelector("#testy");

for (const consignee of dummyJSON.consignees) {
  const option = document.createElement("option");
  option.innerText = consignee;
  option.value = consignee;
  selectConsignee.appendChild(option);
}

btnSubmit.addEventListener("click", () => {
  const selection = selectConsignee.value;
  const transitTime =
    dummyJSON.avgTransitTimes[dummyJSON.consignees.indexOf(selection)];
  const dueDate = document.querySelector("#due-date").value;
  // console.log(`Due Date val on submit click: ${dueDate}`);
  //   console.log(`Consignee: ${selection}`);
  //   console.log(`Transit time for this customer: ${transitTime}`);
  //   console.log(`Due date from event listener: ${dueDate}`);

  //   add if (duedate === isWeekday())
  if (dummyJSON.consignees.includes(selection) && dueDate !== "") {
    testy.innerText = findBestShipDate(transitTime, dueDate);
  } else {
    alert("Select a consignee from the dropdown menu and select a due date.");
  }
});

//
// HELPER FUNCTIONS
//

Date.prototype.subtractDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getUTCDate() - days);
  return date;
};

// should return and alert if due date is set to a weekend - assuming that no on will accept deliveries on a weekend, but that is pretty standard so a safe assumption for my usecase
function isWeekday() {}

//
//
// MAIN FUNCTION
//
//

function findBestShipDate(transit, due) {
  const transitTime = transit;
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

  //   FIXME
  // bestShipDate getting converted to something that .getMonth() can't use after the if else block
  //   seems to fire when original ship date would be a weekend day
  //   Best Ship date value after ifel: 1667015999999
  const calendarDays = daysInTransit + weekendDays;
  bestShipDate = bestShipDate.subtractDays(calendarDays);

  console.log(`bestShipDate prior to ifel: ${bestShipDate}`);
  //   something is doing weird stuff here
  if (bestShipDate.getDay() === 0) {
    bestShipDate -= 2;
  } else if (bestShipDate.getDay() === 6) {
    bestShipDate -= 1;
  }

  console.log(`Best Ship date value after ifel: ${bestShipDate}`);
  console.log(`Order is due: ${dueDate.getMonth() + 1}/${dueDate.getDate()}`);
  console.log(
    `Best day to ship: ${bestShipDate.getMonth() + 1}/${bestShipDate.getDate()}`
  );

  const message = `Best day to ship: ${
    bestShipDate.getMonth() + 1
  }/${bestShipDate.getDate()}`;
  return message;
}
