
// Initialize express router
let router = require('express').Router();
let express = require('express');
let app   = express();
var jwt    = require('jsonwebtoken');
var config = require('../config/db.config');
app.set('superSecret', config.secret);

//############################################Import controllers here ################################
var contactController = require('../controller/contact.controller');
var userController = require('../controller/user.auth');
var employeeController = require('../controller/employee.controller');
var employee = require('../controller/employeeCollection');
//############################# Routing without JWT Tokens ##########################################

// user signup
router.route('/models/userSign').post(userController.new);

//User Login to generate TOKEN login
router.route('/models/userLogin').post(userController.login);


//##############################  JWT Based Authentication #########################################

router.use(function(req, res, next) {
 

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    // decode token
    if (token) {
    // verifies secret and checks exp
    console.log(app.get('superSecret'));
      jwt.verify(token, app.get('superSecret'), function(err, decoded) {  
         if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });  
             } else {
            // if everything is good, save to request for use in other routes
                req.decoded = decoded; 
                next();
            }
      });
  
    } else {
  
      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
  
    }
  });
//################################################### Router after Authenticaion #######################################
// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.new);
router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);


//################################################### employee (SCHEMA MODEL) controller apis ##########################################

router.route('/models/employees') 
.get(employeeController.index)
.post(employeeController.add);

router.route('/models/employeeDetail/:emp_id')
    .get(employeeController.view)
    .patch(employeeController.update)
    .put(employeeController.update)
    .delete(employeeController.delete);


//################################################### employee (Collection Based call ) controller apis ##########################################

router.get('/collection/employees/:id/report',employee.findByManager) 
router.get('/collection/employees/:id', employee.findById);
router.get('/collection/employees', employee.findAll);
// Export API routes
module.exports = router;