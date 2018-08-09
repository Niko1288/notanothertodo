const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    content: String,
    done: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);