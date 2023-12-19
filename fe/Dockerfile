FROM node:alpine

RUN mkdir -p /usr/src/app
ENV PORT 3000

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install --legacy-peer-deps

COPY . /usr/src/app

ARG NEXT_PUBLIC_API_URI
ENV NEXT_PUBLIC_API_URI=/

RUN npm run  build


ARG PORT
EXPOSE $PORT

CMD [ "npm", "run", "start" ]