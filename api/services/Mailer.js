module.exports.sendWelcomeMail = function (obj) {
    sails.hooks.email.send(
        "welcomeEmail",
        {
            Name: obj.nombres
        },
        {
            to: obj.email,
            subject: "Welcome Email"
        },
        function (err) { console.log(err || "Mail Sent!"); }
    )
}

module.exports.enviarCorreoReservaRealizada = function(obj)
{
    sails.hooks.email.send(
        "reservaRealizada",
        {
            Name: obj.nombres,
            Espacio: obj.espacio
        },
        {
            to: obj.email,
            subject: "Reserva de espacio UNAL"
        },
        function (err) { console.log(err || "Correo de reserva realizada enviado!"); }
    )
}

module.exports.enviarCorreoReservaCancelada = function(obj)
{
    sails.hooks.email.send(
        "reservaCancelada",
        {
            Name: obj.nombres,
            Espacio: obj.espacio
        },
        {
            to: obj.email,
            subject: "Reserva de espacio UNAL"
        },
        function (err) { console.log(err || "Correo de reserva cancelada enviado!"); }
    )
}

module.exports.enviarCorreoOlvidoContrasena = function(obj)
{
    sails.hooks.email.send(
        "olvidoContrasena",
        {
            Name: obj.nombres,
            NewPassword: obj.newPassword
        },
        {
            to: obj.email,
            subject: "Recuperación de Contraseña"
        },
        function (err) { console.log(err || "Correo de recuperación de contraseña enviado!"); }
    )
}