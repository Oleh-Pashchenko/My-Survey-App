FROM node:20-alpine

COPY . ./app

WORKDIR /app

RUN npm install --legacy-peer-deps

ENV NODE_ENV production

ARG BE_PORT
EXPOSE $BE_PORT

CMD ["npm", "run", "start"]