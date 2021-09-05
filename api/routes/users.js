const { Router } = require('express')
// const config = require('../config') => SI je fait une config specifique

const router = Router()

// Initialize Controller
const usersController = require('../controllers/usersController')

// Register
// router.post('/users/register', usersController.register)

// Get User
router.get('/users/user', usersController.user)

module.exports = router
