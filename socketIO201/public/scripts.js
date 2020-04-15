const socket = io('http://localhost:3000');
const adminSocket = io('http://localhost:3000/admin');

socket.on('messageFromServer', (dataFromServer) => {
  console.log(dataFromServer);
  socket.emit('messageToServer', { data: 'Data from the client.' });
});

adminSocket.on('welcome', (dataFromServer) => {
  console.log(dataFromServer);
});

socket.on('joined', (msg) => {
  console.log(msg);
});

document.querySelector('#message-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const msg = document.querySelector('#user-message').value;
  if (msg !== '') {
    socket.emit('newMessageToServer', { text: msg });
    document.querySelector('#user-message').value = '';
  }
});
