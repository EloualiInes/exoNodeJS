'use strict';
const socket = io.connect('http://localhost:9000');
let username = '';
const messageInput = document.getElementById('sendMessage');
let typingTimer;

socket.on('connect', () => {
    const id = socket.id;
    console.log(`Client ${id} is connected via WebSockets`);
    socket.emit('login', `user${Math.floor(Math.random() * 10000)}`);
});

// GET la liste des utilisateurs connectés
socket.on('login', () => {
    socket.emit('getUserList');
});

// Modifie front
socket.on("userConnected", (data) => {
    username = data.username;
    const user = document.getElementById("myName");
    user.innerText = `Bienvenue ${data.username}`;
});

// Modifie front pour lister les utilisateurs connectées
socket.on('userList', (users) => {
    console.log("les users connnectés :", users);
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    for (const user of users) {
        const listItem = document.createElement('li');
        listItem.innerText = user;
        userList.appendChild(listItem);
    }
});

// L'utilisateur se déconnecte
window.addEventListener("beforeunload", function() {
    socket.emit("disconnect");
});


// ----- Event pour les utilisateurs qui écrivent
messageInput.addEventListener('keydown', () => {
console.log("je tape ...");
clearTimeout(typingTimer);
  socket.emit('typing', username);
  typingTimer = setTimeout(() => {
    socket.emit('stopTyping');
  }, 5000);
});

messageInput.addEventListener('keyup', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        console.log("j'arrete' ...")
        socket.emit('stopTyping', username);
    }, 5000)
    
});

socket.on('typing', (res) => {
    const typingUsers = [...res];
    const indexUserCurrent = typingUsers.indexOf(username);

    if(indexUserCurrent !== -1) typingUsers.splice(indexUserCurrent, 1);
    const typingMessage = document.getElementById('typingMessage');
    if(typingUsers.length > 2)
        typingMessage.innerText = `${typingUsers[0]},${typingUsers[1]} et d'autres personnes sont en train d'écrire...`;
    else if(typingUsers.length === 2)
        typingMessage.innerText = `${typingUsers[0]},${typingUsers[1]} sont en train d'écrire...`;
    
    else if(typingUsers.length === 1)
        typingMessage.innerText = `${typingUsers[0]} est en train d'écrire...`;

});

socket.on('stopTyping', () => {
  const typingMessage = document.getElementById('typingMessage');
  typingMessage.innerText = '';
});





