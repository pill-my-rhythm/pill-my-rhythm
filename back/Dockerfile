# 수정해야함
FROM node:16-alpine3.15
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 5000
CMD [ "yarn", "start" ]