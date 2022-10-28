"use strict";

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

// FAKE CONSIGNEE DATA
const dummyJSON = {
  consignees: [
    "KeHE - Chino",
    "Wegmans",
    "UNFI - Dayville",
    "UNFI - Moreno Valley",
  ],
  avgTransitTimes: [2, 3, 1, 7],
};
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

  if (dummyJSON.consignees.includes(selection) && dueDate !== "") {
    testy.innerText = findBestShipDate(transitTime, dueDate);
  } else {
    alert(
      "Select a consignee from the dropdown menu and select a due date on a weekday."
    );
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

//
//
// MAIN FUNCTION
//
//

function findBestShipDate(timeInTransit, due) {
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
