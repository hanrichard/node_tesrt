const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// Serve static assets in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));

//   // app.get('*', (req, res) => {
//   //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   // });
//   app.get('/', (req, res) => res.send("api runnint"));
// }

// app.get('/', (req, res) => res.send("api running"));


app.get('/', (req, res) => {
 res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
const io = require('socket.io')(server)

users = [];
connections = [];

io.on('connection', function(socket){
  connections.push(socket);
  console.log('Connected: %s sockets connected', connections.length);

  // Disconnect
  socket.on('disconnect', function(data){
      users.splice(users.indexOf(socket.username), 1);
      updateUsernames();
      connections.splice(connections.indexOf(socket), 1);
      console.log('Disconnected: %s socket connected', connections.length)
  });
  // Send message
  socket.on('send message', function(data){
      console.log(data);
      io.sockets.emit('new message', {msg: data, user: socket.username});
  });

  // New User
  socket.on('new user', function(data, callback){
      callback(true);
      socket.username = data;
      users.push(socket.username);
      updateUsernames();
  });

  function updateUsernames() {
      io.sockets.emit('get users', users);
  }
});

