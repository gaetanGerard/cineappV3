/* Import of all dependencies */
const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');


/* Initialise express */
const app = express();

// Set up a whitelist and check against it:
var whitelist = ['https://api.themoviedb.org', 'https://shrouded-plains-26891.herokuapp.com', 'http://localhost:3000', 'http://localhost:5000', 'https://shrouded-plains-26891.herokuapp.com/favicon.ico'];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

// Then pass them to cors:
app.use(cors(corsOptions));

/* Connect Database */
connectDB();

/* Initialise Middleware */
app.use(express.json({ extended: false }));

/* Define Routes */
app.use('/back/users', require('./routes/users'));
app.use('/back/auth', require('./routes/auth'));
app.use('/back/favorite', require('./routes/favorite'));

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