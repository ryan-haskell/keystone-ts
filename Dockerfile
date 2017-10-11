FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g nodemon --silent

COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/

RUN npm install --silent

COPY tsconfig.json /usr/src/app/

CMD [ "npm", "run", "build" ]
