FROM node:21-alpine3.19 as frontend-build
WORKDIR /frontend
COPY package.json ./
COPY .env .env

RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
RUN serve -s build -l 8080

FROM nginx:alpine3.18
COPY --from=frontend-build /frontend/dist /usr/share/nginx/html
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]