const express = require('express')
const router = express.Router()
const entertainRoutes = require('./entertaiRoutes')
const movieRoutes = require('../routes/movie')
const series = require('./series')

router.use('/entertain',entertainRoutes)
router.use('/movies',movieRoutes)
router.use('/series',series)

module.exports = router