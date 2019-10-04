/* Import of all dependencies */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
// * Express Validator for check the validity of the value enter by the user
const { check, validationResult } = require('express-validator');

/* Require the user model from models/User */
const User = require('../models/User');


/*  @route      GET back/auth
    @desc       Get logged in user
    @access     Private
    @param 1    The endpoint
    @param 2    check in middleware/auth if the token is verify if so continue if not send a message    
*/
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/*  @route      POST back/auth
    @desc       Auth user & get token
    @access     Public
    @param 1    The endpoint
    @param 2    The check validation of the values enter by the user
    @param 3    the request get from the DB and the respond send by the DB 
                (its where my data will get send to the DB if its passed all the validation)     
*/
router.post('/', [
    check('pseudo', 'Nom d\'utilisateur incorrect ou inexistant').exists(),
    check('password', 'Votre mot de passe est requis').exists()
], async (req, res) => {
    const errors = validationResult(req);
    /* check if there is any errors inside the errors array */
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const { pseudo, password } = req.body;

    try {
        /* look if the email enter by the user match to the email store in the Database */
        let user = await User.findOne({pseudo});

        if(!user) {
            return res.status(400).json({msg: 'Vous n\'êtes pas autoriser'});
        }

        /* Check if the hash password match to the password enter by the user */
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({msg: 'Vous n\'êtes pas autoriser'});
        }

         /* assign in a variable the payload require for the token */
         const payload = {
            user: {
                id: user.id
            }
        };

        /*  @desc       Generate a token
            @param 1    The payload
            @param 2    The the secret get from the config file
            @param 3    an object where is store the expires date 
            @param 4    an arrow function for check if an error occured and complete the token generation               
        */
        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 360000
        }, (err, token) => {
            if(err) throw err;
            res.json({ token });
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;