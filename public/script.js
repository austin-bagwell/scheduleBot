"use strict";

import { findBestShipDate } from "/bestShipDate.js";
// const findBestShipDate = require("bestShipDate");

// DOM
const inputConsignee = document.querySelector("#input-consignee");
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

// for (const consignee of dummyJSON.consignees) {
//   const option = document.createElement("option");
//   option.innerText = consignee;
//   option.value = consignee;
//   inputConsignee.appendChild(option);
// }

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
  const selection = inputConsignee.value;
  const transitTime =
    dummyJSON.avgTransitTimes[dummyJSON.consignees.indexOf(selection)];
  const dueDate = document.querySelector("#due-date-picker").value;

  if (dummyJSON.consignees.includes(selection) && dueDate !== "") {
    testy.innerText = findBestShipDate(transitTime, dueDate);
  } else {
    alert(
      "Select a consignee from the dropdown menu and select a due date on a weekday."
    );
  }
});

// AUTOCOMPLETE SEARCHBAR
// https://www.w3schools.com/howto/howto_js_autocomplete.asp

function autocomplete(inp, arr) {
  var currentFocus;

  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;

    closeAllLists();

    if (!val) {
      return false;
    }
    currentFocus = -1;

    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");

    this.parentNode.appendChild(a);

    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);

        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

        b.addEventListener("click", function (e) {
          inp.value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (currentFocus > -1) {
        if (x) {
          x[currentFocus].click();
        }
      }
    }
  });

  function addActive(x) {
    if (!x) return false;

    removeActive(x);

    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;

    x[currentFocus].classList.add("autocomplete-active");
  }

  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }

  function closeAllLists(elmnt) {
    var x = document.getElementsByClassName("autocomplete-items");
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }

  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

autocomplete(document.getElementById("input-consignee"), dummyJSON.consignees);
