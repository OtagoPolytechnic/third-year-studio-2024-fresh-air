FROM node:21-alpine3.19 as frontend-build
WORKDIR /frontend
COPY package.json ./

RUN npm install
COPY . .
ENV VITE_BACKEND_API_KEY=$VITE_BACKEND_API_KEY
RUN npm run build

FROM nginx:alpine3.18
COPY /nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-build /frontend/dist /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]