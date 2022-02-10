FROM node:17.4.0-slim
WORKDIR /workspace
ADD app/package*.json ./
RUN yarn install
