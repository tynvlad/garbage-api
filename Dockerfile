FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

COPY .env ./

RUN npm ci --only=production

COPY ./dist .

CMD [ "node", "index.js" ]