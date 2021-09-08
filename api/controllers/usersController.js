const validator = require('express-validator')
const mongoose = require('mongoose')
const User = require('../models/users')

exports.user = async (req, res) => {
  const pagin = req.query.pagination ? parseInt(req.query.pagination) * 5 : 0
  const limitResult = req.query.limit ? parseInt(req.query.limit) : 5
  if (req.query.id) {
    try {
      const user = await User.findOne({ _id: req.query.id })
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur inconnu ' })
      } else {
        return res.status(200).json({ user })
      }
    } catch (err) {
      return res.status(404).json({ message: 'Utilisateur inconnu ' })
    }
  } else if (req.query.type_id) {
    try {
      const users = await User.find({ type_id: req.query.type_id }).skip(pagin).limit(limitResult)
      const total = await User.count({ type_id: req.query.type_id })
      res.status(200).json({ users, total })
    } catch (err) {
      return res.status(500).json({ message: 'Erreur requête get user avec type_id ' + req.query.type_id })
    }
  } else {
    // on a pas de query donc on demande tout les utilisateurs
    try {
      const users = await User.find().skip(pagin).limit(limitResult)
      const total = await User.count()
      res.status(200).send({ users, total })
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
exports.userCount = async (req, res) => {
  try {
    const count = await User.count()
    res.status(200).send({ count })
  } catch (err) {
    res.status(500).json(err)
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
        type_id: req.body.type ?? '6135841afccc1046ac2006a7' // type default si pas de valeur
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
  const user = await User.findOne({ _id: id })
  if (!user) {
    return res.status(404).json({ message: 'Usager a supprimer introuvable' })
  } else {
    await user.remove((err) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors de la suppression du user', err })
      }
    })
    return res.status(200).json(user)
  }
}

exports.updateUser = [
  async function (req, res) {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() })
    }
    const id = req.params.id
    const userRef = await User.findOne({ _id: id })
    if (!userRef) {
      return res.status(404).json({ message: 'Contact inconnue' })
    } else {
      userRef.nom = req.body.user.nom ?? userRef.nom
      userRef.prenom = req.body.user.prenom ?? userRef.prenom
      userRef.telephone = req.body.user.telephone ?? userRef.telephone
      userRef.email = req.body.user.email ?? userRef.email
      userRef.type_id = req.body.user.type ?? userRef.type_id
      await userRef.save((err, user) => {
        if (err) {
          return res.status(500).json({ message: 'Erreur lors de lupdate du contact'})
        } else if (!user) {
          return res.status(404).json({ message: 'Contact inconnue' })
        }
      })
      return res.status(200).json(userRef)
    }
  }
]
