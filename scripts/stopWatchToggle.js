function stopWatchToggle() {
  /* Responsible for Chrome Storage and Toggle Update */
  let stopwatchInterval;
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let isStopwatchRunning = false;

  function updateStopwatch() {
    seconds++;
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }

    // Zeit in der Konsole ausgeben
    const timeString = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    console.log(timeString);

    // Zeit im Chrome-Storage speichern
    storeWastedTime();
  }

  function timeStringToSeconds(timeString) {
    const [h, m, s] = timeString.split(":").map(Number);
    return h * 3600 + m * 60 + s;
  }

  function secondsToTimeString(totalSeconds) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(
      2,
      "0"
    )}:${String(s).padStart(2, "0")}`;
  }

  let lastLoggedSeconds = 0; // Speichert die letzte geloggte Zeit (für Differenzen)

  function storeWastedTime() {
    const today = new Date().toISOString().split("T")[0]; // Nur das Datum (YYYY-MM-DD)
    const currentTimeInSeconds = hours * 3600 + minutes * 60 + seconds;

    // Differenz zur letzten Speicherung berechnen
    const deltaTimeInSeconds = currentTimeInSeconds - lastLoggedSeconds;

    // Bestehende Daten abrufen und aktualisieren
    chrome.storage.local.get(["wastedTime"], (res) => {
      const wastedTime = res.wastedTime || {};
      const previousTime = wastedTime[today]
        ? timeStringToSeconds(wastedTime[today])
        : 0;

      // Addiere nur die neue Zeitdifferenz
      const newTimeInSeconds = previousTime + deltaTimeInSeconds;
      wastedTime[today] = secondsToTimeString(newTimeInSeconds);

      // Speichern und `lastLoggedSeconds` aktualisieren
      chrome.storage.local.set({ wastedTime }, () => {
        console.log("Aktualisierte wastedTime:", wastedTime);
        lastLoggedSeconds = currentTimeInSeconds; // Aktualisiere die letzte geloggte Zeit
      });
    });
  }

  function toggleFeed(hideFeed) {
    if (!hideFeed && window.location.pathname.match(/\/status\/\d+/)) {
      window.location.href = "https://x.com/home";
    }
    const path = window.location.pathname;
    const isHomePage = window.location.pathname === "/home";
    const isStatusPage = window.location.pathname.match(/\/status\/\d+/);
    const isUserOverview = /^\/[^/]+$/.test(path);

    if (isHomePage) {
      const feedElement = document.querySelector(
        '[aria-label="Timeline: Your Home Timeline"]'
      );

      if (feedElement) {
        feedElement.style.visibility = hideFeed ? "visible" : "hidden";
      }
    }

    handleStopwatch(hideFeed, isHomePage || isStatusPage || isUserOverview);
  }

  function handleStopwatch(hideFeed, isRelevantPage) {
    if (isRelevantPage) {
      if (hideFeed) {
        stopStopwatch();
        startStopwatch();
      } else {
        stopStopwatch();
      }
    } else {
      stopStopwatch(); // Ensure the stopwatch is stopped when conditions are not met
    }
  }

  function stopStopwatch() {
    if (isStopwatchRunning) {
      clearInterval(stopwatchInterval);
      isStopwatchRunning = false;

      // Letztes Update, bevor die Stoppuhr gestoppt wird
      storeWastedTime();
      console.log("Stopwatch gestoppt");
    }
  }

  function startStopwatch() {
    if (!isStopwatchRunning) {
      isStopwatchRunning = true;
      stopwatchInterval = setInterval(updateStopwatch, 1000);
      console.log("Stopwatch gestartet");
    }
  }

  // Funktion zur Initialisierung des MutationObservers für das Feed-Element
  function observeDOMForFeed() {
    const observer = new MutationObserver(() => {
      chrome.storage.local.get(["hideFeed"], (res) => {
        const hideFeed = res.hideFeed ?? false;
        toggleFeed(hideFeed);
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Initialen Wert aus dem Storage abrufen und den Feed sofort anpassen
  chrome.storage.local.get(["hideFeed"], (res) => {
    const hideFeed = res.hideFeed ?? false;
    toggleFeed(hideFeed);
    observeDOMForFeed();
  });

  // Echtzeit-Überwachung von Änderungen im Storage
  chrome.storage.onChanged.addListener((changes) => {
    if (changes.hideFeed) {
      toggleFeed(changes.hideFeed.newValue);
    }
  });
}
