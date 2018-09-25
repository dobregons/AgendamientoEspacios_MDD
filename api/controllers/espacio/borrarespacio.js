module.exports = {


  friendlyName: 'Borrarespacio',


  description: 'Borrarespacio coordinador.',


  inputs: {
    idespacio: { type: "number" }
  },


  exits: {

  },


  fn: async function (inputs, exits) {
    let req = this.req;
    let res = this.res;
    if(req.user && req.user.idtipopersona==3/*Valida que sea coordinador*/)
    {
      await Espacio.destroy({ id: inputs.idespacio});
      return exits.success();
    }else {
      // not logged in
      return res.redirect('/');
    }
    

  }


};
