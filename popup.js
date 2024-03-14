document.getElementById("add").addEventListener("click", () => {
  const website = document.getElementById("website").value;
  const pin = document.getElementById("pin").value;

  if (website && pin) {
    chrome.storage.sync.get("lockedWebsites", (data) => {
      const lockedWebsites = data.lockedWebsites || {};
      lockedWebsites[website] = pin;
      chrome.storage.sync.set({ lockedWebsites }, () => {
        alert(`${website} has been locked with PIN ${pin}`);
      });
    });
  } else {
    alert("Please enter a website URL and PIN");
  }
});