// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id)

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database')
  }

  const db = client.db(databaseName)

  // db.collection('users').find( { name: 'Todd' }).toArray((error, user) => {
  //   if (error) {
  //     return console.log('Unable to fetch')
  //   }
  //
  //   console.log(user)
  // })

  db.collection('tasks').findOne( {_id: new ObjectID('5ceeafb52ff97e0924ab9430')}, (error, task) => {
    console.log(task)
  })

  db.collection('tasks').find( {completed: false } ).toArray((error, task) => {
    console.log(task)
  })
})
