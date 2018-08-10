const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// luodaan express appi
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

const dbConfig = require('./config/database');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, { useNewUrlParser: true })
    .then(() => {
        console.log("Yhdistetty mongoon");
    }).catch(err => {
    console.log("Ei onnaa yhteys mongoon")
    process.exit();
});
app.use(express.static('front-end'));

app.get('/', (req, res) => {
    res.json({message: "Tervetuloa"})
});

//otetaan käyttöön muistioiden reitit
require('./app/routes/taski.routes')(app);

module.exports = app;
