const mongoose = require("mongoose");

const dressSchema = new mongoose.Schema({
    name: String,
    price: Number,
    color: String,
    material: String,
    occasion: String,
    image: String,
    description: String,
    designer: String,
    explanation: String
});

module.exports = mongoose.model("Dress", dressSchema);