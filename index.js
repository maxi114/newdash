//require express
const express = require("express");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();

// Load environment variables
dotenv.config();

// Load in the router
const router = require('./router/post.js');
const routerr = require('./router/api.js');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/controller'));
app.use(express.static(__dirname + '/public/css'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Use router
app.use('/post', router);
app.use('/api', routerr);

// Database connection string
const db = `mongodb+srv://pro:${process.env.MongoPwd}@mycluster.pbbtvdv.mongodb.net/estatpro`;

// Connect to database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error);
    });

mongoose.connection.on('disconnected', function () {
    console.log('Successfully disconnected from MongoDB');
});

mongoose.connection.on('error', function (error) {
    console.log('An error occurred:', error);
});

// Catch-all route to serve Angular app
app.get('*', (req, res) => {
    res.sendFile(__dirname + "/public/controller/controller.html");
});

// Define port
const port = process.env.PORT || 5000;

// Listen to port
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});
