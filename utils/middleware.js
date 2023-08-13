const jwt = require("jsonwebtoken")

const SECRET_KEY = process.env.SECRET

const validateToken = (req, res, next) => {
  // Obtener el token de las cookies
const bearerToken = req.headers["authorization"]
const token = bearerToken && bearerToken.split(" ")[1]

  // Verificar que el token esté presente
  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado" })
  }

  // Verificar la validez del token
  try {
    const decoded = jwt.verify(token, SECRET_KEY)

    next()
  } catch (error) {
    return res.status(401).json({ message: "Token no válido" })
  }
}

module.exports = { validateToken }
