module.exports = {


  friendlyName: 'Consultarreservaporespacio',


  description: 'Consultarreservaporespacio reserva.',


  inputs: {
    idespacio: { type: "string" }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let req = this.req;
    let res = this.res;
    /* Código no utilizado por la necesidad de traer el nombre del espacio (join requerido)
    var reserva = await Reserva.find({ idespacio: inputs.idespacio }).populate('idespacio')
      // If there was some kind of usage / validation error
      .catch({ name: 'UsageError' }, function (err) {
        return res.badRequest(err);
      })
      // If something completely unexpected happened.
      .catch(function (err) {
        return res.serverError(err);
      });
    if(!reserva2) { return res.notFound(); }
    return res.json(reserva2.rows);
    */
    var reserva2 = await Reserva.query("\
              Select r.id, r.fechainicio, r.fechafin, r.idestado, concat(p.nombres,' ', p.apellidos, '\n', r.detalle) as detalle \
              from reserva r                      \
              join persona p on r.idpersona = p.id \
              where idespacio=$1", [inputs.idespacio], function (err, rawResult) {
        if (err) { return res.serverError(err); }

        sails.log(rawResult.rows);

        return res.ok(rawResult.rows);
      });


  }
};
