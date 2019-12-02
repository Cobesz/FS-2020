// Load required packages
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import router from "./router";
import ejs from "ejs";


// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/beerlocker');

const port = 3000;

// Create our Express application
const app = express();


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Use express session support since OAuth2orize requires it
app.use(session({
    secret: 'Super Secret Session Key',
    saveUninitialized: true,
    resave: true
}));

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log(`Listening on port ${port}`);
