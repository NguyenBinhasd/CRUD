const express = require('express');
const route = express.Router();

//call services, services de get
const services = require('../services/render');
//controller de lam cac tac vu khacc nhu post,...
const controller = require('../controller/controller');


//get services vaf render ra
route.get('/', services.homeRoutes);
route.get('/add-user', services.addRoutes);
route.get('/update-user', services.updateRoutes);

//test api
route.post('/control/users', controller.create);
route.get('/control/users', controller.find);
route.put('/control/users/:id', controller.update);
route.delete('/control/users/:id', controller.delete);


module.exports = route;