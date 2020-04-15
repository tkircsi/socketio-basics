const baseUrl = 'http://localhost:3000';
const socket = io(baseUrl);

const eNamespaces = document.querySelector('.namespaces');
const eRooms = document.querySelector('.room-list');

// 'nsList' event and the data list is coming from the server
socket.on('nsList', (data) => {
  // Update Namespaces DOM
  createNamespaceList(data);

  // Select the first namespace by default and connect
  const endpoint = baseUrl + data[0].endpoint;
  joinNs(endpoint);
});

function createNamespaceList(data) {
  const items = data.map((item) => {
    return createNamespaceItem(item.image, item.endpoint);
  });
  eNamespaces.innerHTML = items.join(' ');
  Array.from(eNamespaces.getElementsByClassName('namespace')).forEach(
    (element) => {
      element.addEventListener('click', (e) => {
        const nsEndpoint = e.currentTarget.getAttribute('ns');
        console.log(nsEndpoint);
      });
    }
  );
}

function createNamespaceItem(image, endpoint) {
  return `<div class="namespace" ns="${endpoint}">
  <img
    src="${image}"
  />
</div>`;
}
