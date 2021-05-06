FROM node:14

# create app directory
WORKDIR /usr/src/app

# install dependencies
COPY package*.json ./

RUN npm install

RUN git clone https://github.com/vishnubob/wait-for-it.git

COPY . .

EXPOSE 4440

CMD [ "npm", "run", "dev" ]