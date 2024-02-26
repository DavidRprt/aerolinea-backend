const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Empleado = require("../models/empleado")
const Token = require("../models/token")
const Empleo = require("../models/empleo")
const crypto = require("crypto")
const secretKey = process.env.SECRET
const { sendEmail } = require("../utils/nodemailer")
const { Op } = require("sequelize")

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

const requestResetPassword = async (req, res) => {
  const { email } = req.body
  const baseUrl = process.env.REACT_APP_BASE_URL

  try {
    const user = await Empleado.findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" })
    }

    const expirationTime = "1h" // 1 hora
    const resetToken = jwt.sign(
      { idempleado: user.idempleado },
      process.env.SECRET,
      { expiresIn: expirationTime }
    )

    const resetLink = `${baseUrl}/reset-password/${resetToken}`

    await sendEmail(
      user.email,
      "Recuperación de Contraseña",
      `Por favor, usa este enlace para restablecer tu contraseña: ${resetLink}`
    )

    res.status(200).json({ message: "Correo de recuperación enviado" })
  } catch (error) {
    console.error("Error en solicitud de recuperación:", error)
    res.status(500).json({ error: "Error interno" })
  }
}

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body

  try {
    const decoded = jwt.verify(token, process.env.SECRET)
    const user = await Empleado.findOne({
      where: { idempleado: decoded.idempleado },
    })

    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.passwordhash = hashedPassword
    await user.save()

    res.status(200).json({ message: "Contraseña actualizada correctamente" })
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(400).json({ error: "Token inválido o expirado" })
    }
    console.error("Error en restablecimiento de contraseña:", error)
    return res.status(500).json({ error: "Error interno" })
  }
}


const getAllEmployees = async (req, res) => {
  try {
    const employees = await Empleado.findAll()

    // Si no se encuentran empleados
    if (employees.length === 0) {
      return res.status(404).json({ error: "No se encontraron empleados" })
    }

    res.status(200).json(employees)
  } catch (error) {
    console.error("Error al obtener empleados:", error)
    res.status(500).json({ error: "Error interno" })
  }
}

const getAllJobs = async (req, res) => {
  try {
    const jobs = await Empleo.findAll()

    // Si no se encuentran empleos
    if (jobs.length === 0) {
      return res.status(404).json({ error: "No se encontraron empleos" })
    }

    res.status(200).json(jobs)
  } catch (error) {
    console.error("Error al obtener empleos:", error)
    res.status(500).json({ error: "Error interno" })
  }
}

const updateEmployeeJob = async (req, res) => {
  const { idempleado, idempleo } = req.body

  try {
    const empleado = await Empleado.findByPk(idempleado)

    if (!empleado) {
      return res.status(404).json({ error: "Empleado no encontrado" })
    }

    empleado.idempleo = idempleo
    await empleado.save()

    res.status(200).json({ message: "Empleo actualizado correctamente" })
  } catch (error) {
    console.error("Error al actualizar el empleo del empleado:", error)
    res.status(500).json({ error: "Error interno del servidor" })
  }
}

module.exports = {
  login,
  requestResetPassword,
  resetPassword,
  getAllEmployees,
  getAllJobs,
  updateEmployeeJob,
}
