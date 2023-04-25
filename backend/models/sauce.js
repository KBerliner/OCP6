// Installing Dependencies

const mongoose = require('mongoose');

// Creating a blueprint for the "Sauce" object

const sauceSchema = mongoose.Schema({
    userId: String,
    name: String,
    manufacturer: String,
    description: String,
    mainPepper: String,
    imageUrl: String,
    heat: Number,
    likes: Number,
    dislikes: Number,
    usersLiked: Array,
    usersDisliked: Array
});

// Exporting the blueprint

module.exports = mongoose.model('Sauce', sauceSchema);