const bodyParser = require('body-parser');
const express = require('express');
const server = express.create();
const router = express.router('db.json');
const middlewares = express.defaults({
  static : 'public', 
  noCors : true
});
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(express.bodyParser)
server.use(router);
server.listen(port);