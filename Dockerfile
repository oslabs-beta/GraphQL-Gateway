FROM node:16.14

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm i

COPY . /usr/src/app

RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "node", "./server/index.ts" ]