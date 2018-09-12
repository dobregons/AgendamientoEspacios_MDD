/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'pages/homepage'
  },
  '/home': 'HomeController.home',

  'POST /tipoespacio': { action: 'tipoespacio/create' },
  //Auth Routes
  'GET /login': { view: 'pages/auth/login' },
  'GET /register': { view: 'pages/auth/registro' },
  'GET /reserva/consultarreservaporespacio/:idespacio': 'reserva/consultarreservaporespacio',
  'POST /login': 'AuthController.login',
  'POST /user': 'persona/crearpersona',
  '/logout': 'AuthController.logout',
  '/olvidarcontrasena' : { view: 'pages/auth/olvidarcontrasena' },
  'POST /olvidarcontrasena' : 'AuthController.forgotpassword',
  //Reserva Routes
  '/reserva' : 'ReservaController.reserva',
  'POST /coordinador/creardisponibilidad': 'coordinado/creardisponibilidad',
  //Espacio Routes
  '/crearespacio' : 'EspacioController.crearespacio',
  'GET espacio//modificarespacio/:idespacio' :'EspacioController.modificarespacio',
  'POST /espacio': { action: 'coordinador/crearespacio' },
  'POST espacio//modificarespacio': { action: 'coordinador/crearespacio' },
  //Email routes
  'POST /enviarcorreoreservarealizada': { action: 'clienteemail/enviarcorreoreservarealizada' },
  'POST /enviarcorreoreservacancelada': { action: 'clienteemail/enviarcorreoreservacancelada' },
  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝



  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝


  //  ╔╦╗╦╔═╗╔═╗
  //  ║║║║╚═╗║
  //  ╩ ╩╩╚═╝╚═╝


};
