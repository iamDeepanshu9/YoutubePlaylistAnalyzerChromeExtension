chrome.runtime.onInstalled.addListener(function () {
    console.log("YouTube Playlist Duration installed!");
  });
  
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "analyzePlaylist") {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: "getPlaylistDuration" });
      });
    }
  });
  