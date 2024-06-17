FROM node:21-alpine3.19 as frontend-build
WORKDIR /frontend
COPY package.json ./
COPY .env .env

RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine3.18
COPY --from=frontend-build /frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]