const express = require('express');
const WebSocketServer = require('ws').Server;
const http = require('http');

const app = express();
const server = http.createServer(app);

const sockets = {};
const wss = new WebSocketServer({server});
wss.on('connection', (ws, req) => {
  if (req.url.indexOf('master') !== -1) {
    console.log('Master connected');
    sockets.master = ws;
    sockets.master.id = req.headers['sec-websocket-key'];
  } else {
    console.log('Client connected');
    sockets.client = ws;
    sockets.client.id = [req.headers['sec-websocket-key']];
  }

  ws.on('close', () => {
    if (ws === sockets.master) {
      console.log('Master disconnected');
      sockets.master = null;
    } else {
      console.log('Client disconnected');
      sockets.client = null;
    }
  });

  ws.on('error', e => {
    console.log('ERROR: ', e);
  });

  ws.on('message', (data) => {
    if (sockets.master) {
      sockets.master.send(data);
    }
  });

});

server.listen(4000, () => {
  console.log('Server is up and running on port 4000');
});

