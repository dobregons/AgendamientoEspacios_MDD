/**
 * Reserva.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    // id: {
    //   type: 'number',
    //   columnName: 'idreserva',
    //   required: true,
    //   autoIncrement: true
    // },
    idespacio: { 
      type: 'number', 
      required: true 
    },
    idtipoactividad: { 
      type: 'number', 
      required: true 
    },
    idpersona: { 
      type: 'number', 
      required: true 
    },
    idestado: { 
      type: 'number', 
      required: true 
    },
    fechainicio: { 
      type: 'ref', 
      required: true, 
      columnType: 'timestamp' 
    },
    fechafin: { 
      type: 'ref', 
      required: false, 
      columnType: 'timestamp'
    },
    detalle: { 
      type: 'string', 
      required: false 
    },
  },

};

