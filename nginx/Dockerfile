FROM nginx:alpine
COPY nginx.conf /etc/nginx/sites-available/nginx.conf
COPY live.conf /etc/nginx/sites-available/test.conf
COPY test.conf /etc/nginx/sites-available/live.conf
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]