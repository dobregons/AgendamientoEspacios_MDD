/**
 * Persona.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: {
      type: 'number',
      columnName: 'idpersona',
      required: true,
      autoIncrement: true
    },
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
      required: false 
    },
    cedula: { 
      type: 'string', 
      required: true //Se debe cambiar en la base de datos 
    },
    dedicacion: { 
      type: 'number', 
      required: false //Crear tabla en base de datos
    },

  },

};

