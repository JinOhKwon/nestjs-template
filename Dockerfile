FROM node:16

RUN mkdir -p /app
WORKDIR /app
COPY ./dist ./app

CMD node dist/main.js
