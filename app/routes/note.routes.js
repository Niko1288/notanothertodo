module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/notes', notes.luoTehtava);

    // Retrieve all Notes
    app.get('/notes', notes.haeKaikkieiValmiit);

    app.get('/notes/valmiit',notes.haeKaikkivalmiit)

    // Retrieve a single Note with noteId
    app.get('/notes/:noteId', notes.haeYksi);

    // Update a Note with noteId
    app.put('/notes/:noteId', notes.paivita);

    // Delete a Note with noteId
    app.delete('/notes/:noteId', notes.poista);
}
