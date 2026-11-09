const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const Dress = require("./models/Dress");
const Booking = require("./models/Booking");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log("MongoDB Connected Successfully");

    // Add sample dresses if database is empty
    const count = await Dress.countDocuments();

    if (count === 0) {
        await Dress.insertMany([
            {
                name: "Cinderella Blue Dream",
                price: 8500,
                color: "Sky Blue",
                material: "Silk and Tulle",
                occasion: "Royal Party",
                image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=700",
                description: "An elegant blue ball gown.",
                designer: "Sophia",
                explanation: "Hello! I am Sophia, your fashion designer. This beautiful blue gown is inspired by fairytale elegance. It uses soft tulle and silk to create a magical flowing appearance. It is perfect for royal parties and special celebrations."
            },
            {
                name: "Rose Princess",
                price: 9500,
                color: "Pink",
                material: "Satin and Lace",
                occasion: "Birthday Party",
                image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=700",
                description: "A beautiful pink princess gown.",
                designer: "Isabella",
                explanation: "Hi! I am Isabella. This pink princess dress has a beautiful satin finish and delicate lace details. Its soft pink colour gives it a romantic fairytale appearance. It is perfect for birthday celebrations."
            },
            {
                name: "Golden Royal Queen",
                price: 12000,
                color: "Golden",
                material: "Golden Silk",
                occasion: "Wedding",
                image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700",
                description: "A luxurious golden royal gown.",
                designer: "Elizabeth",
                explanation: "Welcome! I am Elizabeth, your royal fashion expert. This golden gown is designed for a luxurious royal appearance. Its golden shade and elegant silhouette make it suitable for weddings and grand events."
            },
            {
                name: "Snow White Elegance",
                price: 7500,
                color: "White",
                material: "Organza",
                occasion: "Engagement",
                image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700",
                description: "A graceful white designer gown.",
                designer: "Ava",
                explanation: "Hello! I am Ava. This elegant white design uses lightweight organza to create a graceful look. It is a wonderful choice for engagement ceremonies and elegant occasions."
            }
        ]);

        console.log("Sample dresses added");
    }
})
.catch(error => console.log("MongoDB Error:", error.message));


// Get all dresses
app.get("/api/dresses", async (req, res) => {
    try {
        const dresses = await Dress.find();
        res.json(dresses);
    } catch (error) {
        res.status(500).json({ message: "Unable to load dresses" });
    }
});


// Add a new dress (demo admin API)
app.post("/api/dresses", async (req, res) => {
    try {
        const dress = await Dress.create(req.body);
        res.status(201).json(dress);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Save booking
app.post("/api/bookings", async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(201).json({
            message: "Booking saved successfully!",
            booking
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});