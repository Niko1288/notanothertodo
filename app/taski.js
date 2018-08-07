var mongoose = require('mongoose')

var todo = new mongoose.Schema({
        name: {
            type: String
        },

        done: {
            type: Boolean
        }
    },
    {
        collection: 'tasks'
    })

module.exports = mongoose.model('taski', todo)
