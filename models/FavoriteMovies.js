/* Import all dependencies */
const mongoose = require('mongoose');

/* Initialise a new Scheme */
const FavoriteMoviesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    id: {
        type: Number,
        require: true
    },
    poster_path: {
        type: String
    },
    title: {
        type: String
    },
    name: {
        type: String
    },
    list_favorite: {
        type: String,
        default: 'favoris',
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('favorite', FavoriteMoviesSchema);