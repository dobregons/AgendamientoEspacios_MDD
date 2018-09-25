module.exports = {


  friendlyName: 'Obtenerpersonaporid',


  description: 'Obtenerpersonaporid persona.',


  inputs: {

  },


  exits: {

  },


  fn: function (inputs, exits) {
    Persona.findOne({ id: req.user.id }, function (err, persona) {
      if ((err) || (!persona)) {
          return res.send({ err });
      }
      return res.view("pages/modificarespacio", {
          persona: persona,
      });
    });
    

  }


};
