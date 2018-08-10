module.exports = (app) => {
    const notes = require('../controllers/taski.controller.js');

    // Luo uusi taski
    app.post('/taskit', notes.luoTehtava);

    // Hae kaikki taskit, joiden arvo false
    app.get('/taskit', notes.haeKaikkieiValmiit);

    // hae kaikki taskit, joiden arvo true
    app.get('/taskit/valmiit',notes.haeKaikkivalmiit)

    // Hse yksi taski Id:lla
    app.get('/taskit/:noteId', notes.haeYksi);

    // Päivitä taski Id:lla
    app.put('/taskit/:noteId', notes.paivita);

    // Poista taski Id:lla
    app.delete('/taskit/:noteId', notes.poista);
}
