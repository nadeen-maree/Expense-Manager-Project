const express = require('express')
const app = express()
const api = require('./server/routes/api')
const bodyParser = require('body-parser')
const Expense = require('./server/model/Expense')
const data = require('./expenses.json') 
const path = require('path')

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))

const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/expensesDB", {
  useNewUrlParser: true,
}).catch((err)=> console.log(err))

app.use('/', api)

// Expense.insertMany(data)
//     .then((result) => {
//       console.log('Data added:', result)

//       app.use('/api', api)
//       const PORT = process.env.PORT || 3000
//       app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`)
//       })
//     })
//     .catch((err) => {
//       console.error('Error adding data:', err)
//     })

const port = 3000
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})