"use strict";

import { findBestShipDate } from "/bestShipDate.js";

// DOM
const inputConsignee = document.querySelector("#input-consignee");
const btnSubmit = document.querySelector("#submit-btn");
const elDueDate = document.querySelector("#due-date-picker");
const bestShipWrapper = document.querySelector(".best-ship-wrapper");
const testy = document.querySelector("#testy");

// FIXME probably shouldn't call this out the gate - makeRequest() should get called when needed, not as soon as script.js loads in the browser
let dummyJSON;
makeRequest({ method: "GET", url: "/get-consignees" }).then((res) => {
  dummyJSON = JSON.parse(res);
  autocomplete(
    document.getElementById("input-consignee"),
    dummyJSON.consignees
  );
});

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

// TODO
// extract click callback () and make it a named function to make this more readable
btnSubmit.addEventListener("click", () => {
  const selection = inputConsignee.value;
  const transitTime =
    dummyJSON.avgTransitTimes[dummyJSON.consignees.indexOf(selection)];
  const dueDate = document.querySelector("#due-date-picker").value;

  if (dummyJSON.consignees.includes(selection) && dueDate !== "") {
    console.log(`best ship date got called on btn click`);
    testy.innerText = findBestShipDate(transitTime, dueDate);
    bestShipWrapper.classList.toggle("hidden");
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

/**

 * this is the base request function creating a promise

 * to allow for ajax requests

 * @param {{method: "GET" | "POST" | "PUT" | "DELETE", url: string, headers: {}, params: {}}} opts

 * @returns

 */

function makeRequest(opts) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();

    xhr.open(opts.method, opts.url);

    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject({
          status: this.status,

          statusText: xhr.statusText,
        });
      }
    };

    xhr.onerror = function () {
      reject({
        status: this.status,

        statusText: xhr.statusText,
      });
    };

    if (opts.headers) {
      Object.keys(opts.headers).forEach(function (key) {
        xhr.setRequestHeader(key, opts.headers[key]);
      });
    }

    var params = opts.params;

    if (params && typeof params === "object") {
      params = Object.keys(params)
        .map(function (key) {
          return (
            encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
          );
        })
        .join("&");
    }

    xhr.send(params);
  });
}
