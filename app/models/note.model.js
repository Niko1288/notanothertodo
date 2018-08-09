const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    done: Boolean,
    priority: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);