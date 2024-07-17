const io = require('socket.io-client'); //Server side 

const socket = io('http://localhost:3000'); //Client Side

socket.on('connect', () => {
  console.log('Connected to the server as a follower.');
  socket.emit('follow');
});


socket.on('placeIcon', (data) => {
  console.log(`------------------------------------------------------------------------------------------`);
  console.log('New marker added:');
  data.forEach(marker => {
    console.log(`------------------------------------------------------------------------------------------`);
    console.log(`Coordinates: ${JSON.stringify(marker.latlng)}`);
    console.log(`Type: ${marker.type}`);
    console.log(`Details: ${marker.details}`);
    console.log(`Amenities: ${marker.amenities}`); 
  });
});


socket.on('disconnect', () => {
  console.log('Disconnected from the server.');
});
