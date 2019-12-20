// Load required packages
import mongoose from "mongoose";
// Define our beer schema
const BeerSchema = new mongoose.Schema({
    title: String,
    type: String,
    quantity: String,
});

// Export the Mongoose model
module.exports = mongoose.model('Beer', BeerSchema);
