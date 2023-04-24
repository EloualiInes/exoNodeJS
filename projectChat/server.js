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
        console.log(`L'utilisateur ${socket.username} s'est déconnecté`);
        delete usernames[socket.id];
        io.emit('userList', Object.values(usernames));
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
  });

// Routes
const routeHome = require("./routes/home.route")

app.use("/", routeHome);

const PORT = 9000;
server.listen(PORT, console.log("Server has started at port " + PORT))


// SOCKETS
login = async () => {

}