const ModeloAvion = require("../models/modeloAvion")
const Avion = require("../models/avion")

const getAviones = async (req, res) => {
  const aviones = await Avion.findAll({
    attributes: { exclude: ["idModelo"] },
    include: {
      model: ModeloAvion,
      attributes: ["modelo"],
    },
  })
  res.status(200).json(aviones)
}

const postAviones = async (req, res) => {
  try {
    const nuevoAvion = await Avion.create(req.body)
    res.status(201).json(nuevoAvion)
  } catch (error) {
    console.error("Error al agregar el avión:", error)
    res.status(500).json({ error: "Error al agregar el avión" })
  }
}

const deleteAviones = async (req, res) => {
  const id = req.body.idAvion
  console.log(id)

  try {
    const avionEliminado = await Avion.destroy({
      where: { idavion: id },
    })

    if (avionEliminado === 0) {
      // El avion no se encontró en la base de datos
      return res.status(404).json({ mensaje: "Avion no encontrado" })
    }

    res.json({ mensaje: "Avion eliminado correctamente" })
  } catch (error) {
    // Ocurrió un error durante la eliminación del avion
    res.status(500).json({
      mensaje: "Error al eliminar el avion",
      error: error.message,
    })
  }
}

const getModelos = async (req, res) => {
  const modelos = await ModeloAvion.findAll()
  res.status(200).json(modelos)
}

const postModelos = async (req, res) => {
  try {
    const nuevoModelo = await ModeloAvion.create(req.body)
    res.status(201).json(nuevoModelo)
  } catch (error) {
    console.error("Error al agregar el modelo:", error)
    res.status(500).json({ error: "Error al agregar el modelo" })
  }
}

const deleteModelos = async (req, res) => {
  const id = req.body.idModelo
  console.log(id)

  try {
    const modeloEliminado = await ModeloAvion.destroy({
      where: { idmodelo: id },
    })

    if (modeloEliminado === 0) {
      // El modelo no se encontró en la base de datos
      return res.status(404).json({ mensaje: "Modelo no encontrado" })
    }

    res.status(200).json({ mensaje: "Modelo eliminado correctamente" })
  } catch (error) {
    // Ocurrió un error durante la eliminación del modelo
    res.status(500).json({
      mensaje: "Error al eliminar el modelo",
      error: error.message,
    })
  }
}

module.exports = {
  getAviones,
  postAviones,
  deleteAviones,
  getModelos,
  postModelos,
  deleteModelos
}

