FROM node:20.10.0-alpine

WORKDIR /app

COPY package.json yarn.lock /app

RUN yarn install --network-timeout 10000000

COPY . /app

RUN yarn build

RUN yarn global add http-server-spa

EXPOSE 6106