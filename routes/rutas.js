const express = require("express")
const router = express.Router()
const rutaController = require("../controllers/rutaController")
const { validateToken } = require("../utils/middleware")

router.get("/rutas", rutaController.getRutas)

router.get("/rutas/:idorigen/:iddestino", rutaController.getRutasByAirport)

router.post("/rutas", validateToken, rutaController.postRutas)

router.delete("/rutas", validateToken, rutaController.deleteRutas)


module.exports = router
