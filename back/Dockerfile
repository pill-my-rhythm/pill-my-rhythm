FROM node:16-alpine3.15
WORKDIR /usr/src/app
COPY package*.json ./

# COPY tsconfig.json ./

RUN yarn install
# RUN npm install -g typescript
COPY . .

# RUN yarn tsc -p ./tsconfig.json
# COPY ./**/*.yaml ./dist/
RUN yarn build
COPY ./src/swagger.yaml ./dist/src/
COPY ./src/swagger ./dist/src/
COPY .env ./dist/
# 아 여기 좀 이상한데... 근데 또 컨테이너 올리면 node modules 없다니깨..
COPY package.json ./dist/

WORKDIR ./dist
RUN yarn install

# COPY package*.json ./
# RUN yarn install
# COPY --from=build /usr/src/app/dist dist

EXPOSE 5000
CMD ["yarn", "js-start"]


# RUN yarn tsc -p ./tsconfig.json
# WORKDIR /usr/src/app/dist
# COPY package*.json ./
# RUN yarn install
# COPY --from=build /usr/src/app/dist dist