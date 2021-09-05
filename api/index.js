const express = require('express')
// eslint-disable-next-line no-unused-vars
const db = require('./db')

// Create express instance
const app = express()

// Init body-parser options (inbuilt with express)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Require & Import API routes
const users = require('./routes/users')

// Use API Routes
app.use(users)

// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
