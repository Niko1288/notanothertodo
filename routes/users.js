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

    router.route('/')
        .get(function (req, res) {
            kokoelma.find({}).toArray().then((result) => {
                console.log(res);
                res.json(result);
            }).catch(function (err) {
                console.log(err.stack);
            });
        })
        .post((req, res) => {
            kokoelma.save(req.body, (err, result) => {
                if (err) return console.log(err);
                console.log('saved to database');
                res.redirect('/')
            })
        })
        .delete((req, res) => {
            kokoelma.findOneAndDelete({name: req.body.name},
                (err, result) => {
                    if (err) return res.send(500, err);
                    res.send({message: 'object deleted'})
                })
        })
});

module.exports = router;
