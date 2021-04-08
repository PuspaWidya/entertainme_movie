const express = require('express')
const route = express.Router()
const movieController = require('../controllers/MovieCont')

route.get('/',movieController.getAll)
route.get('/:id',movieController.getOne)
route.post('/',movieController.createMovie)


route.put('/:id',movieController.editAll)
route.delete('/:id',movieController.destroy)

module.exports = route 