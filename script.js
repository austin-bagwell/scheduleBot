"use strict";

import { findBestShipDate } from "./modules/bestShipDate.js";

// DOM
const selectConsignee = document.querySelector("#select-consignee");
const btnSubmit = document.querySelector("#submit");
const elDueDate = document.querySelector("#due-date-picker");
const testy = document.querySelector("#testy");

// FAKE CONSIGNEE DATA
const dummyJSON = {
  consignees: [
    "Kroger",
    "KeHE - Chino",
    "Wegmans",
    "UNFI - Dayville",
    "UNFI - Moreno Valley",
  ],
  avgTransitTimes: [3, 2, 3, 1, 7],
  shipFrom: ["DUR", "SF", "DUR", "DUR", "SF"],
};

for (const consignee of dummyJSON.consignees) {
  const option = document.createElement("option");
  option.innerText = consignee;
  option.value = consignee;
  selectConsignee.appendChild(option);
}

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
