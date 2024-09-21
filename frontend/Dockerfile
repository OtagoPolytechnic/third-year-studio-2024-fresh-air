FROM node:21-alpine3.19 as frontend-build
WORKDIR /frontend
COPY package.json ./

RUN npm install
COPY . .
ENV VITE_BACKEND_API_KEY=$VITE_BACKEND_API_KEY
RUN npm run build

FROM nginx:alpine3.18
COPY --from=frontend-build /frontend/dist /usr/share/nginx/html
COPY /nginx/nginx.conf /etc/nginx/sites-available/nginx.conf
COPY /nginx/nginx-testing /etc/nginx/sites-available/nginx-testing.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
