FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY test.conf /etc/nginx/test.conf

EXPOSE 80
EXPOSE 443


CMD ["nginx", "-g", "daemon off;"]