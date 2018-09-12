module.exports = {


  friendlyName: 'Enviarcorreoolvidocontrasena',


  description: 'Enviarcorreoolvidocontrasena clienteemail.',


  inputs: {
    nombres: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    newPassword:
    {
      type: "string"
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {

    let req = this.req;
    let res = this.res;

    //If inputs are null or empty
    if (!inputs.email || !inputs.nombres || !inputs.espacio)
      return res.badRequest();

    var correo = new Object()
    correo.email = inputs.email;
    correo.nombres = inputs.nombres;
    correo.newPassword = inputs.newPassword;

    Mailer.enviarCorreoOlvidoContrasena(correo);  // <= Here we using
    res.json(200, { correo: correo });
    return exits.success();

  }


};
