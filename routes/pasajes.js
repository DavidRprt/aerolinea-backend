const express = require("express")
const router = express.Router()
const pasajeController = require("../controllers/pasajeController")

router.get("/pasajes", pasajeController.getPasajes)
router.get("/pasajes/:idcliente", pasajeController.getPasajesByClienteId)

module.exports = router
