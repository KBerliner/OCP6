// MongoDB User Password: oXnVRoVj0m9mfBxX
// MongoDB Connection: mongodb+srv://berlinerkyle:<password>@cluster0.eylp9cx.mongodb.net/test


// Installing Dependencies

const express = require('express');

const app = express();

const mongoose = require('mongoose');

const path = require('path');

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

app.use(express.json());

// Connecting to MongoDB

mongoose.connect('mongodb+srv://berlinerkyle:oXnVRoVj0m9mfBxX@cluster0.eylp9cx.mongodb.net/test')
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });



// Header Middleware

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// API Request Routing

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

// Export

module.exports = app;