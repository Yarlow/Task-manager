const express = require('express')
require('./db/mongoose');
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/users')
const taskRouter = require('./routers/tasks')


const app = express()
const port = process.env.PORT || 3000
const maintenanceMode = false

// app.use((req, res, next) => {
//   if (req.method === 'GET'){
//     res.send('GET requests are disabled')
//   } else{
//     next()
//   }
// })
//
// app.use((req, res, next) => {
//   if (maintenanceMode){
//     res.status(503).send('Site is under maintenance')
//   } else next()
//
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
