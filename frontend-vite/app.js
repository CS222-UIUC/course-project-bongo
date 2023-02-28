/* ------------------------[must include]------------------------*/
const express = require("express");
const app = express();
// for dynamic websites that use express.js, this means 
// include the folder /public to search for files that 
// will be used, and the users can see. 
// e.g. for css, having a link from html won't work.
app.use(express.static("src")); 

const bodyParser = require("body-parser");
// tells express.js to use the body-parser middleware to parse 
// the request body of any incoming HTTP request, and to accept 
// nested objects in the request body if they are encoded in the 
// application/x-www-form-urlencoded format.
app.use(bodyParser.urlencoded({extended: true}));

/* ------------------------[maybe include]------------------------*/

const assert = require('assert'); // non-fatal asserts

const _ = require('lodash');

const ejs = require("ejs"); 
app.set("view engine", "ejs"); // to use ejs

const mongodb = require("mongodb");

const mongoose = require("mongoose");
mongoose.set("strictQuery", true); // to negate warning

const encrypt = require("mongoose-encryption");
/* ------------------------["mongoDB setup"]------------------------*/

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://Bradarb:YeYEnglishApp666@cluster0.wvtmui2.mongodb.net/todolistDB', {
    // optinoal specifications
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


/* ------------------------["/"]------------------------*/

app.get("/", function(req, res) {

});

// instead of 3000, we can define a dynamic port for Heroku
app.listen(process.env.PORT || 3000, function() {
	console.log("Server started")
})