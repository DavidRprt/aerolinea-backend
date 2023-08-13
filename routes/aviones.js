const express = require("express")
const router = express.Router()
const avionController = require("../controllers/avionController")
const { validateToken } = require("../utils/middleware")

router.get("/aviones", avionController.getAviones)

router.post("/aviones", validateToken, avionController.postAviones)

router.delete("/aviones", validateToken, avionController.deleteAviones)

router.get("/modelos", avionController.getModelos)

router.post("/modelos", validateToken, avionController.postModelos)

router.delete("/modelos", validateToken, avionController.deleteModelos)

module.exports = router