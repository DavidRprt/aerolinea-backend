require("dotenv").config()
const { Sequelize, Model, DataTypes } = require("sequelize")
const express = require("express")
const app = express()
const cors = require("cors")

const avionRouter = require("./routes/aviones")
const aeropuertoRouter = require("./routes/aeropuertos")
const rutasRouter = require("./routes/rutas")
app.use(cors())

app.use("/api", aeropuertoRouter)
app.use("/api", avionRouter)
app.use("/api", rutasRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


