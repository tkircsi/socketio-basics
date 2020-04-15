const path = require('path');
const express = require('express');
const app = express();
const socketio = require('socket.io');
const helmet = require('helmet');
const cors = require('cors');

app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const expressServer = app.listen(3000, () => {
  console.log('App listening on port 3000!');
});

const io = socketio(expressServer);

// const curryEmit = io.of('/').emit.bind(io.of('/'), 'welcome');

io.on('connection', (socket) => {
  socket.emit('messageFromServer', { data: 'Welcome to the socketio server' });
  socket.on('newMessageToServer', (msg) => {
    console.log(msg);
  });

  // curryEmit('TEST');
  socket.join('guests');
  io.of('/')
    .to('guests')
    .emit('joined', `${socket.id} is joined the Guests room.`);
});

io.of('/admin').on('connect', (socket) => {
  console.log('Someone connected to the admin namespace.');
  io.of('/admin').emit('welcome', 'Welcome to the admin namespace!');
});
