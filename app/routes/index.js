var express = require('express');                           // load express
var router = express.Router();                              // set 'router' variable to the express router
var middleware = require('../controllers/middleware');

// create a route that will return the simple form
router.get('/', middleware.listDocuments);

// if someone tries to go to the simple form in browser, we'll return the blank form
router.get('/simpleForm', middleware.listDocuments);

// process anything from browser that POSTs back to /simpleForm
router.post('/simpleForm', middleware.addDocument);

// export the router so other code can use it
module.exports = router;
