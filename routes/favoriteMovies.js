/* Import of all dependencies */
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
// * Express Validator for check the validity of the value enter by the user
const { check, validationResult } = require('express-validator');

/* Require the user model from models/User */
const User = require('../models/User');
const FavoriteMovies = require('../models/FavoriteMovies');


/*  @route      GET back/favoriteMovies
    @desc       Get all favorite movies own by a specific user
    @access     Private
    @param1     The endpoint
    @param2     The auth private   
    @param3     function for tryCatch the request and respond 
*/
router.get('/', auth, async (req, res) => {
    try {
        const favorite = await FavoriteMovies.find({ user: req.user.id }).sort({date: -1 });
        res.json(favorite);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/*  @route      GET back/favoriteMovies/listName
    @desc       Get all favorite movies save on a specific favorite list own by a specific user
    @access     Private
    @param1     The endpoint
    @param2     The auth private   
    @param3     function for tryCatch the request and respond 
*/
router.get('/listName', auth, async (req, res) => {

    

    try {
        const {list_favorite} = req.body;
        const list = await FavoriteMovies.find({user: req.user.id, list_favorite: list_favorite.toLowerCase()});

        res.json(list);
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/*  @route      POST back/favoriteMovies
    @desc       Add a new movie to the favorite list
    @access     Private
    @param1     The endpoint
    @param2     The auth private   
    @param3     function for tryCatch the request and respond    
*/
router.post('/', auth, async (req, res) => {
    const {
        adult, 
        backdrop_path, 
        belongs_to_collection, 
        budget, 
        genres, 
        id, 
        imdb_id, 
        original_language, 
        original_title,
        overview, 
        popularity, 
        poster_path, 
        production_companies, 
        production_countries, 
        release_date, 
        revenue, runtime, 
        spoken_languages,
        status, 
        tagline, 
        title, 
        video, 
        vote_average,
        vote_count,
        list_favorite} = req.body;

    try {
        const newFavoriteMovie = new FavoriteMovies({
            adult, 
            backdrop_path, 
            belongs_to_collection, 
            budget, 
            genres, 
            id, 
            imdb_id, 
            original_language, 
            original_title,
            overview, 
            popularity, 
            poster_path, 
            production_companies, 
            production_countries, 
            release_date, 
            revenue, 
            runtime, 
            spoken_languages,
            status, 
            tagline, 
            title, 
            video, 
            vote_average, 
            vote_count,
            list_favorite: list_favorite !== undefined ? list_favorite.toLowerCase() : "favoris",
            user: req.user.id
        });

        const favoriteMovie = await newFavoriteMovie.save();

        res.json(favoriteMovie);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/*  @route      PUT back/favoriteMovies/:id
    @desc       Update the favorite name of a movie 
    @access     Private    
*/

router.put('/:id', auth, async (req, res) => {
    const {list_favorite} = req.body;

    /* build a favorite movie object */
    const favoriteField = {};
    if(list_favorite) favoriteField.list_favorite = list_favorite.toLowerCase();

    try {
        let favorite = await FavoriteMovies.findById(req.params.id);

        if(!favorite) return res.status(404).json({msg: 'Liste de favoris introuvable'});

        /* Make sure user own Favorite */
        if(favorite.user.toString() !== req.user.id) {
            return res.status(401).json({msg: "Pas d'autorisation"});
        }

        favorite = await FavoriteMovies.findByIdAndUpdate(req.params.id, {$set: favoriteField}, {new: true});

        res.json(favorite);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/*  @route      DELETE back/favoriteMovies/:id
    @desc       Delete a movie to the favorite list
    @access     Private    
*/
router.delete('/:id', auth, async (req, res) => {
    try {
        /* The id is not the id from the TMDB api movie but the one generate when a movie is added to the favorite list */
        let favoriteMovie = await FavoriteMovies.findById(req.params.id);

        if(!favoriteMovie) return res.status(404).json({msg: 'Film introuvable'});

        /* Make sure the user owns the movie */
        if(favoriteMovie.user.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Vous n\'êtes pas autorisé a effectuer cet action'});
        }

        console.log(favoriteMovie);
        await FavoriteMovies.findByIdAndRemove(req.params.id);

        res.json({msg: 'Film supprimer de votre liste de favoris'});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;