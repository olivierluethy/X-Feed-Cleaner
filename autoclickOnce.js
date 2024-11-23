// Function to auto-click the second div once
function autoClickOnce() {
  // Check if the element has already been clicked
  chrome.storage.local.get(["hasClicked"], function (result) {
    if (result.hasClicked) {
      console.log("The second div has already been clicked.");
      return; // Exit if it has already been clicked
    }

    // Select the parent div with role="tablist" and data-testid="ScrollSnap-List"
    const tablist = document.querySelector(
      'div[role="tablist"][data-testid="ScrollSnap-List"]'
    );

    if (tablist) {
      // Select all the child div elements within the tablist
      const divs = tablist.querySelectorAll("div");

      // Check if there is a second div and click it
      if (divs.length > 1) {
        const secondDiv = divs[1]; // Get the second div (index 1)
        secondDiv.click(); // Simulate a click on the second div
        console.log("Second div clicked!");

        // Store the click state in Chrome storage
        chrome.storage.local.set({ hasClicked: true }, function () {
          console.log("Click state saved to storage.");
        });
      } else {
        console.log("Less than two divs found inside the tablist.");
      }
    } else {
      console.log("Tablist not found.");
    }
  });
}
