"use strict";

function updateToggleText(hideFeed) {
  const toggleElement = document.getElementById("toggOnOff");
  toggleElement.innerHTML = hideFeed
    ? "Display Following <strong>On</strong>"
    : "Display Following <strong>Off</strong>";
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

  // Dynamisches Update der Zeit
  const today = new Date().toISOString().split("T")[0]; // Hol das heutige Datum im Format YYYY-MM-DD

  function updateTodayTime() {
    chrome.storage.local.get(["wastedTime"], (res) => {
      const wastedTime = res.wastedTime || {};
      const todayTime = wastedTime[today] || "00:00:00"; // Fallback-Wert, wenn nichts für heute vorhanden ist
      document.getElementById(
        "goToFAQ"
      ).innerHTML = `Time spent today: ${todayTime}`;
    });
  }

  // Update alle 1 Sekunde
  updateTodayTime(); // Initialer Aufruf
  setInterval(updateTodayTime, 1000);
});

document.getElementById("goToFAQ").addEventListener("click", function () {
  chrome.tabs.create({ url: chrome.runtime.getURL("/pages/timetable.html") });
});
