module.exports = {


  friendlyName: 'Enviarcorreo',


  description: 'Enviarcorreo clienteemail.',


  inputs: {
    nombres: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
  },


  exits: {
    notFound: {
      responseType: 'notfound',
      description: 'not found'
    }
  },


  fn: function (inputs, exits) {
    let req = this.req;
    let res = this.res;

    //If inputs are null or empty
    if (!inputs.email || !inputs.nombres)
      return res.notFound();

    var persona = new Object()
    persona.email = inputs.email;
    persona.nombres = inputs.nombres;

    Mailer.sendWelcomeMail(persona);  // <= Here we using
    res.json(200, { persona: persona });
    return exits.success();

  }


};
