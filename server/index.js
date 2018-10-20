const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const Rental = require('./models/rental');
const FakeDb = require('./fake-db');
const bodyParser = require('body-parser');

//Routes imports
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');

mongoose.connect(config.DB_URI, { useNewUrlParser: true })
    .then((success) => {
        // const fakeDb = new FakeDb();
        // fakeDb.seedDb();
    });

const app = express();

app.use(bodyParser.json());

// middlewares
app.use('/api/v1/rentals',rentalRoutes);
app.use('/api/v1/users',userRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT,() => {
    console.log(`server is running is on PORT ${PORT}`)
});