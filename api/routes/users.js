const { Router } = require('express')
// const config = require('../config') => SI je fait une config specifique

const router = Router()

// Initialize Controller
const usersController = require('../controllers/usersController')

// Create user
router.post('/users/create', usersController.addNewUser)

// Get User
router.get('/users/user', usersController.user)

// Delete User
router.delete('/users/:id', usersController.deleteUser)

// Update User
router.put('/users/:id', usersController.updateUser)

module.exports = router
