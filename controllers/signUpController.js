const bcrypt = require("bcrypt")
const Empleado = require("../models/empleado")
const Empleo = require("../models/empleo")

const signUp = async (req, res) => {
  const { email, password, nombre, apellido, idempleo } = req.body

  const formattedEmail = email.toLowerCase()
  const formattedNombre =
    nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase()
  const formattedApellido =
    apellido.charAt(0).toUpperCase() + apellido.slice(1).toLowerCase()

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  try {
    const newUser = await Empleado.create({
      email: formattedEmail,
      passwordhash: passwordHash,
      nombre: formattedNombre,
      apellido: formattedApellido,
      idempleo,
    })
    res.status(201).json({ id: newUser.idempleo, email: newUser.email })
  } catch (error) {
    console.error("Error durante el registro:", error)
    res.status(500).json({ error: "Error durante el registro" })
  }
}

const getAllEmpleos = async (req, res) => {
  try {
    const empleos = await Empleo.findAll()
    res.status(200).json(empleos)
  } catch (error) {
    console.error("Error al recuperar todos los empleos:", error)
    res.status(500).json({ error: "Error al recuperar todos los empleos" })
  }
}

module.exports = { signUp, getAllEmpleos }
