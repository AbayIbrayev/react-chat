const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
//calling a router as a middleware
app.use(router);

io.on('connection', (socket) => {
  console.log('We have a new connection!');

  socket.on('join', ({ name, room }, callback) => {
    console.log(name, room);
  });

  socket.on('disconnect', () => {
    console.log('User left!');
  });
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
