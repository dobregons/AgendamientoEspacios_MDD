module.exports = {


    friendlyName: 'Enviarcorreo',


    description: 'Enviarcorreo clienteemail.',


    inputs: {
        nombres: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        espacio:
        {
            type: "string"
        }
    },


    exits: {
        
    },


    fn: function (inputs, exits) {
        let req = this.req;
        let res = this.res;

        //If inputs are null or empty
        if (!inputs.email || !inputs.nombres || !inputs.espacio)
            return res.badRequest();

        var correo = new Object()
        correo.email = inputs.email;
        correo.nombres = inputs.nombres;
        correo.espacio = inputs.espacio;

        Mailer.enviarCorreoReservaCancelada(correo);  // <= Here we using
        res.json(200, { correo: correo });
        return exits.success();

    }


};
