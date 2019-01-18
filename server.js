// Socket.io NodeJS listener
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Socket engine chat
var engine = require('./app/socket')(io);

// Load config 
var fs = require('fs');
var config = JSON.parse(
   fs.readFileSync('app/config.json', 'utf8')
);

//Port to be used by WebServer
var port = config.port;

http.listen(port , function(){
   console.log('[chat] listening on *: ' + port);
});