FROM node:16-alpine3.15
WORKDIR /usr/src/app
COPY package*.json ./
COPY tsconfig.json ./
RUN yarn install
COPY . .
RUN yarn tsc -p ./tsconfig.json

# FROM node:16-alpine3.15
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN yarn install
COPY --from=build /usr/src/app/dist dist

EXPOSE 5000
CMD [ "yarn", "js-start" ]