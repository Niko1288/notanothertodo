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

// etsitään yksi note with a noteId
exports.haeYksi = (req, res) => {
    Note.findById(req.params.noteId)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Ei löytynyt tehtävää seuraavalla id:llä " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Ei löytynyt tehtävää seuraavalla id:llä  " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "virhe haettaessa tehtävää id:llä " + req.params.noteId
        });
    });
};

// Update a note identified by the noteId in the request
exports.paivita = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Sisältöä ei voi jättää tyhjäksi"
        });
    }

    // Find note and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitled Note",
        content: req.body.content
    }, {new: true})
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send(note);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });
};


// Delete a note with the specified noteId in the request
exports.poista = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if(!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send({message: "Note deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });

};