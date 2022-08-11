const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())

const fs = require('fs').promises

const databaseFileName = 'db.json'

const readDatabase = 
  async () => JSON.parse(await fs.readFile(databaseFileName))
const database = {}
readDatabase().then(data => {
  Object.assign(database, data)
  console.log('Database has been loaded')
})
const saveDatabase = async () => 
  await fs.writeFile(databaseFileName, JSON.stringify(database, null, 2))

app.get('/:kind/:id',(req, res, next) => {
  const kind = database[req.params.kind]
  if (!kind) {
    res.status(404).send(`Sorry I don't know what a ${req.params.kind} is`)
    next()
    return 
  }

  const item = kind[req.params.id]
  if (!item) {
    res.status(404).send(`Sorry I don't have a ${req.params.kind} with id ${req.params.id}`)
    next()
    return 
  }
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(item, null, 2))
})

app.patch('/:kind/:id', (req, res, next) => {
  const kind = database[req.params.kind]
  if (!kind) {
    res.status(404).send(`Sorry I don't know what a ${req.params.kind} is`)
    next()
    return 
  }

  const item = kind[req.params.id]
  if (!item) {
    res.status(404).send(`Sorry I don't have a ${req.params.kind} with id ${req.params.id}`)
    next()
    return 
  }
  console.log('Patching ', req.params.id, 'with', req.body)
  const patch = req.body
  Object.assign(item, patch)
  saveDatabase().then(_ => {
    res.json(item)
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`listening on port ${ port }...`)
})
