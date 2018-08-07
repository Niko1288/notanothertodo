
// täällä siis kaikki reitit, joita sovellus käyttää

var express = require('express')
var todoRoutes = express.Router()
var taski = require('./taski')

// haetaan kaikki todos jotka ovat tietokannassa

todoRoutes.route('/kaikki')
    .get(function (req, res) {
        taski.find(function (err, tehtavat) {
            if (err) {
                throw(err)
            }
            res.json(tehtavat) // palauttaa kaikki tehtävät
        })
    })

// create a todo item
todoRoutes.route('/add').post(function (req, res) {
    taski.create(
        {
            name: req.body.name,
            done: false
        },
        function (error, todo) {
            if (error) {
                res.status(400).send('Unable to create todo list')
            }
            res.status(200).json(todo)
        }
    )
})

module.exports = todoRoutes