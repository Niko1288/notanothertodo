const Taski = require('../models/taski.model.js');

// Luo ja tallenna uusi merkinta
exports.luoTehtava = (req, res) => {
    //luodaan merkinta
    const taski = new Taski({
        title: req.body.title || "Ei otsikkoa",
        done: false
    });
    taski.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Ei voitu luoda uutta"
        });
    });
};

exports.haeKaikkieiValmiit = (req, res) => {
    Taski.find({'done': 'false'})
        .then(notes => {
            res.send(notes);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Ei löydetty eivalmiita"
        });
    });
};


exports.haeKaikkivalmiit =  (req, res) => {
    Taski.find({'done': 'true'})
        .then (notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Ei löydetty valmiita"
            });
    });
};



// Etsitään yksi tehtävä Id:llä
exports.haeYksi = (req, res) => {
    Taski.findById(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Tehtävää ei löytynut ID:llä " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Tehtävää ei löytynut ID:llä " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Tehtävää ei löytynut ID:llä "
        });
    });
};

// Päivitetään tehtävä Id:llä joka välitetään objectId:ssä
exports.paivita = (req, res) => {
    // Etsitään tehtävä ja päivitetään se req. bodyllä
    Taski.findByIdAndUpdate(req.params.noteId, {
        done: req.body.done
    }, {new: true})
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Tehtävää ei löytynyt ID:llä " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Tehtävää ei löytynyt ID:llä " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Virhe ID:llä päivitettäessä " + req.params.noteId
        });
    });
};


// poistetaan id:llä
exports.poista = (req, res) => {
    Taski.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Tehtävää ei löytynyt ID:llä " + req.params.noteId
                });
            }
            res.send({message: "Tehtävä poistettu!"});
        }).catch(err => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Tehtävää ei löytynyt ID:llä " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Ei pystytty poistamaan ID:llä " + req.params.noteId

        });
    });
};