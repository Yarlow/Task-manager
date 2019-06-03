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

// db.collection('users').updateOne({
//     _id: new ObjectID('5ceeacba99eda50c54d1c018')
//   }, {
//     $set: {
//       name: 'Mike'
//     },
//   }).then((result) => {
//     console.log(result)
//   }).catch((error) => {
//     console.log(error)
//   })

db.collection('tasks').updateMany({
  completed: true
  }, {
    $set: {
      completed: false
    }
  }).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  })

})
