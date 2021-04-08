const express = require('express')
const router = express.Router()
const entertainRoutes = require('./entertaiRoutes')

router.use('/entertain',entertainRoutes)


module.exports = router