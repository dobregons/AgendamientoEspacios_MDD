/**
 * Persona.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt-nodejs');

module.exports = {

  attributes: {
    // id: {
    //   //primaryKey: true,
    //   type: 'number',     
    //   columnName: 'idpersona',
    //   required: true,
    //   autoIncrement: true,
    // },
    idtipopersona: {
      type: 'number',
      required: true
    },
    nombres: {
      type: 'string',
      required: true
    },
    apellidos: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    cedula: {
      type: 'string',
      required: true //Se debe cambiar en la base de datos 
    },
    dedicacion: {
      type: 'number',
      required: false, //Crear tabla en base de datos
      //enum: ['exclusiva', 'tiempocompleto', 'catedra' ] 
    },
    password: {
      type: 'string',
      required: true
    },
    carrera: {
      type: 'string',
      required: false
    },
    estadopersona: {
      type: 'number',
      required: false,
      //enum: ['activo', 'egresado', 'aplazado','suspendido']
    }
  },
  customToJSON: function () {
    return _.omit(this, ['password'])
  },
  beforeCreate: function (user, cb) {

    //Encriptar clave
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, null, function (err, hash) {
        if (err) return cb(err);
        user.password = hash;
        return cb();
      });
    });
  }
};

