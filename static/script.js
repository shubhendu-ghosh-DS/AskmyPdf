let sessionId = null;

function showMessage(msg, isError = false, persist = false) {
  const messageBox = document.getElementById("message-box");
  messageBox.style.color = isError ? "#ff4d4d" : "#00ffcc";
  messageBox.textContent = msg;
  if (!persist) {
    setTimeout(() => messageBox.textContent = "", 4000);
  }
}

// Show selected file name
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

  fetch("/query/", {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      addMessage(data.answer, "bot", true);  // true to render as markdown/html
    })
    .catch(err => {
      console.error(err);
      addMessage("Sorry, I couldn't get a response.", "bot");
    });
}

function addMessage(msg, type, isMarkdown = false) {
  const chatBox = document.getElementById("chat-box");
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble chat-${type}`;
  if (isMarkdown) {
    bubble.innerHTML = marked.parse(msg);  // Render markdown as HTML
  } else {
    bubble.textContent = msg;
  }
  chatBox.appendChild(bubble);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function clearSession() {
  const formData = new FormData();
  formData.append("session_id", sessionId);

  fetch("/clear", {
    method: "POST",
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      showMessage(data.message);
      document.getElementById("chat-box").innerHTML = "";
      document.getElementById("question").value = "";
      document.getElementById("chat-section").style.display = "none";
    })
    .catch(err => {
      console.error(err);
      showMessage("Failed to clear session.", true);
    });
}
