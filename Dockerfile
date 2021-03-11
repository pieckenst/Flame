FROM node:14

RUN mkdir -p /usr/flame/
WORKDIR /usr/flame/

COPY package*.json /usr/flame/
RUN npm install
COPY . /usr/flame/

CMD [ "node", "." ]