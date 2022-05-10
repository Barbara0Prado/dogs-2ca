const mongoose = require ('mongoose')

const Dog = mongoose.model('Dog', {
  name: String,
  age: Number,
  weight: Number,
  approved: Boolean,
})

module.exports = Dog
