FROM node:14.4.0 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install -g @angular/cli
RUN npm install
COPY . .
RUN ng build --prod

FROM nginx:stable

#COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]