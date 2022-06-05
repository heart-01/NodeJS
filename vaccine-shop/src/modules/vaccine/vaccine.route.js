const express = require('express')
const vaccineController = require('./controllers/vaccine.controller')
const router = express.Router()

// Route Middleware จะถูกทำงานก่อนที่จะไปถึง Route ภายใน vaccine route
router.use(function timeLog (req, res, next) {
    console.log(`NOW -> ${new Date()}`)
    next()
})

// http://localhost:2001/vaccine?responsibility=70      // path query
router.get('/', vaccineController.getVaccines)
router.get('/:id', vaccineController.getVaccineById)    // path params
router.post('/', vaccineController.createVaccine)
router.put('/:id', vaccineController.updateVaccine)
router.delete('/:id', vaccineController.deleteVaccine)

module.exports = router