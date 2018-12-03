// ################################# initilize express ################################################
let express = require('express');
let morgan   = require('morgan');

// Import Body parser
let bodyParser = require('body-parser');
let app = express();
// Import Mongoose
require('./config/db.config')


// Import routes for routing
let apiRoutes = require("./routes/index.route")


// Configure bodyparser to handle post requests
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'})); 
app.use(morgan('dev'));




// ################################# SET UP Server and Run ################################################
let port = process.env.PORT || 8080;
// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));
// Use Api routes in the App
app.use('/api', apiRoutes)
// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running API on port " + port);
});