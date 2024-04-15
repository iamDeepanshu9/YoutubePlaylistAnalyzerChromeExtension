chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message === "getPlaylistDuration") {
      const duration = calculatePlaylistDuration();
      chrome.runtime.sendMessage({ message: "playlistDurationResult", result: duration });
    }
  });
  
  function calculatePlaylistDuration() {
    // Implement logic to fetch and calculate playlist duration using the YouTube API
    // Return the total duration as a formatted string (e.g., "1 hour 30 minutes")
    return "3 hours 45 minutes";
  }
  