// Load config 
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('app/config.json', 'utf8'));

/** Some global variables for the system **/
var users = {}; // Users array for chat
var rooms = {}; // Rooms array for chat

// Main engine update for sockets
var socket = function (io) {
    io.of('/chat').on("connection", function (socket) {
        
        socket.on('join', function(data){
            console.log('join', data);
        });

    });
}

module.exports = socket;