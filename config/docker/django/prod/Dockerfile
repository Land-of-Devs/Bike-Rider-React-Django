FROM python:3-alpine
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    ENV=prod
WORKDIR /app
COPY ./backend/ ./
RUN python -m pip install --upgrade pip
RUN python -m pip install --upgrade -r requirements.txt
RUN apk add bash
COPY ./config/scripts/wait-for-it.sh /wait.sh
COPY ./config/scripts/start-server.sh /app-start.sh
RUN chmod +x /wait.sh /app-start.sh
CMD [ "/bin/bash", "/wait.sh", "br_db:5432", "--", "bash", "/app-start.sh"]