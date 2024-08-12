FROM node:21-alpine3.19
WORKDIR /backend
COPY package.json ./
COPY .env .env
RUN npm install
COPY . .
EXPOSE 3000
CMD sh -c "npm run generate && prisma migrate resolve && npm run migrate deploy && npm run start"
