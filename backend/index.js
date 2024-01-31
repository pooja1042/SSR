const express = require('express')
const cors = require('cors')

const database = require('./models')
const appointmentApi = require('./api/AppointmentApi')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/', appointmentApi)

database.sequelize.sync().then( () => {
  app.listen(3030, () => {
    console.log("Server Running On Port 3030...");
  })
})