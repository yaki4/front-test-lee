const validator = require('express-validator')
const Type = require('../models/types')

exports.type = async (req, res) => {
  if (req.query.id) {
    console.log('on a un type particulier', req.query)
  } else {
    // on a pas de query donc on demande tout les utilisateurs
    try {
      const types = await Type.find()
      console.log('les types', types)
      res.status(200).send({ types })
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

exports.addnewType = [
  validator.body('titre', 'Le titre est obligatoire').isLength({ min: 1 }),
  async function (req, res) {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() })
    }
    try {
      const type = new Type({
        titre: req.body.titre
      })
      const typeRec = await type.save()
      res.status(200).json({ type: typeRec })
    } catch (e) {
      res.status(500).json({ error: e })
    }
  }
]
