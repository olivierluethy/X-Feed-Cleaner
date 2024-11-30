// https://chatgpt.com/share/674ae70c-f52c-8008-bec4-d3d04db875ac
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.tabs.create({ url: chrome.runtime.getURL("/pages/downloaded.html") });
  }
});
