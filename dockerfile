#Use Node.js image as a base
FROM node:14

#Set the working directory inside the container
WORKDIR /usr/src/app

#Copy package.json to the working directory
COPY package*.json ./

#Install dependencies
RUN npm install

# Copy rest of the application code to working directory
COPY . .

#Exposing port
EXPOSE 3000

#run your app
CMD ["node", "index.js"]
