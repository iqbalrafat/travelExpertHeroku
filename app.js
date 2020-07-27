//Import require modules
const express    = require ('express');
const app        = express();
const path       = require ('path');
const ejs        = require('ejs');
const cors       = require ('cors');
const dotenv     = require ('dotenv').config();
const ejsLayout  = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const moment = require('moment');
//import models. It can be define here but the best practice to define separately
const Destination = require('./models/destination.js');

// secured the credentials
const mongoDB = process.env.MONGODB_URL;

// making default connection that is a promise
mongoose.connect(mongoDB, 
{
  useUnifiedTopology: true,
  useNewUrlParser: true
})
  .then(()=>console.log('db connected..!'))
  .catch(()=>console.log("error in connecting database"));

//set up cross browser access
app.use(cors());
//to display to common task in different ejs file
app.use(ejsLayout);

//setup ejs and view folder
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

//setup the default static file folder. Will check the file existence on request.
app.use(express.static(path.join(__dirname,'public')));
app.get('/',(req,res)=>{
  res.render('index',{});
})
app.get('/login',(req,res)=>{
  res.render('login',{});
})
app.get('/signup',(req,res)=>{
  res.render('signup',{});
})

app.get('/api/getYear', (req,res)=>{
  res.json({year: moment().format("yyyy")})
})


// Define an endpoint handler for the individual animal pages
app.get('/:id', function(req, res){

  // model.findOne returns the first object it finds
  // model.find will always return an array, even if it only finds one 
  Destination.findOne({'id': req.params.id}, function(error, destination) {
   // Check for IDs that are not in our list
    if (!destination) {
      res.render('pagenotfound', {});
    }
   // Compile view and respond
    res.render('destinationSingle',destination);
  });
})

app.get('/api/destinations', function(req, res){

//getting data from database. Destination is model. the data come in javascript format
  Destination.find(function(error, destinations) { 
  res.json(destinations);
  });

})

// if no file or endpoint found, send a 404 error as a response to the browser
app.use(function(req, res, next) {
  res.status(404);
  // res.send('404: File Not Found');
  res.render('pagenotfound', {});
});

const port=process.env.DEV_PORT || 3002
app.listen(port,()=>{
    console.log(`server is running on port: ${port}`)
})