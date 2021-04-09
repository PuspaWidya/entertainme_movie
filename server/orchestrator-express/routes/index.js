const express = require('express')
const router = express.Router()
const entertainRoutes = require('./entertaiRoutes')
const movieRoutes = require('../routes/movie')
const series = require('../routes/series')

router.use('/entertain',entertainRoutes)
router.use('/movie',movieRoutes)
router.use('/series',movieRoutes)

module.exports = router