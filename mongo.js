const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Provide password as argument to run this app')
  process.exit(1)
}
const password = process.argv[2]

const url = `mongodb+srv://jooseph321:${password}@cluster0.ygvpjzo.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)


if (process.argv.length === 3) {
  Person.find().then(results => {
    console.log('Phonebook: ')
    results.forEach(res => {
      console.log(`${res.name} ${res.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(() => {
    console.log(`Added ${person.name} ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}


