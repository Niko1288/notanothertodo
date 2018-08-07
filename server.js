const express = require('express');
const bodyParser = require('body-parser');

// luopaan express appi
const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

const dbConfig = require('./config/database');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url)
    .then(() => {
        console.log("Yhdistetty mongoon");
    }).catch(err => {
    console.log("Ei onnaa yhteys mongoon")
    process.exit();
});

app.get('/', (req, res) => {
    res.json({message: "Tervetuloa"})
});

//otetaan käyttöön muistioiden reitit
require('./app/routes/note.routes')(app);

module.exports = app;
