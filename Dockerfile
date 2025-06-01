#Dcockerfile for client side 

#Building React Client
From node:10.16-alpine
#Working directory setup 
WORKDIR /usr/src/app

COPY package*.jspn ./

#Installing dependencies
RUN npm install --silent
#copy local files to app folder
COPY . .
EXPOSE 3000
CMD ["npm","start"]
