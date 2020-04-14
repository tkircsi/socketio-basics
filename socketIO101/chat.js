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

const messageFromClient = (dataFromClient) => {
  console.log(dataFromClient);
};

io.on('connection', (socket) => {
  // console.log(io.sockets.sockets);
  // console.log(io.sockets.map((item) => item.id));
  socket.emit('messageFromServer', { data: 'Welcome to the socketio server' });
  // socket.on('messageToServer', messageFromClient);

  socket.on('newMessageToServer', (msg) => {
    // console.log(msg);
    io.emit('messageToClients', { text: msg.text });
  });
});
