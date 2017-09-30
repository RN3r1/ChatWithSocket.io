var express  =require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 6677;

app.use(express.static('client'));

app.get('/hola-mundo', function (req, res) {
    res.status(200).send('Hola Mundo desde una ruta');
});

var messages = [{
    id:1,
    text:"Hola puñetas",
    nickname:"bot"
}];

io.on('connection', function (socket) {
    console.log('El usuario con la dirección IP:'+socket.handshake.address+' se ha conectado');
    socket.emit('messages', messages);
    socket.on('add-message', function (data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});

server.listen(port, function () {
    console.log('Server is up and running in http://localhost:'+port);
});