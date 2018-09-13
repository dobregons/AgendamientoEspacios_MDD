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
    },
    idtipopersona:
    {
      type: "number"
    }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let req = this.req;
    let res = this.res;
    //Validar que no venga otro tipo de persona diferente a profesor o estudiante
    if(inputs.idtipopersona!=1 && inputs.idtipopersona!=2)
      return res.badRequest("Parámetros inválidos");
    //Validar que no vengan campos vacios

    var persona = new Object()
    persona.email = inputs.email;
    persona.nombres = inputs.nombres;
    persona.apellidos = inputs.apellidos;
    persona.cedula = inputs.cedula;
    persona.telefono = inputs.telefono;
    persona.password = inputs.password;
    persona.idtipopersona = inputs.idtipopersona;
    //Validar que no exista persona
    // await Persona.find({ email: user.email }, function (err, persona) {
    //   if (err || !persona)
    //     return cb("some error message");
    //   if (persona.length > 0)
    //     return cb("Ya existe registrada una persona con el correo " + persona.email);


    // }); 

    var personaBD = await Persona.find({ email: persona.email }).catch(function (err) {
      return res.serverError(err);
    });;
    if(personaBD.length > 0)
        return res.badRequest("Ya existe registrada una persona con el correo " + personaBD[0].email);
    //Crear persona
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
    //return exits.success();
    return res.view("pages/auth/registro", { mensaje: "Persona creada correctamente" });


  }


};
