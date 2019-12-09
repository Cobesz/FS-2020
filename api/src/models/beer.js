// Load required packages
import mongoose from "mongoose";
// Define our beer schema
const BeerSchema = new mongoose.Schema({
    items: [{
        name: String,
        type: String,
        quantity: String,
    }],
    _links: {
        self: {
            href: String
        }
    },
    pagination: String
});

// Export the Mongoose model
module.exports = mongoose.model('Beer', BeerSchema);
