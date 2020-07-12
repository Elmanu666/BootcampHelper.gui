FROM node:14.4.0-alpine AS build
WORKDIR /usr/src/app
COPY package.json ./
RUN apk update && \
	apk upgrade && \
RUN apk add --no-cache --upgrade bash
RUN npm install
COPY . .
RUN ng build --prod

FROM nginx:stable
COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=compile-image /opt/ng/dist/ /usr/share/nginx/html