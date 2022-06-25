# ---- OpenJDK image
FROM openjdk:18-jdk-alpine AS base

# ---- Inputs
ARG PYTHON_VERSION='3.8.5'

# ---- Create app directory
WORKDIR /app

# ---- Upload the current directory and descendants to WORKDIR
# ---- Ignores files per .dockerignore
# COPY . .

# ---- Update OS
RUN apk --update upgrade

# ---- Install Alpine packages
RUN apk add --no-cache \
  build-base \
  bzip2-dev \
  ca-certificates \
  curl \
  git \
  libffi-dev \
  libxslt-dev \
  linux-headers \
  ncurses-dev \
  openssl-dev \
  readline-dev \
  sqlite-dev \
  bash

# ---- Change user to appuser
# RUN addgroup -g 1001 -S appuser && adduser -u 1001 -S appuser -G appuser
# RUN chown -R appuser:appuser .
# USER appuser 

# --- Set environment variables
ENV HOME /app
ENV PYENV_ROOT $HOME/.pyenv
ENV PYTHON_VERSION $PYTHON_VERSION
ENV PATH $PYENV_ROOT/shims:$PATH:$PYENV_ROOT/bin
ENV CRYPTOGRAPHY_DONT_BUILD_RUST 1

# ---- Install pyenv
RUN curl -L https://raw.githubusercontent.com/yyuu/pyenv-installer/master/bin/pyenv-installer \
  -o pyenv-installer && \
  /bin/bash pyenv-installer && \
  rm pyenv-installer
  
# ---- Install Python
RUN pyenv install $PYTHON_VERSION
RUN pyenv global $PYTHON_VERSION
RUN pyenv rehash

# ---- Install the application
# RUN make install

# ---- Remove Alpine packages not needed at runtime
# USER root
# RUN apk del \
#   build-base \
#   git \
#   linux-headers
# USER appuser
COPY . /app
WORKDIR /app

COPY requirements.txt .

RUN /app/.pyenv/versions/3.8.5/bin/python3.8 -m pip install --upgrade pip

RUN pip3 install -r requirements.txt
RUN chmod +x /app/app.py
CMD ["nohup", "python3", "app.py","&"]


# FROM openjdk:11.0.15-slim

# RUN apt update && apt upgrade
# RUN apt install software-properties-common -y
# # RUN apt-get install ppa-purge
# # RUN add-apt-repository ppa:deadsnakes/ppa -y
# # RUN ppa-purge ppa:deadsnakes/ppa
# # RUN apt update
# RUN apt install python3.8 -y
# RUN apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libreadline-dev libffi-dev libsqlite3-dev wget libbz2-dev -y

# COPY . /app
# WORKDIR /app
# RUN pip3 install -r requirements.txt
# RUN chmod +x /app/app.py
# CMD ["python3", "app.py"]