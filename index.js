// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A client connected');

  // Example: Listen for a 'chat message' event from the client
  socket.on('chat message', (msg) => {
    console.log('Received message from client:', msg);
    // Example: Broadcast the message to all clients
    io.emit('message', msg);
  });

  // Clean up the connection when client disconnects
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });

  // Join a room
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
     //initialise room in mongodb
    console.log(`Client joined room ${roomId}`);
  });

  // Handle message events
  socket.on('sendMessage', ({ roomId, message }) => {
    io.to(roomId).emit('roommessage', message);
    //add message to room to save in mongodb
    console.log(`Message sent to room ${roomId}: ${message}`);
  });

  // Cleanup when a client disconnects
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });

});


app.use('/',require('./routes/api/index'));

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
