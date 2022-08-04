FROM node:16.14

RUN npm i webpack -g

RUN npm i typescript -g

WORKDIR /usr/src/app

COPY package.json .

RUN npm i

COPY . .

RUN npm run build

RUN tsc

RUN cd ts-build

RUN rm -rf client/

EXPOSE 3000

CMD ["npm", "run", "start:docker"]