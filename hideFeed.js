// Function to hide specific elements on X.com (feed, trends, premium, live on X)
const hideXElements = () => {
  const path = window.location.pathname;

  // Only hide if the user is on the Home Feed
  if (path === "/home") {
    // Hide the "Subscribe to Premium" section
    const premium = document.querySelector(
      '[aria-label="Subscribe to Premium"], div[aria-labelledby*="Subscribe"]'
    );
    if (premium) {
      premium.style.display = "none";
    }

    // Feed blocking for following content
    const feedElement = document.querySelector(
      '[aria-label="Timeline: Your Home Timeline"]'
    );

    if (feedElement) {
      feedElement.style.visibility = "hidden";
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
        firstTab.style.display = "none";
        const thirdTab = allTabs[2];
        thirdTab.style.display = "none";
      } else {
        console.error("Es wurden nicht genügend Tabs gefunden.");
      }
    } else {
      console.error('Kein Element mit role="tablist" gefunden.');
    }

    // Hide the "Live on X" section
    const liveOnX = document.querySelector(
      'section[aria-labelledby*="Live"], div[aria-label="Live"]'
    );
    if (liveOnX) {
      liveOnX.style.display = "none";
    }

    // Hide the "Trends for you" section
    const trends = document.querySelector(
      'section[aria-labelledby*="Trends"], div[data-testid="sidebarColumn"]'
    );
    if (trends) {
      trends.style.display = "none";
    }

    console.log("Elements on /home page hidden");
  } else {
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
  }
};

// Run the function to hide elements on page load
hideXElements();

// Observe the page for any changes and hide elements dynamically
const observer = new MutationObserver(hideXElements);
observer.observe(document.body, { childList: true, subtree: true });

/* Responsible for Chrome Storage and Toggle Update */

// Observer zur Beobachtung von DOM-Änderungen einrichten
function observeDOMForRecommendations(callback) {
  const observer = new MutationObserver(callback);
  observer.observe(document.body, { childList: true, subtree: true });
}

// Funktion, um das Element zu verstecken oder anzuzeigen
function toggleFeed(hideFeed) {
  // Feed blocking for following content
  const feedElement = document.querySelector(
    '[aria-label="Timeline: Your Home Timeline"]'
  );

  // Überprüfe, ob das Element existiert und ob die aktuelle Seite die Abonnementseite ist
  if (feedElement && window.location.pathname === "/home") {
    // Der Feed wird NUR angezeigt, wenn hideFeed TRUE ist, ansonsten ausgeblendet
    feedElement.style.visibility = hideFeed ? "visible" : "hidden";
  }
}

// Funktion zur Initialisierung des MutationObservers für das Feed-Element
function observeDOMForFeed() {
  const observer = new MutationObserver((mutations) => {
    chrome.storage.local.get(["hideFeed"], (res) => {
      const hideFeed = res.hideFeed ?? false; // Fallback zu false, wenn nicht gesetzt
      toggleFeed(hideFeed); // Überprüfe, ob der Feed angezeigt werden soll
    });
  });

  // Beobachte Änderungen an der Seite (dynamische Inhalte)
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Initialen Wert aus dem Storage abrufen und den Feed sofort anpassen
chrome.storage.local.get(["hideFeed"], (res) => {
  const hideFeed = res.hideFeed ?? false;
  toggleFeed(hideFeed); // Feed initial anzeigen/ausblenden
  observeDOMForFeed(); // Beobachte Änderungen am Feed-Element
});

// Echtzeit-Überwachung von Änderungen im Storage
chrome.storage.onChanged.addListener((changes) => {
  if (changes.hideFeed) {
    toggleFeed(changes.hideFeed.newValue); // Ändert den Feed, wenn der Wert sich ändert
  }
});
