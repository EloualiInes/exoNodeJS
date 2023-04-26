'use strict';
const socket = io.connect('http://localhost:9000');
let username = '';
const messageInput = document.getElementById('sendMessage');
let typingTimer;
let currentChannel = 'channel1';
const channelList = document.getElementById('channelList');
// Emojis
tinymce.init({
  selector: "#sendMessage",
  plugins: "emoticons",
  toolbar: "emoticons",
  toolbar_location: "bottom",
  height: 200,
  menubar: false,
  setup: function (editor) {
    editor.on('keydown', function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        messageInput.value = editor.getContent({ format: 'text' }).trim();
        messageInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        editor.setContent('');
      } else {
        messageInput.dispatchEvent(new KeyboardEvent('keydown', { key: e.key }));
      }
    });
    editor.on('keyup', function (e) {
      e.preventDefault();
      messageInput.dispatchEvent(new KeyboardEvent('keydown'));
    });
  }
});

let users = [];



// Connexion
socket.on('connect', () => {
  const id = socket.id;
  console.log(`Client ${id} is connected via WebSockets`);
  let pseudo = prompt("Please enter your pseudo :").trim();
  console.log("pseudo : ", pseudo)
  while (pseudo === "") {
    pseudo = prompt("Please enter your pseudo :").trim();
  }
  socket.emit('login', pseudo);
  socket.emit('joinChannel', currentChannel);
  socket.emit('getChannelMessages', currentChannel);
});

// GET la liste des utilisateurs connectés
socket.on('login', () => {
  socket.emit('getUserList');
});

// Modifie front pour ajouter le login de l'utilisateur
socket.on("userConnected", (data) => {
  username = data.username;
  const user = document.getElementById("myName");
  user.innerText = `Bienvenue ${data.username}`;
});

// Modifie front pour lister les utilisateurs connectées
socket.on('userList', (newUsers) => {
  users = [...newUsers];

  console.log("les users connectés :", users);
  const userList = document.getElementById('userList');

  // Créer un tableau des éléments li existants pour les réutiliser
  const existingItems = Array.from(userList.children);

  for (const user of users) {
    // Vérifier si l'élément li existe déjà pour cet utilisateur
    const existingItem = existingItems.find(item => item.innerText === user);
    if (existingItem) {
      // Si l'élément li existe déjà, le retirer du tableau existingItems
      existingItems.splice(existingItems.indexOf(existingItem), 1);
    } else {
      // Si l'élément li n'existe pas encore, le créer et l'ajouter à la liste
      const listItem = document.createElement('li');
      listItem.innerText = user;
      userList.appendChild(listItem);
    }
  }

  // Supprime les éléments li existants qui ne sont plus nécessaires
  for (const item of existingItems) {
    userList.removeChild(item);
  }
});



// L'utilisateur se déconnecte
window.addEventListener("beforeunload", function () {
  socket.emit("disconnect");
});


// ----- Event pour les utilisateurs qui écrivent -------- 
messageInput.addEventListener('keydown', (event) => {
  console.log("messageInput keydown");
  if (event.key === "Enter") {
    event.preventDefault(); // empêcher l'ajout d'un retour à la ligne
    const message = messageInput.value.trim();
    if (message !== '') {
      socket.emit('stopTyping');
      socket.emit('chatMessage', message);
      socket.emit('getChannelMessages', currentChannel);
      messageInput.value = '';
    }
  } else {
    console.log("je tape ...");
    clearTimeout(typingTimer);
    socket.emit('typing', username);
    typingTimer = setTimeout(() => {
      socket.emit('stopTyping');
    }, 3000);
  }
});

messageInput.addEventListener('keyup', () => {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    console.log("j'arrete' ...")
    socket.emit('stopTyping', username);
  }, 3000)

});

// Notifie les utilisateurs qu'un autre écrit, le texte change en fonction du nombre d'utilisateurs qui écrit
socket.on('typing', (res) => {
  const typingUsers = [...res];
  const indexUserCurrent = typingUsers.indexOf(username);

  if (indexUserCurrent !== -1) typingUsers.splice(indexUserCurrent, 1);
  const typingMessage = document.getElementById('typingMessage');
  if (typingUsers.length > 2)
    typingMessage.innerText = `${typingUsers[0]},${typingUsers[1]} et d'autres personnes sont en train d'écrire...`;
  else if (typingUsers.length === 2)
    typingMessage.innerText = `${typingUsers[0]},${typingUsers[1]} sont en train d'écrire...`;

  else if (typingUsers.length === 1)
    typingMessage.innerText = `${typingUsers[0]} est en train d'écrire...`;
  else {
    typingMessage.innerText = '';
  }
});

socket.on('stopTyping', () => {
  const typingMessage = document.getElementById('typingMessage');
  typingMessage.innerText = '';
});

// Modifie le front pour faire apparaitre tous les messages d'un chat donné
socket.on('chatMessage', (data) => {
  const historiqueMessages = document.getElementById('historiqueMessages');
  const msg = document.createElement('p');
  msg.innerText = `${data.username}: ${data.message}`;
  historiqueMessages.appendChild(msg);
});


// -------------- CHANNELS

// Front permettant de mettre en évidence le channel où se trouve l'utilisateur
channelList.addEventListener('click', (event) => {
  channelList.querySelectorAll('li').forEach(li => {
    li.classList.remove('active');
  });

  const selectedLi = event.target.closest('li');
  selectedLi.classList.add('active');
  if (event.target.nodeName === 'LI') {
    currentChannel = event.target.getAttribute('data-value');
    console.log("currentChannel :", currentChannel);
    socket.emit('joinChannel', currentChannel);
    socket.emit('getChannelMessages', currentChannel);
  }

});


// Ajoute un événement pour écouter la réponse du serveur à l'action 'channelMessages'
socket.on('channelMessages', (messages) => {
  // Supprime l'historique précédent en supprimant tous les éléments enfants de 'historiqueMessages'
  const historiqueMessages = document.getElementById('historiqueMessages');
  historiqueMessages.innerHTML = '';

  // Ajoute chaque message dans 'messages' à 'historiqueMessages'
  for (const message of messages) {
    const msg = document.createElement('p');
    msg.innerText = `${message.username}: ${message.message}`;
    historiqueMessages.appendChild(msg);
  }
});


