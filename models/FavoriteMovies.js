/* Import all dependencies */
const mongoose = require('mongoose');

/* Initialise a new Scheme */
const FavoriteMoviesSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    adult: {
        type: Boolean
    },
    backdrop_path: {
        type: String || null
    },
    belongs_to_collection: {
        type: null || Object
    },
    budget: {
        type: Number
    },
    genres: {
        type: Array,
    },
    id: {
        type: Number,
        require: true
    },
    imdb_id: {
        type: String
    },
    original_language: {
        type: String
    },
    original_title: {
        type: String
    },
    overview: {
        type: String
    },
    popularity: {
        type: Number
    },
    poster_path: {
        type: String
    },
    production_companies: {
        type: Array
    },
    production_countries: {
        type: Array
    },
    release_date: {
        type: String
    },
    revenue: {
        type: Number
    },
    runtime: {
        type: Number
    },
    spoken_languages: {
        type: Array
    },
    status: {
        type: String
    },
    tagline: {
        type: String
    },
    title: {
        type: String
    },
    video: {
        type: Boolean
    },
    vote_average: {
        type: Number
    },
    vote_count: {
        type: Number
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