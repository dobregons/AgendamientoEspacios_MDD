module.exports = {


  friendlyName: 'Create',


  description: 'Create tipoespacio.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs, exits) {
    try 
    {
      var idtipoespacio = inputs.idtipoespacio;
      var a = this.req.body.idtipo;
      var abc = await Tipoespacio.findOne({ id: 1 }); 
      return exits.success({abc});
    } 
    catch (error) 
    {
      return res.serverError(err);
    }
    
  }

};
