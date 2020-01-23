// Referencias
var divUsuarios = $("#divUsuarios");
var formEnviar = $("#formEnviar");
var txtMensaje = $("#txtMensaje");
var chatBox = $("#divChatbox");

function renderHTML(users) {

    var html = '';
    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span> ' + urlParams.get('sala') + '</span></a>';
    html += '</li>';

    for (var i = 0; i < users.length; i++) {
        html += '<li>'
        html += '    <a data-id=' + users[i].id + 'href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + users[i].nombre + '<small class="text-success">online</small></span></a>'
        html += '</li>'
    }

    divUsuarios.html(html);
}

function renderMsg(msg, typeSend) {
    var renderHTML = '';

    var fecha = new Date(msg.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    if (typeSend == 'private') {
        renderHTML += '<li class="reverse">';
        renderHTML += '    <div class="chat-content">';
        renderHTML += '        <h5>' + msg.user + '</h5>';
        renderHTML += '        <div id="msg" class="box bg-light-inverse">' + msg.message + '</div>';
        renderHTML += '    </div>';
        renderHTML += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        renderHTML += '    <div class="chat-time">' + hora + '</div>';
        renderHTML += '</li>';
    } else {
        renderHTML += '<li class="animated fadeIn">';
        renderHTML += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        renderHTML += '    <div class="chat-content">';
        renderHTML += '        <h5>' + msg.user + '</h5>';
        renderHTML += '        <div class="box bg-light-info">' + msg.message + '</div>';
        renderHTML += '    </div>';
        renderHTML += '    <div class="chat-time">' + hora + '</div>';
        renderHTML += '</li>';
    }

    chatBox.append(renderHTML);

}

// Listener
divUsuarios.on('click', 'a', function() {
    // this hace referencia en este caso al ancortac
    var id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});

formEnviar.on('submit', function(e) {
    // Permite realizar el posteo de la info
    // Sin recargar el sitio
    e.preventDefault();

    if (txtMensaje.val().trim().length === 0) {
        return;
    }
    // Envio de mensaje
    socket.emit('sendMessage', {
        nombre: urlParams.get('nombre'),
        sala: urlParams.get('sala'),
        msg: txtMensaje.val(),
    }, function(resp) {
        renderMsg(resp, 'private');
    });

    txtMensaje.val("");

});