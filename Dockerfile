# --- BUILD ---
FROM node:16-alpine as build
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}


WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node . .

RUN npm ci \
    npm run build

USER node

# --- TESTS ---
FROM build as testing

WORKDIR /usr/src/app
USER node


# --- PROD ---
FROM node:16-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
RUN npm ci
USER node
EXPOSE 3000
CMD [ "node", "dist/main" ]