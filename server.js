const http = require('http'); 
const socketIo = require('socket.io'); //Client Side
const express = require('express'); 
const path = require('path'); 

const app = express(); 
const server = http.createServer(app); 
const io = socketIo(server); //Server-Side


//use path to join and create a public repository

app.use(express.static(path.join(__dirname, 'public')));

let markers = []; //Initializes empty array to store marker data in the server

io.on('connection', (socket) => { //listens for new client connections
  console.log('New client connected');

  // Send existing markers to the new client
  //Emit -> Sends an event with a name to either server or client
  socket.emit('placeIcon', markers);

  // Handle new marker placement
  socket.on('placeIcon', (marker) => {
    markers.push(marker);
    io.emit('placeIcon', [marker]);
  });

  // Handle marker removal
  socket.on('removeIcon', (id) => {
    console.log(`Received request to remove marker with id: ${id}`);
    markers = markers.filter(marker => marker.id !== id);             //just to make sure that marker cannot exist after filtering it
    io.emit('removeIcon', id);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


//starts http server and listens for incoming connections
server.listen(3000, () => {
  console.log('Listening on port 3000');
});
