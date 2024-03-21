FROM node:21-alpine3.19 as build
WORKDIR /frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine3.18
COPY --from=build /frontend/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]