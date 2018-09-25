module.exports = {


  friendlyName: 'Modificarespacio',


  description: 'Modificarespacio coordinador.',


  inputs: {
    idespacio: { type: "number" },
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
    if (req.user && req.idtipopersona==3/*Valida que sea coordinador*/) {
      // logged in
      var response = await Espacio.update({ id: inputs.idespacio })
        .set({
          nombre: inputs.nombre,
          idtipoespacio: inputs.idtipoespacio,
          descripcion: inputs.descripcion,
          capacidad: inputs.capacidad,
          numcomputadores: inputs.numcomputadores
        }).catch(function (err) {
          res.serverError(err);
          return;
        })
      //Provisionalmente retorna al home
      return res.redirect('/home');
      //return exits.success();
    } else {
      // not logged in
      return res.redirect('/');
    }
  }
};
