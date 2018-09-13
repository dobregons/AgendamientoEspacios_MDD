module.exports = {


  friendlyName: 'Borrarreserva',


  description: 'Borrarreserva reserva.',


  inputs: {
    idreserva: { type: "number" }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    let req = this.req;
    let res = this.res;


    if (req.user) {
      // if (req.user.idtipopersona == 3) {
      //   //El coordinador puede eliminar cualquier reserva
      //   await Reserva.destroy({ id: inputs.idreserva });
      //   return exits.success();
      // } else {
      await Reserva.findOne({ id: inputs.idreserva }, function (err, reserva) {
        //Valida que exista la reserva
        if ((err) || (!reserva)) {
          return res.send({ err });
        }
        //Valida que la persona loggeada sea la persona que realizó la reserva
        if (reserva.idpersona == req.user.id || req.user.idtipopersona == 3/*Coordinador puede borrar lo que quiera*/) {
          Reserva.destroy({ id: inputs.idreserva })
            .catch(function (err) {
              res.serverError(err);
              return;
            });
          //Enviar correo de reserva cancelada
          var correo = new Object()
          Persona.findOne({ id: reserva.idpersona }, function (err, persona) {
            correo.email = persona.email;
            correo.nombres = persona.nombres;
            correo.espacio = inputs.idreserva;
            Mailer.enviarCorreoReservaCancelada(correo);
            return exits.success();
          });
          
        } else {
          return res.send('No tiene los permisos para esta acción.')
        }
      });


      //Estudiante o coordinador solo puede borrar reservas de ellos

    } else {
      // not logged in
      return res.redirect('/');
    }

  }


};
