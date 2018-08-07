const Note = require('../models/note.model.js');

// Luo ja tallenna uusi merkinta
exports.luoTehtava = (req, res) => {
//validoidaan pyynto
    if (!req.body.content) {
        return res.status(400).send({
            message: "Sisalto ei voi olla tyhja"
        });
    }
    //luodaan merkinta
    const note = new Note({
        title: req.body.title || "Ei otsikkoa",
        content: req.body.content
    });

    note.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Jotain häslinkiä tapahtui"
        });
    });
};

exports.haeKaikki = (req, res) => {
    Note.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Jotain häslinkiä tapahtui"
        });
    });
};

// Find a single note with a noteId
exports.haeYksi = (req, res) => {

};

// Update a note identified by the noteId in the request
exports.paivita = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.poista = (req, res) => {

};