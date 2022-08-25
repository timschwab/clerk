FROM node:17
WORKDIR /clerk

RUN npm install -g webpack webpack-cli

COPY package*.json ./

RUN npm install

COPY . ./

RUN node build

EXPOSE 8357

CMD node run
