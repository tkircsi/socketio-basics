const socket = io('http://localhost:3000');
const adminSocket = io('http://localhost:3000/admin');

socket.on('connect', () => {
  console.log(`My socket id: ${socket.id}`);
});

adminSocket.on('connect', () => {
  console.log(`My admin socket id: ${adminSocket.id}`);
});

adminSocket.on('welcome', (msg) => {
  console.log(msg);
});

socket.on('messageFromServer', (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit('messageToServer', { data: 'Data from the client.' });
});

socket.on('messageToClients', (msg) => {
  const messages = document.querySelector('#messages');
  let li = document.createElement('li');
  li.textContent = msg.text;
  messages.appendChild(li);
});

document.querySelector('#message-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const msg = document.querySelector('#user-message').value;
  if (msg !== '') {
    socket.emit('newMessageToServer', { text: msg });
    document.querySelector('#user-message').value = '';
  }
});

// socket.on('ping', () => {
//   console.log('Ping was received from the server.');
// });

// socket.on('pong', (latency) => {
//   console.log(`Pong was sent to the server. Latency: ${latency}`);
// });
