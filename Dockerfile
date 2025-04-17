FROM python:3.10-slim

WORKDIR /app
COPY . .

RUN pip install flask requests

EXPOSE 7860
CMD ["python", "app.py"]
