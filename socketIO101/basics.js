const http = require('http');
const socketio = require('socket.io');

const server = http.createServer((req, res) => {
  res.end("I'm connected.");
});

const io = socketio(server);

io.on('connection', (socket, req) => {
  socket.emit('welcome', { data: 'Welcome to the websocket server!' });
  socket.on('some event', (msg) => {
    console.log(msg);
    socket.emit('welcome', 'Super! You are here');
  });
});

server.listen(8000);
