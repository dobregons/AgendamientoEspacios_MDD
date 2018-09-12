module.exports = {


  friendlyName: 'Creardisponibilidad',


  description: 'Creardisponibilidad coordinador.',


  inputs: {
      idespacio : {
        type: "number"
      },
      fechainicio : {
        type: "string"
      },
      fechafin : {
        type: "string"
      },
      detalle : {
        type: "string"
      }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    let req = this.req;
    let res = this.res;

    if(req.user)
    {
      //Validar que no se cruce con la disponibilidad actual del espacio
      //var disponibilidad = sails.controllers.reserva.consultarreservaporespacio(inputs.idespacio);
      //logged in
      var reserva = new Object();
      //espacio.fechaingreso = Date.now();
      reserva.idespacio =  inputs.idespacio;
      reserva.idtipoactividad = 1;
      reserva.idpersona = req.user.id;
      reserva.idestado = 1;//Disponible
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
    }else
      //Logout
      return res.redirect('/');

    return exits.success();

  }


};
