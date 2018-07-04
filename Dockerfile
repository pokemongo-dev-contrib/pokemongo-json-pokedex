FROM node:9.6.1

WORKDIR /var/lib/pokemongo-json-pokedex

COPY package.json package-lock.json ./
RUN npm install
COPY . .

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]
