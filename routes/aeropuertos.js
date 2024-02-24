const express = require("express")
const router = express.Router()
const aeropuertoController = require("../controllers/aeropuertoController")
const { validateToken } = require("../utils/middleware")

router.get("/aeropuertos", aeropuertoController.getAll)
router.get(
  "/aeropuertos/mas-rutas",
  aeropuertoController.getAeropuertosConMasRutas
)
router.post("/aeropuertos", validateToken, aeropuertoController.postAeropuerto)

router.delete(
  "/aeropuertos",
  validateToken,
  aeropuertoController.deleteAeropuerto
)

module.exports = router
 