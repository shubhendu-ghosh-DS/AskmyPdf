let sessionId = null;

function uploadPDF() {
  const file = document.getElementById("pdf-upload").files[0];
  const formData = new FormData();
  formData.append("pdf", file);

  fetch("https://shubhendu-ghosh-polydocs.hf.space/upload/", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    sessionId = data.session_id;
    document.getElementById("chat-section").style.display = "block";
    alert("PDF Uploaded! Session valid for 15 mins.");
  })
  .catch(err => alert("Upload failed!"));
}

function sendQuestion() {
  const question = document.getElementById("question").value;
  const formData = new FormData();
  formData.append("session_id", sessionId);
  formData.append("question", question);

  fetch("https://shubhendu-ghosh-polydocs.hf.space/query/", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("chat-box").innerHTML += `<p><b>You:</b> ${question}</p>`;
    document.getElementById("chat-box").innerHTML += `<p><b>Bot:</b> ${data.answer}</p>`;
  })
  .catch(err => alert("Error fetching response."));
}

function clearSession() {
  const formData = new FormData();
  formData.append("session_id", sessionId);

  fetch("https://shubhendu-ghosh-polydocs.hf.space/clear/", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
    location.reload();
  });
}
