const { io } = require('../server');
const { Usuario } = require('../classes/usuarios');
const { createMessage } = require('../utils/utils');

let usuario = new Usuario();

io.on('connection', (client) => {
    client.on('userConnect', (data, callback) => {
        // Agregamos un usuario a una sala
        client.join(data.sala);
        usuario.addUsuario(client.id, data.nombre, data.sala);
        client.broadcast.to(data.sala).emit('updateRoom', usuario.getUsuarioBySala(data.sala));
        callback(usuario.getUsuarioBySala(data.sala));
    });

    client.on('sendMessage', (data, callback) => {
        let user = usuario.getUsuarioById(client.id);
        let message = createMessage(user[0].nombre, data.msg);
        client.broadcast.emit('sendMessage', message);
        callback(message);
    });

    client.on('sendMessagePrivate', (data, callback) => {
        let user = usuario.getUsuarioById(client.id);
        let message = createMessage(user[0].nombre, data.msg);
        client.broadcast.to(data.id).emit('sendMessagePrivate', message);
        callback(message);
    });


    client.on('disconnect', () => {
        let userDisconnect = usuario.deleteUsuario(client.id);
        client.broadcast.to(userDisconnect[0].sala).emit('outRoom', createMessage('Administrador', `usuario ${ userDisconnect[0].nombre } desconectado`));
        client.broadcast.to(userDisconnect[0].sala).emit('updateRoom', usuario.getUsuarioBySala(userDisconnect[0].sala));

    });




});