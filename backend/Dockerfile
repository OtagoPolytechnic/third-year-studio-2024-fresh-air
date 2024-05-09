FROM node:21-alpine3.19
WORKDIR /backend
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD sh -c "npm run generate && npx prisma deploy"