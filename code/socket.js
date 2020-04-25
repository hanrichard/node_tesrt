let io;

module.exports = {
 init: httpServer => {
  io = require('socket.io')(httpServer);
  return io;
 }, 
 getIO: () => {
  if(!io) {
   throw new Erro('socket io is not initialized')
  }
  return io;
 }
}