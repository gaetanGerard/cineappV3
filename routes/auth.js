/* Import of all dependencies */
const express = require('express');
const router = express.Router();


/*  @route      GET back/auth
    @desc       Get logged in user
    @access     Private    
*/
router.get('/', (req, res) => {
    res.send('get a logged in user');
});

/*  @route      POST back/auth
    @desc       Auth user & get token
    @access     Public    
*/
router.post('/', (req, res) => {
    res.send('Log in user');
});

module.exports = router;