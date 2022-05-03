//Initial configuration
const express = require ('express')
const mongoose = require ('mongoose')
const app = express ()

//Reading JSON // middlewares
app.use(
  express.urlencoded ({
    extended: true
  })
)

app.use(express.json ())

// Endpoint
app.get ('/',  (req, res) => {

//Show req

res.json ({message: 'Hi Express!' })
})

// Port to be accessed
const DB_USER ='barbara'
const DB_PASSWORD = encodeURIComponent ('dogsapi123')

mongoose.connect (
  `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.mjkcp.mongodb.net/databaseApi?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log ('We are connected to MongoDB!')
    app.listen (3000)

  })
  .catch((err) => console.log(err))

app.listen(3000)