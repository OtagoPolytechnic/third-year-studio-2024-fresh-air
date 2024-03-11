FROM node:21-alpine3.19
WORKDIR /frontend
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build