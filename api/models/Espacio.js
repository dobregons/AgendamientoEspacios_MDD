/**
 * Espacio.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    // id: {
    //   type: 'number',
    //   columnName: 'idespacio',
    //   required: true,
    //   autoIncrement: true
    // },
    idtipoespacio: {
      type: 'number',
      required: true
    },
    idresponsable: {
      type: 'number',
      required: true
    },
    nombre: {
      type: 'string',
      required: true
    },
    descripcion: {
      type: 'string',
      required: false
    },
    fechaingreso: {
      type: 'ref',
      required: true,
      columnType: 'timestamp'
    },
    fechaegreso: {
      type: 'ref',
      required: false,
      columnType: 'timestamp'
    },
    capacidad: {
      type: 'number',
      required: false
    },
    numcomputadores: {
      type: 'number',
      required: false
    },
    activo: {
      type: 'boolean',
      required: false
    },
  },
};

