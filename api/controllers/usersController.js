const User = require('../models/users')

exports.user = async (req, res, next) => {
  if (req.query.id) {
    console.log('on a un user particulier', req.query)
  } else {
    // on a pas de query donc on demande tout les utilisateurs
    try {
      const users = await User.find()
      res.status(200).send({ users })
      next()
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
