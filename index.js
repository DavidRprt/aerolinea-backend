require("dotenv").config()
const { Sequelize, Model, DataTypes } = require("sequelize")
const express = require("express")
const app = express()
const cors = require("cors")
const bp = require("body-parser")

const avionRouter = require("./routes/aviones")
const aeropuertoRouter = require("./routes/aeropuertos")
const rutasRouter = require("./routes/rutas")
const clienteRouter = require("./routes/clientes")
const pasajeRouter = require("./routes/pasajes")
const reservaRouter = require("./routes/reservas")
const signUpRouter = require("./routes/signUp")
const loginRouter = require('./routes/login')
const tripulacionRouter = require("./routes/tripulacion")

app.use(cors())
app.use(express.json())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use("/api", aeropuertoRouter)
app.use("/api", avionRouter)
app.use("/api", rutasRouter)
app.use("/api", clienteRouter)
app.use("/api", pasajeRouter)
app.use("/api", reservaRouter)
app.use("/api", signUpRouter)
app.use("/api", loginRouter)
app.use("/api", tripulacionRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


