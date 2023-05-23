const socket = io();
socket.emit("message", "Hola soy el front");
socket.emit("message-2", "Hola soy el front recargado");
console.log("Hola soy el front");
