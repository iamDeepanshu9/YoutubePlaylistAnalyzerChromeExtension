document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("fetchInfo").addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          function: fetchPlaylistInfo,
        },
        (results) => {
          // Callback to handle results
          console.log(results);
        }
      );
    });
  });
});

function fetchPlaylistInfo() {
  const playlistId = new URLSearchParams(window.location.search).get("list");
  if (!playlistId) {
    alert("Not a YouTube playlist page.");
    return;
  }
  // Rest of your function...
  const API_KEY = "AIzaSyBrBmopoJcUydke4eJ3Fvxa1LvnUzhSA7w";
  const apiUrl = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id=${playlistId}&key=${API_KEY}`;
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log('data',data.items);
      const info = data.items[0];
      const details = `Title: ${info.snippet.title}, Videos: ${info.contentDetails.itemCount}`;
      const publishDate = `Publish Date: ${new Date(info.snippet.publishedAt).toLocaleString().split(',')[0]}`
      const channelName =`Channel : ${info.snippet.channelTitle}`
      console.log(details);
      chrome.runtime.sendMessage({ info: details, publishDate, channelName });
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  document.getElementById("info").textContent = request.info;
  document.getElementById("publishDate").textContent = request.publishDate;  
  document.getElementById("channelName").textContent = request.channelName;
});
