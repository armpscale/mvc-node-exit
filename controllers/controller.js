const mongoose = require('mongoose')
const model = require('../models/model')

exports.getData = (req, res, next) => {
  model
    .find()
    .exec()
    .then(result => {
      res.status(200).json({
        test: "test"
      })
    })
    .catch(err => {})
}
