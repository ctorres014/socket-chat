let createMessage = (user, message) => {
    return {
        user,
        message,
        fecha: new Date().getTime()
    };
}

module.exports = {
    createMessage
}