const express = require('express') //Allows use of Express.js
const { CommandStartedEvent } = require('mongodb')
const app = express() //Stores Express.js functionality into app
const MongoClient = require('mongodb').MongoClient //Allows use of MongoDB
const PORT = 2121
require('dotenv').config() //Allows use of ENV file w MongoDB link

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'Arash'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public')) //Allows express to access anything stored in the public folder.
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (request, response)=>{
    const todoitem = await db.collection('Arash').find().toArray()
    const itemsleft = await db.collection('Arash').countDocuments({completed: false})
    response.render('index.ejs', { info: todoitem, left: itemsleft })
})

app.post('/createToDo', (request, response) => {
    db.collection('Arash').insertOne({todo: request.body.todoItem, completed: false})
    .then(result => {
        console.log('Item Added')
        response.redirect('/')
    })
    .catch(error => console.error(error))
})

app.put('/markCompleted', (request, response) => {
    db.collection('Arash').updateOne({todo: request.body.Completedd},{
        $set: {
            completed: true
          }
    })
    .then(result => {
        console.log('Completed')
        response.json('Completed')
    })
    .catch(error => console.error(error))
})

app.put('/undo', (request, response) => {
    db.collection('Arash').updateOne({todo: request.body.Undone},{
        $set: {
            completed: false
          }
    })
    .then(result => {
        console.log('Completed')
        response.json('Completed')
    })
    .catch(error => console.error(error))
})

app.delete('/deleted', (request, response) => {
    db.collection('Arash').deleteOne({todo: request.body.Gone})
    .then(result => {
        console.log('Deleted')
        response.json('Deleted')
    })
    .catch(error => console.error(error))

})

app.listen(process.env.PORT || PORT, ()=>{
    console.log('Server is running, you better catch it!')
})   