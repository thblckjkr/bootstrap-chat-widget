// Socket.io NodeJS listener
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Socket engine chat
var engine = require('./app/engine')(io);

// Load config 
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('app/config.json', 'utf8'));

//Port to be used by WebServer
var port = config.port;

app.get('*', function(req, res){ 
var name = "";
switch(req.originalUrl){
   case "/":
      name = "index.html"; break;
   default:
      name = req.originalUrl; break;
}
res.sendFile(__dirname + "" + name);
});

http.listen(port , function(){
   console.log('[chat] listening on *: ' + port);
});