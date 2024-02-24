FROM node:21.6.2-slim
WORKDIR /workspace
ADD app/package*.json ./
RUN apt-get update -y \
    && apt-get autoremove -y
RUN apt-get install -y git
RUN yarn install
