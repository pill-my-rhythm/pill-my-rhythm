FROM node:18-alpine3.15 AS builder
ENV NODE_ENV production
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./

RUN yarn install
COPY . .
RUN yarn build

FROM nginx:1.23.0-alpine AS production
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]