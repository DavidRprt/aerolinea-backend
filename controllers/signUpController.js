const bcrypt = require("bcrypt")
const Empleado = require("../models/empleado")
const Empleo = require("../models/empleo")
const Log = require("../models/log")
const TipoLog = require("../models/tipoLog")

// Caja blanca
const validarEmail = (email) => {
  if (email.length === 0) {
    return { valido: false, mensaje: "El email no puede estar vacío" } // Flujo 1
  } else if (!email.includes("@")) {
    return { valido: false, mensaje: "El email debe contener @" } // Flujo 2
  } else if (email.startsWith("@") || email.endsWith("@")) {
    return {
      valido: false,
      mensaje: "El email no puede empezar o terminar con @", // Flujo 3
    }
  } else if (!email.includes(".")) {
    return { valido: false, mensaje: "El email debe contener un punto" } // Flujo 4
  } else if (email.lastIndexOf(".") < email.indexOf("@")) {
    return { valido: false, mensaje: "El punto debe estar después del @" } // Flujo 5
  }
  return { valido: true, mensaje: "Email válido" } // Flujo 6
}

const signUp = async (req, res) => {
  const { email, password, nombre, apellido, idempleo } = req.body

  const formattedEmail = email.toLowerCase()
  const formattedNombre =
    nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase()
  const formattedApellido =
    apellido.charAt(0).toUpperCase() + apellido.slice(1).toLowerCase()

  const validacionEmail = validarEmail(formattedEmail)

  if (!validacionEmail.valido) {
    return res.status(400).json({ error: validacionEmail.mensaje })
  }

  try {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const newUser = await Empleado.create({
      email: formattedEmail,
      passwordhash: passwordHash,
      nombre: formattedNombre,
      apellido: formattedApellido,
      idempleo,
    })

      await Log.create({
        usuario_id: newUser.idempleado, 
        tipo_log_id: 2, // Tipo de log para 'registro'
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
