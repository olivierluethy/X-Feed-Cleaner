// Function to start tracking time
function startTrackingTime() {
  let startTime = Date.now();
  let timer;

  // Function to log the time spent
  function logTimeSpent() {
    const timeSpent = Date.now() - startTime; // Calculate time spent in milliseconds
    const minutesSpent = Math.floor(timeSpent / 1000 / 60); // Convert to minutes

    // Get today's date in the desired format
    const today = new Date();
    const options = { day: "numeric", month: "long", year: "numeric" };
    const formattedDate = today.toLocaleDateString("en-US", options);

    // Create a distraction record
    const distractionRecord = {
      date: formattedDate,
      timeSpent: `${minutesSpent} minutes`,
    };

    // Save the record to Chrome Storage
    chrome.storage.sync.get("distractionLogs", function (data) {
      const logs = data.distractionLogs || []; // Get existing logs or initialize an empty array
      logs.push(distractionRecord); // Add the new record
      chrome.storage.sync.set({ distractionLogs: logs }, function () {
        console.log("Distraction time saved:", distractionRecord);
      });
    });
  }

  // Set up an event listener to track when the user leaves the page
  window.addEventListener("beforeunload", logTimeSpent);

  // Optional: You can also set a timer to log time every minute or at intervals
  timer = setInterval(() => {
    console.log(
      `User  has been distracted for ${(Date.now() - startTime) / 1000} seconds`
    );
  }, 60000); // Log every minute

  // Clean up when the user leaves the page
  window.addEventListener("unload", () => {
    clearInterval(timer);
    logTimeSpent();
  });
}
