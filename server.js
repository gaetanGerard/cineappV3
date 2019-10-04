/* Import of all dependencies */
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');


/* Initialise express */
const app = express();

/* Connect Database */
connectDB();

/* Initialise Middleware */
app.use(express.json({ extended: false }));

/* Define Routes */
app.use('https://cors-anywhere.herokuapp.com//back/users', require('./routes/users'));
app.use('https://cors-anywhere.herokuapp.com//back/auth', require('./routes/auth'));
app.use('https://cors-anywhere.herokuapp.com//back/favorite', require('./routes/favorite'));

/* Server static asstets in production */
if(process.env.NODE_ENV === 'production') {
    // set a static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}


/* set the PORT in a variable */
const PORT = process.env.PORT || 5000;


/* listening to the port */
app.listen(PORT, () =>  console.log(`Server startes on port ${PORT}`));