const socket = io();

socket.emit('message', `hola soy el cliente`);