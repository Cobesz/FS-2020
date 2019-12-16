// Load required packages
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import router from "./router";
import cors from "cors";
import paginate from "express-paginate";
// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/beerlocker');

const port = 8000;

// Create our Express application
const app = express();

// Zorgt ervoor dat CORS en de bijhorende allows in orde zijn
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
    next();
});

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



app.use(cors());

app.use(paginate.middleware(10, 50));
// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log(`Listening on port ${port}`);
