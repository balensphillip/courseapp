FROM node:9-slim
WORKDIR /app
COPY package.json ./app
RUN npm install
COPY  . /app 
ENV PORT=1000
EXPOSE 1000

CMD ["npm", "start"]