require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const person = require('./models/person')
const app = express()
app.use(express.json())
app.use(cors())
require('dotenv').config()
morgan.token('type', (req) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))
app.use(express.static('dist'))


app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons)
  }).catch(err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  }).catch(err => next(err))
})

app.get('/info', (req, res, next) => {
  Person.find({}).then(personArray => {
    const length = personArray.length
    const now = new Date()
    let info = `
      <p>Phonebook has info for ${length} people </p>
      <br>
      ${now}`
    res.send(info)
  }).catch(err => next(err))

})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(err => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const { body } = req

  const person = new Person({
    name: body.name,
    number: body.number
  })

  let err = person.validateSync()
  if(err){
    return next(err)
  }

  person.save().then(savedPerson => {
    res.json(savedPerson)
  }).catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const { number } = req.body


  const testPerson = new Person({
    name: 'test12345',
    number
  })

  console.log('test person ', testPerson)
  let err = testPerson.validateSync()
  if(err){
    return next(err)
  }

  let newPerson = {
    number
  }
  person.findOneAndUpdate({ _id: req.params.id }, newPerson, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })

  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})