FROM python:3.8.13-slim
WORKDIR /app

RUN apt-get update -y
RUN apt-get install -y gcc g++

RUN apt-get install -y default-jdk

COPY . /app
COPY requirements.txt .

RUN pip3 install --no-cache-dir -r requirements.txt
RUN chmod +x /app/app.py
EXPOSE 5002
CMD ["gunicorn", "--bind", "0.0.0.0:5002", "app:app"]