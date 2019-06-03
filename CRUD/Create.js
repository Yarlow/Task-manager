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
  db.collection('users').insertOne({
    _id: id,
    name: 'Yobobo',
    age: 12
  }, (error, result) => {
    if (error){
      return console.log('Unable to insert user')
    }

    console.log(result.ops)
  })

  // db.collection('users').insertMany([
  //   {
  //     name: 'Carlos',
  //     age: 300
  //   }, {
  //     name: 'Todd',
  //     age: 43
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert documents')
  //   }
  //
  //   console.log(result.ops)
  // })

  // db.collection('tasks').insertMany([
  //   {
  //     description: 'Pick a patch of pickled peppers',
  //     completed: false
  //   }, {
  //     description: 'Sell seashells by the sea shore',
  //     completed: true
  //   }, {
  //     description: 'Prove the earth is flat',
  //     completed: false
  //   }
  // ], (error, result) => {
  //   if (error) {
  //     return console.log('unable to insert documents')
  //   }
  //
  //   console.log(result.ops)
  // })


})
