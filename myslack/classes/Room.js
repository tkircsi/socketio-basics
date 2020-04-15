function Room(id, title, namespace, private = false) {
  this.id = id;
  this.title = title;
  this.namespace = namespace;
  this.private = private;
  this.history = [];
}

Room.prototype.addMessage = function (msg) {
  this.history.push(msg);
};

Room.prototype.clearHistory = function () {
  this.history = [];
};

module.exports = Room;
