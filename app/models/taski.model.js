const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    done: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);
