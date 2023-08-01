const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const connection = require('./config/connection')
const PORT = 8080

connection.authenticate()
    .then(() => {
        connection.sync()
            .then(() => {
                console.log("Synced db.")
            })
            .catch((err) => {
                console.log("Failed to sync db: " + err.message)
            })
        console.log('Connection has been established successfully.')
    }).catch((error) => {
        console.error('Unable to connect to the database: ', error)
    })


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', require('./routes/api'))

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
