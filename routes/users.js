/* Import of all dependencies */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// * Express Validator for check the validity of the value enter by the user
const { check, validationResult } = require('express-validator');

/* Require the user model from models/User */
const User = require('../models/User');


/*  @route      POST back/users
    @desc       Register a new user
    @access     Public
    @param 1    The endpoint
    @param 2    The check validation of the values enter by the user
    @param 3    the request get from the DB and the respond send by the DB 
                (its where my data will get send to the DB if its passed all the validation)   
*/
router.post('/', [
    check('pseudo', 'Un pseudo est requis').not().isEmpty(),
    check('email', 'Veuillez entrer une adresse email Valide').isEmail(),
    check('password', 'Un mot de passe est requis').not().isEmpty(),
    check('password', 'Votre mot de passe doit contenir au minimum 6 charactères').isLength({min: 6}),
    check('password', 'Votre mot de passe doit contenir au maximum 15 charactères').isLength({max: 15})
], async (req, res) => {
    const errors = validationResult(req);
    /* check if there is any errors inside the errors array */
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    
    const { fname, lname, pseudo, email, password } = req.body;

    try {
        /* Check first if this pseudo give by the new user is already save in the Database  */
        let user = await User.findOne({pseudo: pseudo});

        if(user) {
            return res.status(400).json({msg: 'Ce pseudo est déjà utiliser'});
        }

        /* If this email is not use SO hash and salt the plain text password */
        user = new User({fname, lname, pseudo, email, password});

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

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