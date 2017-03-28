FROM readytalk/nodejs
MAINTAINER "livio.brunner.lb1@gmail.com"

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
CMD [ "npm", "start" ]