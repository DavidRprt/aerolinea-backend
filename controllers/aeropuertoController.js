const Aeropuerto = require("../models/aeropuerto")

const getAll = async (req, res) => {
  const aeropuertos = await Aeropuerto.findAll()
  res.status(200).json(aeropuertos)
}

const postAeropuerto = async (req, res) => {
  try {
    const nuevoAeropuerto = await Aeropuerto.create(req.body)
    res.status(201).json(nuevoAeropuerto)
  } catch (error) {
    console.error("Error al agregar el aeropuerto:", error)
    res.status(500).json({ error: "Error al agregar el aeropuerto" })
  }
}

const deleteAeropuerto = async (req, res) => {
  const id = req.body.idAeropuerto

  try {
    const aeropuertoEliminado = await Aeropuerto.destroy({
      where: { idaeropuerto: id },
    })

    if (aeropuertoEliminado === 0) {
      // El aeropuerto no se encontró en la base de datos
      return res.status(404).json({ mensaje: "Aeropuerto no encontrado" })
    }

    res.json({ mensaje: "Aeropuerto eliminado correctamente" })
  } catch (error) {
    // Ocurrió un error durante la eliminación del aeropuerto
    res.status(500).json({
      mensaje: "Error al eliminar el aeropuerto",
      error: error.message,
    })
  }
}

module.exports = {
  getAll,
  postAeropuerto,
  deleteAeropuerto
}
