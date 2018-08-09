const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    done: false
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);