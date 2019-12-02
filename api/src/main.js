// Load required packages
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import router from "./router";

// Connect to the beerlocker MongoDB
mongoose.connect('mongodb://localhost:27017/beerlocker');

const port = 3000;

// Create our Express application
const app = express();

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log(`Listening on port ${port}`);
