FROM node:21-alpine3.19
WORKDIR /backend
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD sh -c "npx prisma db push && npm run start"