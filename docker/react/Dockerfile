FROM node:17-slim

ENV APP_HOME /home/app
ENV CHOKIDAR_USEPOLLING true
ENV NODE_OPTIONS "--openssl-legacy-provider"
ENV REACT_APP_API_ORIGIN=https://domain.site
ENV REACT_APP_API_URL=https://domain.site/api
ENV REACT_APP_API_V1_URL=https://domain.site/api/v1
ENV REACT_APP_API_V2_URL=https://domain.site/api/v2
ENV REACT_APP_HEALTH_URL=https://domain.site/api/health
ENV REACT_APP_STATE=nonrandom-docker-state
ENV REACT_APP_SENTRY_DSN="<secret>"

RUN addgroup --system app && adduser --system --group app

RUN mkdir -p $APP_HOME

WORKDIR $APP_HOME

COPY ./frontend/ ./
RUN npm install

RUN chown -R app:app $APP_HOME

USER app
RUN npm run build
