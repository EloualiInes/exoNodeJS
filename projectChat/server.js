const express = require('express');
const http = require("http");
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.set('view engine', 'pug');
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
// Socket
const server = http.Server(app)
const io = require('socket.io')(server, {
  serveClient: true,
});

let usernames = {};
let typingUsers = [];
const channels = {
  channel1: { users: new Set(), chatHistory: [] },
  channel2: { users: new Set(), chatHistory: [] },
  channel3: { users: new Set(), chatHistory: [] },
};

// Get messages d'un chat donnée
function getChannelMessages(channel) {
  console.log("channels[channel].chatHistory :", channels[channel].chatHistory)
  return channels[channel].chatHistory;
}

io.on('connection', (socket) => {
  console.log('Client', socket.id, 'is connected via WebSockets');

  // Login 
  socket.on('login', (username) => {
    console.log(`L'utilisateur ${username} s'est connecté`);
    socket.username = username;
    usernames[socket.id] = username;
    socket.emit("userConnected", { username }); // Émet l'événement personnalisé vers le front-end
    io.emit('userList', Object.values(usernames)); // Envoie la liste des utilisateurs connectés à tous les clients connectés

  });

  // Lorsque l'utilisateur demande la liste des utilisateurs connectés
  socket.on('getUserList', () => {
    const userList = [];
    for (let socketId in usernames) userList.push(usernames[socketId]);

    // Envoie la liste des utilisateurs connectés à l'utilisateur actuel
    socket.emit('userList', userList);
  });

  // Déconnexion
  socket.on('disconnect', () => {
    if (socket.channel) {
      channels[socket.channel].delete(socket.username);
      io.emit('userList', Array.from(channels[socket.channel]));
    }
  });

  // Détecte quand un utilisateur commence à écrire un message
  socket.on('typing', (user) => {
    typingUsers[socket.id] = user;
    io.emit('typing', Object.values(typingUsers));
  });

  // Détecte quand un utilisateur a fini d'écrire son message
  socket.on('stopTyping', () => {
    delete typingUsers[socket.id];
    io.emit('typing', Object.values(typingUsers));
  });
  // Événement pour diffuser un message à tous les utilisateurs connectés
  socket.on('chatMessage', (message) => {
    const channel = socket.channel;
    const chatHistory = channels[channel].chatHistory || [];
    chatHistory.push({ username: socket.username, message: message });
    channels[channel].chatHistory = chatHistory;
    io.to(channel).emit('chatMessage', { username: socket.username, message: message });
  });



  // -------------------- CHANNELS
  socket.on('joinChannel', (channel) => {
    const previousChannel = socket.channel;

    if (previousChannel) {
      channels[previousChannel].users.delete(socket.username);
      socket.leave(previousChannel);
      io.to(previousChannel).emit(`userList_${previousChannel}`, Array.from(channels[previousChannel].users));
    }

    channels[channel].users.add(socket.username);
    socket.channel = channel;
    socket.join(channel);
    io.emit(`userList_${channel}`, Array.from(channels[channel].users));

    const chatHistory = channels[channel].chatHistory || [];
    socket.emit('channelHistory', chatHistory);
  });




  // Ajouter une action pour renvoyer l'historique des messages d'un canal donné
  socket.on('getChannelMessages', (channel) => {
    const messages = getChannelMessages(channel); // fonction qui renvoie un tableau de messages pour le canal donné
    socket.emit('channelMessages', messages);
  });

});

// Routes
const routeHome = require("./routes/home.route")

app.use("/", routeHome);

const PORT = 9000;
server.listen(PORT, console.log("Server has started at port " + PORT))