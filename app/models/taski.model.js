const mongoose = require('mongoose');

const TaskiSchema = mongoose.Schema({
    title: String,
    done: Boolean,
    priority: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', TaskiSchema);
