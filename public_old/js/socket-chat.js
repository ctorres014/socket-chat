var socket = io();

let urlParams = new URLSearchParams(window.location.search);

if (!urlParams.has('nombre') || !urlParams.has('sala')) {
    window.location = "index.html";
    throw new Error('El nombre y la sala son necesarios');
}

let nombre = urlParams.get('nombre');
let sala = urlParams.get('sala');
// Escuchar
socket.on('connect', function() {
    // Los Emit envian informacion
    socket.emit('userConnect', {
        nombre: nombre,
        sala: sala
    }, function(resp) {
        console.log(resp);
    });
});

socket.on('disconnect', function() {});

socket.on('updateRoom', function(resp) {
    console.log('update room', resp);
})

socket.on('outRoom', function(msgRespuesta) {
    console.log('Info del servidor', msgRespuesta);
});

socket.on('sendMessage', function(resp) {
    console.log('broadcast', resp);
});

socket.on('sendMessagePrivate', function(resp) {
    console.log('message private', resp);
})