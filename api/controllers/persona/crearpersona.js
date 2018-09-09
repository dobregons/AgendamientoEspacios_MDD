module.exports = {


  friendlyName: 'Crearpersona',


  description: 'Crearpersona persona.',


  inputs: {
    nombres: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    cedula: {
      type: 'string'
    },
    telefono: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    apellidos:
    {
      type: "string"
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let req = this.req;
    let res = this.res;
    //Validar que no vengan campos vacios

    var persona = new Object()
    persona.email = inputs.email;
    persona.nombres = inputs.nombres;
    persona.apellidos = inputs.apellidos;
    persona.cedula = inputs.cedula;
    persona.telefono = inputs.telefono;
    persona.password = inputs.password;
    persona.idtipopersona = 1;

    var createdUser = await Persona
      .create(persona).fetch()
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

    sails.log('Persona creada\'s id :', createdUser.id);
    //return res.json(createdUser);
    return exits.success();

  }


};
