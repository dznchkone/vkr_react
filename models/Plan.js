const {Schema, model,Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  price: {type: String, required: true},
  description: {type: String, required:true}
})

module.exports = model('Plan', schema)