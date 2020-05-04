FROM node:10 as ng-build
WORKDIR /app
COPY . .
RUN yarn
RUN yarn build

FROM nginx:alpine
COPY --from=ng-build /app/dist/angular-app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]