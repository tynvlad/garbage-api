# Step 1. Build typescript files
FROM node:16 as builder

WORKDIR /usr/src/app

COPY ./ ./

RUN npm ci
RUN npm run build

# Step 2. Create express server
FROM node:16 as runner

WORKDIR /usr/src/app

COPY ./package*.json ./
COPY ./.env ./

COPY --from=builder /usr/src/app/dist ./

RUN npm ci --omit=dev
RUN rm package*.json

CMD [ "node", "index.js" ]