function joinNs(endpoint) {
  const nsSocket = io(endpoint);
  nsSocket.on('nsRooms', (nsRooms) => {
    // Update Rooms DOM
    createRoomList(nsRooms);
  });
}

function createRoomList(nsRooms) {
  const rooms = nsRooms.map((item) => {
    return createRoomItem(item.title, item.private);
  });
  eRooms.innerHTML = rooms.join(' ');
  Array.from(eRooms.getElementsByClassName('room')).forEach((element) => {
    element.addEventListener('click', (e) => {
      console.log('Clicked on ', e.target.innerText);
    });
  });
}

function createRoomItem(title, isPrivate) {
  return `<li class="room">
  <span class="glyphicon glyphicon-${
    isPrivate ? 'lock' : 'globe'
  }"></span>${title}
</li>`;
}
