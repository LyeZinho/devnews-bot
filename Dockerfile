FROM node:16
WORKDIR /src/
ENV NODE_ENV=production
COPY ["./src/package.json", "./src/package-lock.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
CMD [ "node", "./src/main.js" ]