// Always in use; That's why on top
const path = window.location.pathname;

// Function to hide specific elements on X.com (feed, trends, premium, live on X)
const hideXElements = () => {
  // Call the function
  updateTitleAndFavicon();

  // Start - Remove stuff from navigation
  const blueDot = document.querySelector(
    "div[aria-label='undefined unread items']"
  );
  if (blueDot) {
    blueDot.style.display = "none";
  }
  const grok = document.querySelector(
    'a[href="/i/grok"][aria-label="Grok"][role="link"]'
  );
  if (grok) {
    grok.style.display = "none";
  }
  const premium = document.querySelector(
    'a[href="/i/premium_sign_up"][aria-label="Premium"][role="link"]'
  );
  if (premium) {
    premium.style.display = "none";
  }
  const verifiedOrgs = document.querySelector(
    'a[href="/i/verified-orgs-signup"][aria-label="Verified Orgs"][role="link"]'
  );
  if (verifiedOrgs) {
    verifiedOrgs.style.display = "none";
  }
  const notifications = document.querySelector(
    'a[href="/notifications"][aria-label="Notifications"][role="link"]'
  );
  if (notifications) {
    notifications.style.display = "none";
  }
  // Only hide if the user is on the Home Feed
  if (path === "/home") {
    // Jump to "following" page
    autoClickOnce();

    // Hide the "Subscribe to Premium" section
    const premium = document.querySelector(
      '[aria-label="Subscribe to Premium"], div[aria-labelledby*="Subscribe"]'
    );
    if (premium) {
      premium.style.display = "none";
    }

    const removeNotifyButton = document.querySelector(
      `[aria-label="New posts are available. Push the period key to go to the them."]`
    );
    if (removeNotifyButton) {
      removeNotifyButton.style.display = "none";
    }

    // ScrollSnap-next Button Wrapper Right
    const rightNext = document.querySelector(
      '[data-testid="ScrollSnap-nextButtonWrapper"'
    );
    if (rightNext) {
      rightNext.style.display = "none";
    }

    // ScrollSnap-next Button Wrapper Left
    const leftNext = document.querySelector(
      '[data-testid="ScrollSnap-prevButtonWrapper"'
    );
    if (leftNext) {
      leftNext.style.display = "none";
    }

    // Finde das Div mit der Rolle "tablist"
    const tabList = document.querySelector('[role="tablist"]');

    // Überprüfe, ob das Element gefunden wurde
    if (tabList) {
      // Finde alle Kind-Elemente mit der Rolle "presentation"
      const allTabs = tabList.querySelectorAll('[role="presentation"]');

      // Überprüfe, ob mindestens zwei Tabs gefunden wurden
      if (allTabs.length >= 2) {
        // Wähle den zweiten Tab aus (Index 1, da Arrays bei 0 beginnen)
        const firstTab = allTabs[0];
        if (firstTab) {
          firstTab.style.display = "none";
        }
        const thirdTab = allTabs[2];
        if (thirdTab) {
          thirdTab.style.display = "none";
        }
      } else {
        console.error("Es wurden nicht genügend Tabs gefunden.");
      }
    } else {
      console.error('Kein Element mit role="tablist" gefunden.');
    }
  }
  // Only hide if the user is on the Explore Page
  if (path === "/explore") {
    const tabList = document.querySelector(
      'div[role="tablist"][data-testid="ScrollSnap-List"]'
    );
    if (tabList) {
      tabList.style.display = "none";
    }

    const feed = document.querySelector('div[aria-label="Timeline: Explore"]');
    if (feed) {
      feed.style.display = "none";
    }
  }
  // If you follow a community
  if (/^\/[^/]+\/communities\/?$/.test(path)) {
    const tabList = document.querySelector(
      'div[role="tablist"][data-testid="ScrollSnap-List"]'
    );
    if (tabList) {
      tabList.style.display = "none";
    }
  }
  // If someone jumps to a post, redirect to normal page
  if (window.location.pathname.match(/\/status\/\d+/)) {
    chrome.storage.local.get(["hideFeed"], (res) => {
      const hideFeed = res.hideFeed ?? false;
      if (!hideFeed) {
        window.location.href = "https://x.com/home";
      }
    });
  }
  // Remove community suggestion including their representing content
  if (window.location.href.includes("x.com/i/communities/suggested")) {
    function hideElements() {
      // Find the main div with aria-label="Home timeline"
      const homeTimelineDiv = document.querySelector(
        '[aria-label="Home timeline"]'
      );

      if (homeTimelineDiv) {
        // Hide the 3rd div
        const thirdDiv = homeTimelineDiv.children[2];
        if (thirdDiv) {
          thirdDiv.style.display = "none";
        }

        // Hide the 4th div
        const fourthDiv = homeTimelineDiv.children[3];
        if (fourthDiv) {
          fourthDiv.style.display = "none";
        }

        // Hide the section element
        const sectionElement = homeTimelineDiv.querySelector("section");
        if (sectionElement) {
          sectionElement.style.display = "none";
        }
      } else {
        console.log("Home timeline div not found.");
      }
    }

    // Wait for the DOM to be fully loaded
    document.addEventListener("DOMContentLoaded", hideElements);

    // Use a MutationObserver to handle dynamically loaded content
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          hideElements(); // Re-run the hiding logic
        }
      }
    });

    // Observe the document for changes
    observer.observe(document.body, { childList: true, subtree: true });
  }
  // Display community suggestions while you're searching for one
  if (window.location.href.includes("x.com/i/communities/suggested?q=")) {
    function hideElements() {
      // Find the main div with aria-label="Home timeline"
      const homeTimelineDiv = document.querySelector(
        '[aria-label="Home timeline"]'
      );

      if (homeTimelineDiv) {
        // Hide the 3rd div
        const thirdDiv = homeTimelineDiv.children[2];
        if (thirdDiv) {
          thirdDiv.style.display = "block";
        }

        // Hide the 4th div
        const fourthDiv = homeTimelineDiv.children[3];
        if (fourthDiv) {
          fourthDiv.style.display = "block";
        }

        // Hide the section element
        const sectionElement = homeTimelineDiv.querySelector("section");
        if (sectionElement) {
          sectionElement.style.display = "block";
        }

        const tablist = document.querySelector("[role='tablist']");
        if (tablist) {
          tablist.style.display = "none";
        }
      } else {
        console.log("Home timeline div not found.");
      }
    }

    // Wait for the DOM to be fully loaded
    document.addEventListener("DOMContentLoaded", hideElements);

    // Use a MutationObserver to handle dynamically loaded content
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          hideElements(); // Re-run the hiding logic
        }
      }
    });

    // Observe the document for changes
    observer.observe(document.body, { childList: true, subtree: true });
  }
  // Check if the path matches the pattern
  if (/^\/[^/]+\/communities\/explore/.test(path)) {
    console.log("Your exploring the communities!");
    const tablist = document.querySelector(
      'div[role="tablist"][data-testid="ScrollSnap-List"'
    );
    if (tablist) {
      tablist.style.display = "none";
    }

    // If you don't follow any community
    const homeTimeline = document.querySelector(
      'div[aria-label="Home timeline"]'
    );

    if (homeTimeline) {
      const thirdDiv = homeTimeline.children[2]; // Access the third child element

      // Now you can manipulate the third div as needed:
      thirdDiv.style.display = "none";
      // https://www.loom.com/share/bc6cef219ef641d9b6a80726e7775ef6?sid=004d8f79-4fdb-4474-893c-25436ebacf37
    } else {
      console.log("Home timeline div not found.");
    }

    const section = document.querySelector('section[role="region"]');
    if (section) {
      section.style.display = "none";
    }
  }
  // If user jumps to user account content overview
  if (/^\/[^/]+$/.test(path)) {
    chrome.storage.local.get(["hideFeed"], (res) => {
      const hideFeed = res.hideFeed ?? false;

      // Check if the current page is not one of the excluded pages
      // TODO: Hier entsteht noch der Fehler, dass wenn ein Benutzer auf den Tabs klickt und den Toggle ausgeschaltet hat, dann kommt er nicht mal mehr zu seinen Messages. Das Problem ist noch offen.
      const currentUrl = window.location.href;
      if (
        !hideFeed &&
        !currentUrl.includes("x.com/home") &&
        !currentUrl.includes("x.com/explore") &&
        !currentUrl.includes("x.com/i")
      ) {
        window.location.href = "https://x.com/home";
      }
    });
  }
  // Hide the "Live on X" section
  const liveOnX = document.querySelector(
    'section[aria-labelledby*="Live"], div[aria-label="Live"]'
  );
  if (liveOnX) {
    liveOnX.style.display = "none";
    console.log("Live on X section hidden outside of /home");
  } else {
    console.log("Live on X section not found outside of /home");
  }

  // Hide the "Trends for you" section
  const trends = document.querySelector(
    'section[aria-labelledby*="Trends"], div[data-testid="sidebarColumn"]'
  );
  if (trends) {
    trends.style.display = "none";
    console.log("Trends section hidden outside of /home");
  } else {
    console.log("Trends section not found outside of /home");
  }
};

// Run the function to hide elements on page load
hideXElements();

// Observe the page for any changes and hide elements dynamically
const observer = new MutationObserver(hideXElements);
observer.observe(document.body, { childList: true, subtree: true });

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
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(
    s
  ).padStart(2, "0")}`;
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
  const isHomePage = window.location.pathname === "/home";
  const isStatusPage = window.location.pathname.match(/\/status\/\d+/);
  const isUserOverview =  /^\/[^/]+$/.test(path);

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
