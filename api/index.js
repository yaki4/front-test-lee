const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// Create express instance
const app = express()

// Register cors
app.use(cors({ origin: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://front-test-lee.vercel.app' }))
// Init body-parser options (inbuilt with express)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Require & Import API routes
const users = require('./routes/users')
const types = require('./routes/types')
// Use API Routes
// console.log('first route')
app.use(users)
app.use(types)

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/test')
  .then(() => {
    console.log('connect to mongoose')
  })
  .catch((err) => {
    console.log('erreur connextion db', err)
  })
// Export the server middleware
module.exports = {
  path: '/api',
  handler: app
}
