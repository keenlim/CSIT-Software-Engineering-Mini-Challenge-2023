FROM node:18.14.0-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
ADD package*.json ./

# If you are building your code for production
RUN npm install

# Bundle app source
ADD index.js ./

EXPOSE 8080
CMD [ "node", "index.js" ]


