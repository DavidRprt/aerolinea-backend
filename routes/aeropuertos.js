const express = require("express")
const router = express.Router()
const Aeropuerto = require("../models/aeropuerto")

router.get("/aeropuertos", async (req, res) => {
  const aeropuertos = await Aeropuerto.findAll()
  res.json(aeropuertos)
})

module.exports = router
