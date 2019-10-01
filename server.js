/* Import of all dependencies */
const express = require('express');
const connectDB = require('./config/db');

/* Initialise express */
const app = express();

/* Connect Database */
connectDB();

/* Initialise Middleware */
app.use(express.json({ extended: false }));


/* Set an endpoint to the server */
app.get('/', (req, res) => res.json({msg: "Welcome to the CineApp API..."}));


/* Define Routes */
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/favoriteMovies', require('./routes/favoriteMovies'));


/* set the PORT in a variable */
const PORT = process.env.PORT || 5000;


/* listening to the port */
app.listen(PORT, () =>  console.log(`Server startes on port ${PORT}`));