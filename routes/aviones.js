const express = require("express")
const router = express.Router()
const ModeloAvion = require("../models/modeloAvion")
const Avion = require("../models/avion")

router.get("/aviones", async (req, res) => {
  const aviones = await Avion.findAll({
    attributes: { exclude: ["idModelo"] },
    include: {
      model: ModeloAvion,
      attributes: ["modelo"],
    },
  })
  res.json(aviones)
})

router.get("/modelos", async (req, res) => {
  const modelos = await ModeloAvion.findAll()
  res.json(modelos)
})

module.exports = router