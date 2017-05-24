FROM nginx:1.11.10
RUN rm /etc/nginx/conf.d/default.conf && rm /usr/share/nginx/html/*
COPY dist /usr/share/nginx/html
COPY nginx/conf.d /etc/nginx/conf.d
EXPOSE 80
