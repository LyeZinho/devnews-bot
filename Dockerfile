FROM node:16
WORKDIR /src
ENV NODE_ENV=production
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
CMD [ "node", "main.js" ]