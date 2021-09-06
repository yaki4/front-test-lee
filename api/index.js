const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// Create express instance
const app = express()

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test')
  .then(() => {
    console.log('connect to mongoose')
  })
  .catch((err) => {
    console.log('erreur connextion db', err)
  })

// Register cors
app.use(cors({ origin: 'http://localhost:8080' }))
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
