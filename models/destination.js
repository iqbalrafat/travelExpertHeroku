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
// Step 1: Define our Schema
// See: https://mongoosejs.com/docs/guide.html
/*
"Everything in Mongoose starts with a Schema. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection."
*/
const gallerySchema = new mongoose.Schema({
    id: Number,
    title: String,
    source: String,
    fileName: String,
    description: String,
    link: String,
    detail: String
});

// Compile and export our model using the above Schema.
// See: https://mongoosejs.com/docs/models.html 

module.exports = mongoose.model('Destination', gallerySchema);
// Important: The first argument of mongoose.model() is the singular name of the collection your model is for. 
// ** Mongoose automatically looks for the plural, lowercase version of your model name. **"
// In our example, we name our model 'Destination' and mongoose will automatically look for the collection 'definitions'