/* Import all dependencies */ 
const mongoose = require('mongoose');
const config = require('config');

/* initialise the connection to the DB */
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
       await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false 
        });
        
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;