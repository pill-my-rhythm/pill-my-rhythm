FROM node:18-alpine3.15

WORKDIR /usr/src/app
COPY package*.json ./

RUN yarn global add typescript
COPY . .

RUN yarn build
COPY .env ./dist/
COPY package.json ./dist/

WORKDIR ./dist
RUN yarn install

EXPOSE 5004
CMD ["yarn", "js-start"]