"use strict";

function updateToggleText(hideFeed) {
  const toggleElement = document.getElementById("toggOnOff");
  const switchElement = document.querySelector(".switch");
  toggleElement.innerHTML = hideFeed
    ? "Display Content <strong>On</strong>"
    : "Display Content <strong>Off</strong>";

  switchElement.title = hideFeed
    ? "View the content of the accounts you follow and bookmarks."
    : "Don't view any content.";
}

document.addEventListener("DOMContentLoaded", () => {
  const checkboxSubs = document.getElementById("checkbox-subs");

  // Initialen Wert aus dem Storage abrufen
  chrome.storage.local.get(["hideFeed"], (res) => {
    const hideFeed = res.hideFeed ?? false; // Setzt auf false, wenn nicht gesetzt
    checkboxSubs.checked = hideFeed;
    updateToggleText(hideFeed);
  });

  // Event Listener für Änderungen an der Checkbox
  checkboxSubs.addEventListener("change", () => {
    const isChecked = checkboxSubs.checked;
    chrome.storage.local.set({ hideFeed: isChecked }); // Speichern in Storage
    updateToggleText(isChecked); // Aktualisiere den Text sofort
  });

  // "Block everything" master toggle (issue #6): when on, hides ALL feed
  // content everywhere, on top of the granular hideFeed behaviour.
  const checkboxBlockAll = document.getElementById("checkbox-blockall");
  function updateBlockAllText(blockAll) {
    document.getElementById("blockAllOnOff").innerHTML = blockAll
      ? "Block Everything <strong>On</strong>"
      : "Block Everything <strong>Off</strong>";
  }
  chrome.storage.local.get(["blockAll"], (res) => {
    const blockAll = res.blockAll ?? false;
    checkboxBlockAll.checked = blockAll;
    updateBlockAllText(blockAll);
  });
  checkboxBlockAll.addEventListener("change", () => {
    const isChecked = checkboxBlockAll.checked;
    chrome.storage.local.set({ blockAll: isChecked });
    updateBlockAllText(isChecked);
  });

  // Dynamisches Update der Zeit
  const today = new Date().toISOString().split("T")[0]; // Hol das heutige Datum im Format YYYY-MM-DD

  function updateTodayTime() {
    chrome.storage.local.get(["wastedTime"], (res) => {
      const wastedTime = res.wastedTime || {};
      const todayTime = wastedTime[today] || "No time spent today"; // Fallback-Wert, wenn nichts für heute vorhanden ist
      if (todayTime == "No time spent today") {
        document.getElementById("timeConsumption").innerHTML = `${todayTime}`;
      } else {
        document.getElementById(
          "timeConsumption"
        ).innerHTML = `Time spent today: ${todayTime}`;
      }
    });
  }

  // Update alle 1 Sekunde
  updateTodayTime(); // Initialer Aufruf
  setInterval(updateTodayTime, 1000);
});

document
  .getElementById("timeConsumption")
  .addEventListener("click", function () {
    chrome.tabs.create({ url: chrome.runtime.getURL("/pages/timetable.html") });
  });

document.getElementById("goToFAQ").addEventListener("click", function () {
  chrome.tabs.create({ url: chrome.runtime.getURL("/pages/FAQ.html") });
});
