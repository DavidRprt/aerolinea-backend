const express = require("express")
const router = express.Router()
const Ruta = require("../models/rutas")
const Avion = require("../models/avion")

router.get("/rutas", async (req, res) => {
  const rutas = await Ruta.findAll({
    attributes: { exclude: ["idAvion"] },
    include: {
      model: Avion,
      attributes: ["nombre"],
    },
  })
  res.json(rutas)
})

module.exports = router
