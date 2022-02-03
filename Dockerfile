FROM node:14.15-slim
WORKDIR /workspace
ADD app/package*.json ./
RUN yarn install
