const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    customerName: String,
    email: String,
    dressName: String,
    bookingDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Booking", bookingSchema);