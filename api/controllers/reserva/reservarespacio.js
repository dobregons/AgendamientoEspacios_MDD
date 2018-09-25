module.exports = {


  friendlyName: 'Reservarespacio',


  description: 'Reservarespacio persona.',


  inputs: {
    idespacio: {
      type: "number"
    },
    fechainicio: {
      type: "string"
    },
    fechafin: {
      type: "string"
    },
    detalle: {
      type: "string"
    },
    idestado:
    {
      type: "number"
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    let req = this.req;
    let res = this.res;

    if (req.user) //Cualquier persona loggeada puede reservar un espacio
    {
      //logged in
      //Validar que no se cruce con la disponibilidad actual del espacio. VAlidación existente en frontend que se debe hacer en backend.
      //TODO
      
      
      var reserva = new Object();
      //espacio.fechaingreso = Date.now();
      reserva.idespacio = inputs.idespacio;
      reserva.idtipoactividad = 3;//Valor setteado mientras se completa desarrollo. No requerido para PMV.
      reserva.idpersona = req.user.id;
      reserva.idestado = 2;//Reservado
      reserva.fechainicio = inputs.fechainicio;
      reserva.fechafin = inputs.fechafin;
      reserva.detalle = inputs.detalle;
      
      var reservaCreada = await Reserva
        .create(reserva).fetch()
        // Uniqueness constraint violation
        .catch({ code: 'E_UNIQUE' }, function (err) {
          res.sendStatus(409);
          return;
        })
        // Some other kind of usage / validation error
        .catch({ name: 'UsageError' }, function (err) {
          res.badRequest();
          return;
        })
        // If something completely unexpected happened.
        .catch(function (err) {
          res.serverError(err);
          return;
        });
    } else
        //Logout
        return res.redirect('/');
    reservaCreada.detalle = req.user.nombres + " " + req.user.apellidos + "\n"+ reservaCreada.detalle;
    //Envío de correo de reserva realizada
    var correo = new Object()
    correo.email = req.user.email;
    correo.nombres = req.user.nombres;
    correo.espacio = reservaCreada.id;

    Mailer.enviarCorreoReservaRealizada(correo);
    //Fin de envío de correo
    return exits.success(reservaCreada);

  }


};
