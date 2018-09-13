module.exports = {


  friendlyName: 'Borrarespacio',


  description: 'Borrarespacio coordinador.',


  inputs: {
    idespacio: { type: "number" }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    await Espacio.destroy({ id: inputs.idespacio});
    return exits.success();

  }


};
