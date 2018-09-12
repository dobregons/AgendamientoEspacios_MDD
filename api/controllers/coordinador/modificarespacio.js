module.exports = {


  friendlyName: 'Modificarespacio',


  description: 'Modificarespacio coordinador.',


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
    if (req.user) {
      // logged in
      var response = await Espacio.update({ nombre:inputs.nombre,
                                            idtipoespacio: inputs.idtipoespacio,
                                            descripcion: inputs.descripcion,
                                            capacidad: inputs.capacidad,
                                            numcomputadores: inputs.numcomputadores
                                          }).catch(function (err) {
                                            res.serverError(err);
                                            return;
                                          })
      return exits.success();
    } else {
      // not logged in
      return res.redirect('/');
    } 
  }
};
