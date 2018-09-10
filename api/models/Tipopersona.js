/**
 * Tipopersona.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    // id: {
    //   type: 'number',
    //   columnName: 'idtipopersona',
    //   required: true
    // },
    descripcion: { 
      type: 'string',
      required: true
    }
  },
};

