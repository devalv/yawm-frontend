FROM node:17-slim

ENV APP_HOME /home/app
ENV CHOKIDAR_USEPOLLING true
ENV NODE_OPTIONS "--openssl-legacy-provider"

RUN addgroup --system app && adduser --system --group app

RUN mkdir -p $APP_HOME

WORKDIR $APP_HOME

COPY ./frontend/ ./
RUN npm install

RUN chown -R app:app $APP_HOME

USER app
RUN npm build
