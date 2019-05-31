const mongoose = require('mongoose')
const model = require('../models/model')

exports.getData = (req, res, next) => {
  model
    .find()
    .exec()
    .then(result => {
      res.render("index", { test: "Hello World" })
    })
    .catch(err => { })
}
