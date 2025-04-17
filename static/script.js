let sessionId = null;

function showMessage(msg, isError = false, persist = false) {
  const messageBox = document.getElementById("message-box");
  messageBox.style.color = isError ? "#ff4d4d" : "#00ffcc";
  messageBox.textContent = msg;
  if (!persist) {
    setTimeout(() => messageBox.textContent = "", 4000);
  }
}

document.getElementById("pdf-upload").addEventListener("change", function () {
  const file = this.files[0];
  const displayName = document.getElementById("selected-file-name");
  if (file) {
    displayName.textContent = `Selected: ${file.name}`;
  } else {
    displayName.textContent = "";
  }
});

function uploadPDF() {
  const file = document.getElementById("pdf-upload").files[0];
  if (!file) {
    showMessage("Please select a PDF file first.", true);
    return;
  }

  const formData = new FormData();
  formData.append("pdf", file);

  showMessage("Uploading PDF... please wait.", false, true);

  fetch("/upload", {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      if (data.session_id) {
        sessionId = data.session_id;
        document.getElementById("chat-section").style.display = "block";
        showMessage("PDF uploaded! You can now start chatting.");
      } else {
        showMessage(data.error || "Upload failed.", true);
      }
    })
    .catch(err => {
      console.error(err);
      showMessage("An error occurred during upload.", true);
    });
}

function sendQuestion() {
  const input = document.getElementById("question");
  const question = input.value.trim();
  if (!question) return;

  const formData = new FormData();
  formData.append("session_id", sessionId);
  formData.append("question", question);

  addMessage(question, "user");
  input.value = "";

  fetch("/query", {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      addMessage(data.answer, "bot", true);  // render markdown
    })
    .catch(err => {
      console.error(err);
      addMessage("Error fetching response from server.", "bot");
    });
}

function addMessage(message, sender, isMarkdown = false) {
  const chatBox = document.getElementById("chat-box");

  const messageRow = document.createElement("div");
  messageRow.classList.add("chat-message", sender === "user" ? "chat-user" : "chat-bot");

  const bubble = document.createElement("div");
  bubble.classList.add("chat-bubble");

  if (isMarkdown) {
    bubble.innerHTML = marked.parse(message || "");
  } else {
    bubble.textContent = message;
  }

  messageRow.appendChild(bubble);
  chatBox.appendChild(messageRow);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function clearSession() {
  fetch("/clear", { method: "POST",
    body: formData
  })
    .then(() => {
      sessionId = null;
      document.getElementById("chat-box").innerHTML = "";
      document.getElementById("chat-section").style.display = "none";
      showMessage("Session cleared.");
    })
    .catch(() => {
      showMessage("Failed to clear session.", true);
    });
}
