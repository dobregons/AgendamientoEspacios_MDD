module.exports = {


  friendlyName: 'Borrarpersona',


  description: 'Borrarpersona persona.',


  inputs: {
    idpersona: { type: "string" }
  },


  exits: {

  },


  fn: function (inputs, exits) {

    await Persona.destroy({ id: inputs.idpersona });
    return exits.success();

  }


};
