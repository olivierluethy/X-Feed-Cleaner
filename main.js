const intervalId = setInterval(() => {
  // Always in use; That's why on top
  const path = window.location.pathname;
  // Call the function
  updateTitleAndFavicon();
  startUp();

  // Only hide if the user is on the Home Feed
  if (path === "/home") {
    // Jump to "following" page
    autoClickOnce();
    homePart();
  }
  // Only hide if the user is on the Explore Page
  if (path === "/explore") {
    const tabList = document.querySelector(
      'div[role="tablist"][data-testid="ScrollSnap-List"]'
    );
    if (tabList) {
      tabList.style.visibility = "hidden";
    }

    const feed = document.querySelector('div[aria-label="Timeline: Explore"]');
    if (feed) {
      feed.style.visibility = "hidden";
    }
  }
  // Check if the path matches the pattern
  if (/^\/[^/]+\/communities\/explore/.test(path)) {
    console.log("community explorating");
    communitiesExplore();
  }
  // If you follow a community
  if (/^\/[^/]+\/communities\/?$/.test(path)) {
    console.log("This is a community");
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
    console.log("community Suggestions");
    communitySuggestions();
  }
  // Display community suggestions while you're searching for one
  if (window.location.href.includes("x.com/i/communities/suggested?q=")) {
    console.log("community Suggestions while search");
    communitiesSuggestedMore();
  }
  sideBlock();
}, 1000); // Check every 1 second

stopWatchToggle();
