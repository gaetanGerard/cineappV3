/* Import of all dependencies */
const express = require('express');


/* Initialise express */
const app = express();


/* Set an endpoint to the server */
app.get('/', (req, res) => res.json({msg: "Welcome to the CineApp API..."}));


/* Define Routes */
app.use('/back/users', require('./routes/users'));
app.use('/back/auth', require('./routes/auth'));
app.use('/back/favoriteMovies', require('./routes/favoriteMovies'));


/* set the PORT in a variable */
const PORT = process.env.PORT || 5000;


/* listening to the port */
app.listen(PORT, () =>  console.log(`Server startes on port ${PORT}`));