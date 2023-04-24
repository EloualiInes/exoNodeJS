'use strict';
const socket = io.connect('http://localhost:9000');

socket.on('connect', () => {
    const id = socket.id;
    console.log(`Client ${id} is connected via WebSockets`);
});