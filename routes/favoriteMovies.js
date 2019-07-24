/* Import of all dependencies */
const express = require('express');
const router = express.Router();


/*  @route      GET back/favoriteMovies
    @desc       Get all favorite movies own by a specific user
    @access     Private    
*/
router.get('/', (req, res) => {
    res.send('get all favorite movies own by a specific user');
});

/*  @route      POST back/favoriteMovies
    @desc       Add a new movie to the favorite list
    @access     Private    
*/
router.post('/', (req, res) => {
    res.send('Add a new movie to the favorite');
});

/*  @route      PUT back/favoriteMovies/:id
    @desc       Add a new movie to the favorite list
    @access     Private    
*/
router.put('/:id', (req, res) => {
    res.send('update favorite list movie');
});

/*  @route      DELETE back/favoriteMovies/:id
    @desc       Delete a movie to the favorite list
    @access     Private    
*/
router.delete('/:id', (req, res) => {
    res.send('Delete movies from the favorite list');
});

module.exports = router;