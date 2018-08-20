FROM node:9.6.1

WORKDIR /var/lib/pokemongo-json-pokedex

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run update


ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]
