let sessionId = null;

function uploadPDF() {
  const file = document.getElementById("pdf-upload").files[0];
  const formData = new FormData();
  formData.append("pdf", file);

  fetch("/upload", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.session_id) {
      sessionId = data.session_id;
      document.getElementById("chat-section").style.display = "block";
      alert("PDF Uploaded! Session valid for 15 mins.");
    } else {
      alert(data.error || "Upload failed.");
    }
  })
  .catch(err => {
    console.error(err);
    alert("Upload failed!");
  });
}

function sendQuestion() {
  const question = document.getElementById("question").value;
  const formData = new FormData();
  formData.append("session_id", sessionId);
  formData.append("question", question);

  fetch("/query", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("chat-box").innerHTML += `<p><b>You:</b> ${question}</p>`;
    document.getElementById("chat-box").innerHTML += `<p><b>Bot:</b> ${data.answer}</p>`;
  })
  .catch(err => {
    console.error(err);
    alert("Error fetching response.");
  });
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
    alert(data.message);
    location.reload();
  })
  .catch(err => {
    console.error(err);
    alert("Failed to clear session.");
  });
}
