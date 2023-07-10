const express = require("express")
const router = express.Router()
const Aeropuerto = require("../models/aeropuerto")

router.get("/aeropuertos", async (req, res) => {
  const aeropuertos = await Aeropuerto.findAll()
  res.json(aeropuertos)
})

router.post("/aeropuertos", async (req, res) => {
  try {
    const nuevoAeropuerto = await Aeropuerto.create(req.body)
    res.status(201).json(nuevoAeropuerto)
  } catch (error) {
    console.error("Error al agregar el aeropuerto:", error)
    res.status(500).json({ error: "Error al agregar el aeropuerto" })
  }
})

module.exports = router
 