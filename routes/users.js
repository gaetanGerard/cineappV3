/* Import of all dependencies */
const express = require('express');
const router = express.Router();


/*  @route      POST back/users
    @desc       Register a new user
    @access     Public    
*/
router.post('/', (req, res) => {
    res.send('Register a user');
});

module.exports = router;