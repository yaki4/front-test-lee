const { Router } = require('express')
// const config = require('../config') => SI je fait une config specifique

const router = Router()

// Initialize Controller
const typesController = require('../controllers/typesController')

// Register
router.post('/types/create', typesController.addnewType)

// Get Type
router.get('/types/type', typesController.type)

module.exports = router
