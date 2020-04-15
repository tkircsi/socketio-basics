const socket = io('http://localhost:3000');

const eNamespaces = document.querySelector('.namespaces');

function createNamespaceItem(image, endpoint) {
  return `<div class="namespace" ns="${endpoint}">
  <img
    src="${image}"
  />
</div>`;
}

socket.on('nsList', (data) => {
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
});
