chrome.storage.sync.get("lockedWebsites", (data) => {
  const lockedWebsites = data.lockedWebsites || {};
  const currentURL = window.location.href;

  const lockedURL = Object.keys(lockedWebsites).find(url => currentURL.includes(url));

  if (lockedURL) {
    let isCorrectPin = false;
    let showPin = false;

    // Create a full-screen overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    overlay.style.zIndex = "9999";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.backdropFilter = "blur(15px)";

    // Create a prompt container
    const promptContainer = document.createElement("div");
    promptContainer.style.backgroundColor = "#fff";
    promptContainer.style.padding = "30px";
    promptContainer.style.borderRadius = "10px";
    promptContainer.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.3)";
    promptContainer.style.maxWidth = "400px";
    promptContainer.style.width = "100%";
    promptContainer.style.textAlign = "center";

    // Create a prompt message
    const promptMessage = document.createElement("h2");
    promptMessage.textContent = `Website Is Lock`;
    promptMessage.style.marginTop = "0";
    promptMessage.style.color = "#333";
    promptContainer.appendChild(promptMessage);

    const subMessage = document.createElement("p");
    subMessage.textContent = `Please enter the PIN to access`;
    subMessage.style.marginBottom = "20px";
    subMessage.style.color = "#666";
    promptContainer.appendChild(subMessage);

    // Create a PIN input field
    const pinInput = document.createElement("input");
    pinInput.type = "password";
    pinInput.style.width = "100%";
    pinInput.style.padding = "10px";
    pinInput.style.marginBottom = "20px";
    pinInput.style.border = "1px solid #ccc";
    pinInput.style.borderRadius = "5px";
    promptContainer.appendChild(pinInput);
    
    // Create a submit button
    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.style.backgroundColor = "#007bff";
    submitButton.style.color = "#fff";
    submitButton.style.border = "1rem solid";
    submitButton.style.borderRadius = "10px";
    submitButton.style.padding = "10px 20px";
    submitButton.style.cursor = "pointer";
    promptContainer.appendChild(submitButton);

    // Create a "Show/Hide PIN" button
    const showHideButton = document.createElement("button");
    showHideButton.textContent = "Show PIN";
    showHideButton.style.backgroundColor = "#007bff";
    showHideButton.style.color = "#fff";
    showHideButton.style.border = "1rem solid";
    showHideButton.style.borderRadius = "10px";
    showHideButton.style.cursor = "pointer";
    showHideButton.style.padding = "10px";
    promptContainer.appendChild(showHideButton);

    // Append the prompt container to the overlay
    overlay.appendChild(promptContainer);

    // Append the overlay to the document body
    document.body.appendChild(overlay);

    // Add event listener for "Show/Hide PIN" button
    showHideButton.addEventListener("click", () => {
      showPin = !showPin;
      pinInput.type = showPin ? "text" : "password";
      showHideButton.textContent = showPin ? "Hide PIN" : "Show PIN";
    });

    // Add event listener for submit button and "Enter" key
    submitButton.addEventListener("click", submitPin);
    pinInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        submitPin();
      }
    });

    function submitPin() {
      const enteredPin = pinInput.value;
      if (enteredPin === lockedWebsites[lockedURL]) {
        isCorrectPin = true;
        document.body.removeChild(overlay);
      } else {
        alert("Incorrect PIN");
        pinInput.value = "";
      }
    }
  }
});