const path = require('path');
const express = require('express');
const app = express();
const socketio = require('socket.io');
const helmet = require('helmet');
const cors = require('cors');

const namespaces = require('./data/namespaces');

app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const expressServer = app.listen(3000, () => {
  console.log('App listening on port 3000!');
});

const io = socketio(expressServer);

io.on('connection', (socket) => {
  const results = namespaces.map((ns) => {
    return { image: ns.image, endpoint: ns.endpoint };
  });

  socket.emit('nsList', results);
});

namespaces.forEach((ns) => {
  io.of(ns.endpoint).on('connect', (nsSocket) => {
    console.log(`${nsSocket.id} has joined ${ns.title}.`);
    nsSocket.emit('nsRooms', ns.rooms);
  });
});
