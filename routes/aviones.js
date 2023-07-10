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

router.post("/aviones", async (req, res) => {
  try {
    const nuevoAvion = await Avion.create(req.body)
    res.status(201).json(nuevoAvion)
  } catch (error) {
    console.error("Error al agregar el avión:", error)
    res.status(500).json({ error: "Error al agregar el avión" })
  }
})

router.get("/modelos", async (req, res) => {
  const modelos = await ModeloAvion.findAll()
  res.json(modelos)
})

router.post("/modelos", async (req, res) => {
  try {
    const nuevoModelo = await ModeloAvion.create(req.body)
    res.status(201).json(nuevoModelo)
  } catch (error) {
    console.error("Error al agregar el modelo:", error)
    res.status(500).json({ error: "Error al agregar el modelo" })
  }
})

module.exports = router