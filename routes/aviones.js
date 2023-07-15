const express = require("express")
const router = express.Router()
const avionController = require("../controllers/avionController")

router.get("/aviones", avionController.getAviones)

router.post("/aviones", avionController.postAviones)

router.delete("/aviones", avionController.deleteAviones)

router.get("/modelos", avionController.getModelos)

router.post("/modelos", avionController.postModelos)

router.delete("/modelos", avionController.deleteModelos)

module.exports = router