const mongoose = require('mongoose')

require('dotenv').config()

const url = process.env.MONGO_URI


mongoose.connect(url)

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log('error connecting to mongodb', err.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type : String,
    minLength : 3,
    required : true
  },
  number: {
    type : String,
    validate : {
      validator : function(v){
        return /\d{2,3}-\d{5,}/.test(v)
      },
      message: 'Phone number is not in valid format. Minimum 8 digit, separated by -, the first part has two or three numbers and the second part also consists of numbers'
    },
    required : [true,'phone number can\'t be empty']
  }
})


personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = mongoose.model('Person', personSchema)