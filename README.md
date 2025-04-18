# 🧾 AskMyPdf

**AskMyPdf** is a user-friendly web interface built with **Flask**, **HTML/CSS/JS**, and integrates with a powerful backend (Polydocs) to let you **upload PDF documents and interact with their content using natural language**.

It is containerized using **Docker** and deployed on **Hugging Face Spaces**.

🌐 **Live Demo**: [Try AskMyPdf on Hugging Face Spaces](https://huggingface.co/spaces/shubhendu-ghosh/askmypdf)

---

## ✨ Features

- 📄 Upload and parse any PDF file directly from your browser
- 💬 Chat with your PDF contents using natural language
- 🔁 Automatically manages temporary sessions with the backend
- 📦 Dockerized for easy deployment
- ⚡ Smooth, responsive UI using vanilla JS + HTML/CSS
- 🔗 Connects to FastAPI backend (Polydocs) via HTTP API

---

## 🖼️ UI Tech Stack

- **Flask** – Python web framework
- **HTML/CSS/JavaScript** – Frontend interface
- **Marked.js** – For rendering Markdown responses
- **Docker** – Containerization and deployment

---

## 🚀 How it Works

1. User uploads a PDF file via the web UI.
2. The app sends the file to the FastAPI backend (Polydocs) at `/upload`.
3. A `session_id` is returned and used for future queries.
4. User types in questions about the PDF.
5. Questions are sent to `/query` with the `session_id`.
6. Answers from the backend are rendered on the chat interface.
7. Session can be cleared manually via the **Clear Chat** button.

---

## 🧪 Local Setup

1. **Clone the repository**

```bash
git clone https://github.com/your-username/AskMyPdf.git
cd AskMyPdf
```

2. **Install dependencies**

```bash
pip install -r requirements.txt
```

3. **Run the Flask server**

```bash
python app.py
```

4. Visit `http://localhost:5000` in your browser.

---

## 🐳 Docker Setup

Make sure Docker is installed and running.

```bash
docker build -t askmypdf .
docker run -p 5000:5000 askmypdf
```

---

## 🧩 Project Structure

```bash
AskMyPdf/
│
├── app.py                 # Flask application
├── templates/
│   └── index.html         # HTML UI
├── static/
│   ├── styles.css         # Custom CSS
│   └── script.js          # JavaScript for chat & upload
├── requirements.txt       # Dependencies
└── Dockerfile             # For containerization
```

---

## 🧠 Motivation

AskMyPdf was built to provide a seamless way for users to interact with their documents through a simple web UI. Whether you're a student, researcher, or professional, this tool lets you extract and understand information from PDFs efficiently.

---

## 📬 Contact

Built by [Shubhendu Ghosh](https://www.linkedin.com/in/shubhendu-ghosh-ds/)

If you find this project useful, please ⭐ the repo and feel free to connect on [LinkedIn](https://www.linkedin.com/in/shubhendu-ghosh-ds/)!

---

## 📝 License

MIT License – Free to use and modify.
