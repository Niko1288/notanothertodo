var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/tododb'

MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
    if (err != null) {
        console.error("Virhe yhteyden avaamisessa!" + err.message);
        throw err;
    }
    const dbo = db.db();
    console.log("Yhteys Mongoon saatu");
    const kokoelma = dbo.collection('tasks');

});

module.exports = router;
