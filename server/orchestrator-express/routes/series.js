const express = require('express')
const router = express.Router()
const TvShowController = require('../controller/tvCont')

router.get('/',TvShowController.getAll)
router.get('/:id',TvShowController.getOne)
router.post('/',TvShowController.createTvShow)


router.put('/:id',TvShowController.editAll)
router.delete('/:id',TvShowController.destroy)

module.exports = router