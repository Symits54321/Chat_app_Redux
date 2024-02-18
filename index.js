// server.js

const chatController = require('./controller/api/chat_api');

const port = 3001;

const express = require('express');
const http = require('http');
const db = require('./config/mongoose');

const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const cors = require('cors'); // Import CORS middleware


const { passport, authenticateSocket } = require('./config/passport-local-strategy');
const path = require('path');





const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




//passport
app.use(passport.initialize());
app.use(passport.session());
//app.use(passport.setAuthenticatedUser);


// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
}));



//Socket

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

  // Authenticate the socket connection using Passport.js middleware
  authenticateSocket(socket, (err) => {
    if (err) {
      console.error('Socket authentication failed:', err);
      // Handle authentication failure (e.g., disconnect the socket)
      socket.disconnect();
      console.log('A non authenticated client , so disconnected');
      return;
    }

//PUBLIC    

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



//ROOM

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

});


app.use('/',require('./routes/api/index'));

// Start the server
const PORT = process.env.PORT || port;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

