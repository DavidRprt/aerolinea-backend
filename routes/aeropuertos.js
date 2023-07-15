const express = require("express")
const router = express.Router()
const aeropuertoController = require("../controllers/aeropuertoController")

router.get("/aeropuertos", aeropuertoController.getAll)

router.post("/aeropuertos", aeropuertoController.postAeropuerto)

router.delete("/aeropuertos", aeropuertoController.deleteAeropuerto)

module.exports = router
 