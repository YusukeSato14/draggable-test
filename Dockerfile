FROM node:14.15-slim
WORKDIR /usr/src/app/app
ADD app/package*.json ./
RUN yarn install
