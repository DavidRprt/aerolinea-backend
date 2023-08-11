const bcrypt = require("bcrypt")
const Empleado = require("../models/empleado")

const signUp = async (req, res) => {
  const { email, password, nombre, apellido, idempleo } = req.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  try {
    const newUser = await Empleado.create({
      email,
      passwordhash: passwordHash,
      nombre,
      apellido,
      idempleo, 
    })
    res.status(201).json({ id: newUser.idempleo, email: newUser.email })
  } catch (error) {
    console.error("Error durante el registro:", error)
    res.status(500).json({ error: "Error durante el registro" })
  }
}

module.exports = { signUp }
