FROM node:10

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY . /app

CMD ["yarn", "run", "start"]