const express = require("express")
const router = express.Router()
const rutaController = require("../controllers/rutaController")

router.get("/rutas", rutaController.getRutas)

router.post("/rutas", rutaController.postRutas)

router.delete("/rutas", rutaController.deleteRutas)

module.exports = router
