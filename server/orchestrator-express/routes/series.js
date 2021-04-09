const express = require('express')
const route = express.Router()
const TvShowController = require('../controller/tvCont')

route.get('/',TvShowController.getAll)
route.get('/:id',TvShowController.getOne)
route.post('/',TvShowController.createTvShow)


route.put('/:id',TvShowController.editAll)
route.delete('/:id',TvShowController.destroy)

module.exports = route 