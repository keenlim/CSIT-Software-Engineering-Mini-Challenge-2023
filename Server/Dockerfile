# Define from what image we want to build from
FROM node:18-alpine

# Create a dictionary to hold the application code inside the image
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose instruction
EXPOSE 8080

# Define the command to run your app
CMD ["node" , "server.js"]


