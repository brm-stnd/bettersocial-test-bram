FROM node:16

WORKDIR /usr/src/app

COPY ./ ./app
COPY package.json .
COPY tsconfig.json .
COPY tsconfig.build.json .

EXPOSE 80
ENV PORT 80
ENV NODE_ENV production

RUN npm install

RUN npm run build

CMD ["npm", "run", "start:prod"]