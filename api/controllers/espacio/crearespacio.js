module.exports = {


  friendlyName: 'Crearespacio',


  description: 'Crearespacio coordinador.',


  inputs: {
    nombre: { type: "string" },
    idtipoespacio: { type: "number" },
    descripcion: { type: "string" },
    capacidad: { type: "number" },
    numcomputadores: { type: "number" }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    let req = this.req;
    let res = this.res;

    if (req.user&& req.user.idtipopersona==3/*Valida que sea coordinador*/) {
      // logged in

      var espacio = new Object();
      //espacio.fechaingreso = Date.now();
      espacio.fechaingreso = await sails.helpers.generatedate();
      espacio.fechagreso = await sails.helpers.generatedate();
      espacio.idresponsable = req.user.id;
      espacio.idtipoespacio = inputs.idtipoespacio;
      espacio.nombre = inputs.nombre;
      espacio.descripcion = inputs.descripcion;
      espacio.capacidad = inputs.capacidad;
      espacio.numcomputadores = espacio.numcomputadores;


      var espacioCreado = await Espacio
        .create(espacio).fetch()
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
        })
        ;

      sails.log('Espacio creado\'s id :', espacioCreado.id);
      //return res.json(createdUser);
      return res.redirect("/home");
      //return exit.ssuccess();
    } else {
      // not logged in
      return res.redirect('/');
    }
  }


};
