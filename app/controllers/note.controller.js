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
        content: req.body.content,
        done: false
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

// Etsitään yksi tehtävä Id:llä
exports.haeYksi = (req, res) => {
    Note.findById(req.params.noteId)
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
    //Validoidaan pyyntö
    if (!req.body.content) {
        return res.status(400).send({
            message: "Tehtävä ei voi olla tyhjä sisällöltään"
        });
    }
    // Etsitään tehtävä ja päivitetään se req. bodyllä
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Tehtävällä ei ole nimeä",
        content: req.body.content
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


// Delete a note with the specified noteId in the request
exports.poista = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
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