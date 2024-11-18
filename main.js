// Function to hide specific elements on X.com (feed, trends, premium, live on X)
const hideXElements = () => {
  const path = window.location.pathname;

  cheatBlocker();

  // Start - Remove stuff from navigation
  const grok = document.querySelector('a[href="/i/grok"][aria-label="Grok"][role="link"]');
  if(grok){
    grok.style.display="none";
  }
  const premium = document.querySelector('a[href="/i/premium_sign_up"][aria-label="Premium"][role="link"]');
  if(premium){
    premium.style.display="none";
  }
  const verifiedOrgs = document.querySelector('a[href="/i/verified-orgs-signup"][aria-label="Verified Orgs"][role="link"]');
  if(verifiedOrgs){
    verifiedOrgs.style.display="none";
  }
  const notifications = document.querySelector('a[href="/notifications"][aria-label="Notifications"][role="link"]');
  if(notifications){
    notifications.style.display="none";
  }

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