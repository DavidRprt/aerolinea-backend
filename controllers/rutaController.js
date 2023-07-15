const Ruta = require("../models/rutas")
const Avion = require("../models/avion")

const getRutas = async (req, res) => {
  const rutas = await Ruta.findAll({
    attributes: { exclude: ["idAvion"] },
    include: {
      model: Avion,
      attributes: ["nombre"],
    },
  })
  res.json(rutas)
}

const postRutas = async (req, res) => {
  try {
    const newRuta = await Ruta.create(req.body)
    res.status(201).json(newRuta)
  } catch (error) {
    console.error("Error al agregar la ruta:", error)
    res.status(500).json({ error: "Error al agregar la ruta" })
  }
}


const deleteRutas = async (req, res) => {
  const id = req.body.idruta

  try {
    const rutaEliminada = await Ruta.destroy({
      where: { idruta: id },
    })

    if (rutaEliminada === 0) {
      // La ruta no se encontró en la base de datos
      return res.status(404).json({ mensaje: "Ruta no encontrada" })
    }

    res.json({ mensaje: "Ruta eliminada correctamente" })
  } catch (error) {
    // Ocurrió un error durante la eliminación de la ruta
    res.status(500).json({
      mensaje: "Error al eliminar la ruta",
      error: error.message,
    })
  }
}

module.exports = {
  getRutas,
  postRutas,
  deleteRutas
}