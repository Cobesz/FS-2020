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

// Use the body-parser package in our application
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// app.use(cors());

app.use(paginate.middleware(1, 50));
// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log(`Listening on port ${port}`);
