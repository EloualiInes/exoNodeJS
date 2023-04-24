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
const server = http.Server(app) // Récupère l'objet Server de l’app Express
const io = require('socket.io')(server, {
    serveClient: true,
  }); // Créer une instance de socket.io

io.on('connection', (socket) => {
    console.log('Client', socket.id, 'is connected via WebSockets')
})

// Routes
const routeHome = require("./routes/home.route")

app.use("/", routeHome);

const PORT = 9000;
server.listen(PORT, console.log("Server has started at port " + PORT))