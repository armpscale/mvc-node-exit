const mongoose = require('mongoose')

const accountSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  accountNumber: { type: String, required: true },
  accountPassword: { type: String, required: true, maxlength: 4 },
  endingBalance: { type: Number },
})

module.exports = mongoose.model('account', accountSchema)
