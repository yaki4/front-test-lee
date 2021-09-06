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
        type_id: req.body.type ?? '6135841afccc1046ac2006a7'
      })
      const userRec = await user.save()
      res.status(200).json({ user: userRec })
    } catch (e) {
      res.status(500).json({ error: e })
    }
  }
]

exports.deleteUser = async function (req, res) {
  const id = req.params.id
  await User.findByIdAndRemove(id, (err, user) => {
    if (err || !user) {
      return res.status(500).json({ message: 'Erreur lors de la suppression du user', err })
    }
    return res.status(200).json(user)
  })
}

exports.updateUser = [
  // on reverif les data ?
  // validator.body('nom', 'Le nom est obligatoire').isLength({ min: 1 }),
  // validator.body('prenom', 'Le prénom est obligatoire').isLength({ min: 1 }),
  // validator.body('email').custom((value) => {
  //   if (!value || value.length === 0) {
  //     // eslint-disable-next-line prefer-promise-reject-errors
  //     return Promise.reject(new Error('Email est obligatoire'))
  //   } else {
  //     return User.findOne({ email: value }).then((user) => {
  //       if (user !== null) {
  //         // eslint-disable-next-line prefer-promise-reject-errors
  //         return Promise.reject(new Error('Email déjà utilisé'))
  //       }
  //     })
  //   }
  // }),
  // validator.body('telephone', 'Le téléphone est obligatoire').isLength({ min: 1 }),
  async function (req, res) {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() })
    }
    const id = req.params.id
    await User.findOneAndUpdate({ _id: id }, async function (err, user) {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la suppression du contact'})
      } else if (!user) {
        return res.status(404).json({ message: 'Contact inconnue' })
      }
      user.nom = req.body.nom ?? user.nom
      user.prenom = req.body.prenom ?? user.prenom
      user.telephone = req.body.telephone ?? user.telephone
      user.email = req.body.email ?? user.email
      user.type_id = req.body.type_id ?? user.type_id
      await user.save((err, user) => {
        if (err) {
          return res.status(500).json({ message: 'Erreur lors de la suppression du contact'})
        } else if (!user) {
          return res.status(404).json({ message: 'Contact inconnue' })
        }
      })
      return res.status(200).json(user)
    })
  }
]
