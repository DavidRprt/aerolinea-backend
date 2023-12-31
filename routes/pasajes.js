const express = require("express")
const router = express.Router()
const pasajeController = require("../controllers/pasajeController")
const { validateToken } = require("../utils/middleware")

router.get("/pasajes", pasajeController.getPasajes)
router.get("/pasajes/:idcliente", pasajeController.getPasajesByClienteId)
router.get("/pasajes/:idorigen/:iddestino", pasajeController.getPasajesByAirport)
router.post("/pasajes", validateToken, pasajeController.crearPasaje)


module.exports = router
