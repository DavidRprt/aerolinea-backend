const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Empleado = require("../models/empleado")
const Empleo = require("../models/empleo")

const login = async (req, res) => {
  const { email, password } = req.body
  const secretKey = process.env.SECRET

  try {
    const user = await Empleado.findOne({ where: { email } })

    if (!user) {
      return res.status(400).json({ error: "Usuario no existe" })
    }

    const isMatch = await bcrypt.compare(password, user.passwordhash)

    if (!isMatch) {
      return res.status(400).json({ error: "Contraseña incorrecta" })
    }

    const empleo = await Empleo.findOne({ where: { idempleo: user.idempleo } })

    // Definir payload para JWT
    const payload = {
      id: user.idempleado,
      email: user.email,
      nombre: user.nombre,
      apellido: user.apellido,
      empleo: empleo ? empleo.nombre : "No definido",
    }

    // Generar JWT
    jwt.sign(payload, secretKey, { expiresIn: "1h" }, (error, token) => {
      if (error) throw error

      // Configurando las cookies
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000, // 1 hora
      })

      res.status(200).json({
        token: token,
        user: {
          idempleado: user.idempleado,
          idempleo: user.idempleo,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          empleo: empleo ? empleo.nombre : "No definido",
        },
      })
    })
  } catch (error) {
    console.error("Error durante el inicio de sesión:", error)
    res.status(500).json({ error: "Error durante el inicio de sesión" })
  }
}

module.exports = { login }
