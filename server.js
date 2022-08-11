const bodyParser = require('body-parser');
const express = require('express');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static : 'public', 
  noCors : true
});
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(jsonServer.bodyParser)
server.use(router);
server.listen(port);