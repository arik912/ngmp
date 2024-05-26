FROM node:20-alpine as base

RUN apk add --update && \
    apk add --no-cache unzip git && \
    rm -rf /var/lib/apt/lists/*

FROM base as build

RUN mkdir -p /tmp/app

WORKDIR /tmp/app
COPY . /tmp/app

# Install dependencies
#RUN npm ci --legacy-peer-deps
RUN npm ci --ignore-scripts

# Build the server

RUN npm run build:prod

FROM base as application

#RUN mkdir -p /app
WORKDIR /app

COPY --from=build /tmp/app/package*.json ./
#RUN npm ci --omit=dev --legacy-peer-deps --ignore-scripts
RUN npm ci --omit=dev --ignore-scripts
COPY --from=build /tmp/app/dist /app
COPY --from=build /tmp/app/.env /app

USER node

EXPOSE 80

ENTRYPOINT ["/bin/sh", "-c", "node ./index.js"]
