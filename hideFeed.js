// Function to hide specific elements on X.com (feed, trends, premium, live on X)
const hideXElements = () => {
  const path = window.location.pathname;

  // Only hide if the user is on the Home Feed
  if (path === "/home") {
    // Hide the main feed
    const feed = document.querySelector(
      '[aria-label="Timeline: Your Home Timeline"], div[data-testid="primaryColumn"]'
    );
    if (feed) {
      feed.style.display = "none";
    }

    // Hide the "Subscribe to Premium" section
    const premium = document.querySelector(
      '[aria-label="Subscribe to Premium"], div[aria-labelledby*="Subscribe"]'
    );
    if (premium) {
      premium.style.display = "none";
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
