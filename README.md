# nodejs-movie-app
A complete MVC application built in nodejs,mongodb and express - 

## Requirements
- download & install [Nodejs](https://nodejs.org/download/)
- download & install [MongoDB](https://www.mongodb.org/downloads)
- install grunt-cli ```npm install -g grunt-cli```

## Install & Run
Clone the repo
```
git clone https://github.com/niranjansosvns/nodejs-mongdb-movie-app.git
```

navigate to the project folder and then install the dependencies
```
npm install
```

set environment as development (default is development)
```
export NODE_ENV=development // use git bash on windows
```

start development db
```
grunt mongo // make sure /data/db directory exists in your system
```

start the app development server
```
npm start
```

visit localhost:3000 and you should get the home page.


