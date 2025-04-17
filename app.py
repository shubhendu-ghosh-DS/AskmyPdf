from flask import Flask, render_template, request, jsonify
import requests

app = Flask(__name__)

BACKEND_URL = "https://shubhendu-ghosh-polydocs.hf.space"  # or your deployed FastAPI backend

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/upload", methods=["POST"])
def upload():
    file = request.files["pdf"]
    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    files = {"files": (file.filename, file.stream, file.content_type)}
    response = requests.post(f"{BACKEND_URL}/upload", files=files)

    return jsonify(response.json())

@app.route("/query", methods=["POST"])
def query():
    session_id = request.form["session_id"]
    question = request.form["question"]

    data = {"session_id": session_id, "question": question}
    response = requests.post(f"{BACKEND_URL}/query", data=data)

    return jsonify(response.json())

@app.route("/clear", methods=["POST"])
def clear():
    session_id = request.form["session_id"]
    response = requests.post(f"{BACKEND_URL}/clear", data={"session_id": session_id})
    return jsonify(response.json())
