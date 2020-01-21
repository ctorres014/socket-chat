class Usuario {
    constructor() {
        this.usuarios = [];
    }

    addUsuario(id, nombre, sala) {
        let persona = { id, nombre, sala }
        this.usuarios.push(persona);
        return this.usuarios;
    }

    getUsuarios() {
        return this.usuarios;
    }

    getUsuarioById(id) {
        let usuarios = this.usuarios.filter(usuario => usuario.id === id);
        return usuarios;
    }

    deleteUsuario(id) {
        let usuarioDelete = this.getUsuarioById(id);
        this.usuarios = this.usuarios.filter(usuario => usuario.id != id);
        return usuarioDelete;
    }

    getUsuarioBySala(sala) {
        let usuarios = this.usuarios.filter(usuario => usuario.sala === sala);
        return usuarios;
    }

}

module.exports = {
    Usuario
}