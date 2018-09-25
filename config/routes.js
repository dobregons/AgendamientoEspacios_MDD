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
 'POST /tipoespacio': { action: 'tipoespacio/create' },
  //Home
  '/': { view: 'pages/homepage' },
  '/home': 'HomeController.home',
  //...........Auth Routes.........
    //Views
    '/login': { view: 'pages/auth/login' },
    '/register': { view: 'pages/auth/registro' },
    '/olvidarcontrasena': { view: 'pages/auth/olvidarcontrasena' },
    //Action Methos
    'GET /logout': { action: 'auth/logout' },
    'POST /login': { action: 'auth/login' },
    'POST /olvidarcontrasena': { action: 'auth/forgotpassword' },
    'POST /user': { action: 'persona/crearpersona' },
  
  //..............Reserva Routes...........
    //Views
    '/reserva': 'ReservaController.reserva',
    //Action Routes
    'GET /reserva/consultarreservaporespacio/:idespacio': 'reserva/consultarreservaporespacio',
    'POST /reserva/reservarespacio': 'persona/reservarespacio',
    'POST /reserva/borrarreserva': { action: 'reserva/borrarreserva' },
  //Espacio Routes
    //Views
    '/crearespacio': 'EspacioController.crearespacio',
    '/administrarespacios': 'EspacioController.administrarespacios',
    '/modificarespacio/:idespacio': 'EspacioController.modificarespacio',
    //Actions
    'POST /espacio': { action: 'espacio/crearespacio' },
    'POST /espacio/modificarespacio': { action: 'espacio/modificarespacio' },
    'POST /espacio/borrarespacio': { action: 'espacio/borrarespacio' },
    'POST /espacio/creardisponibilidad': 'espacio/creardisponibilidad',

  
  
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
