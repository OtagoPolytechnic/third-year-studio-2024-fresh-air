FROM node:21-alpine3.19 as backend-build
WORKDIR /backend
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 90
CMD [ "npm run", "generate", "&&", "node", "src/app.js;" ]