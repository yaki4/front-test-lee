const validator = require('express-validator')
const mongoose = require('mongoose')
const User = require('../models/users')

exports.user = async (req, res) => {
  if (req.query.id) {
    console.log('on a un user particulier', req.query)
  } else {
    // on a pas de query donc on demande tout les utilisateurs
    try {
      const users = await User.find()
      res.status(200).send({ users })
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

exports.addNewUser = [
  // validator for all required field
  validator.body('nom', 'Le nom est obligatoire').isLength({ min: 1 }),
  validator.body('prenom', 'Le prénom est obligatoire').isLength({ min: 1 }),
  validator.body('email').custom((value) => {
    if (!value || value.length === 0) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(new Error('Email est obligatoire'))
    } else {
      return User.findOne({ email: value }).then((user) => {
        if (user !== null) {
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject(new Error('Email déjà utilisé'))
        }
      })
    }
  }),
  validator.body('telephone', 'Le téléphone est obligatoire').isLength({ min: 1 }),
  async function (req, res) {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() })
    }
    try {
      const user = new User({
        id: new mongoose.mongo.ObjectId(),
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        telephone: req.body.telephone,
        type: req.body.type ?? 1
      })
      const userRec = await user.save()
      res.status(200).json({ user: userRec })
    } catch (e) {
      res.status(500).json({ error: e })
    }
  }
]
