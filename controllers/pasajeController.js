const { Op } = require("sequelize")
const Pasaje = require("../models/pasaje")
const Cliente = require("../models/cliente")
const Ruta = require("../models/rutas")
const Avion = require("../models/avion")

const getPasajes = async (req, res) => {
  try {
    const pasajes = await Pasaje.findAll({
      include: [
        {
          model: Cliente,
          attributes: ["idcliente", "nombre", "apellido", "millas"],
        },
        {
          model: Ruta,
          attributes: ["idorigen", "iddestino", "horariosalida", "duracion"],
          include: [
            {
              model: Avion,
              attributes: ["nombre"],
            },
          ],
        },
      ],
    })

    res.status(200).json(pasajes)
  } catch (error) {
    console.error("Error al obtener los pasajes:", error)
    res.status(500).json({ error: "Error al obtener los pasajes" })
  }
}

const getPasajesByAirport = async (req, res) => {
  const idorigen = req.params.idorigen
  const iddestino = req.params.iddestino

  try {
    const pasajes = await Pasaje.findAll({
      include: [
        {
          model: Cliente,
          attributes: ["idcliente", "nombre", "apellido", "millas"],
        },
        {
          model: Ruta,
          attributes: ["idorigen", "iddestino", "horariosalida", "duracion"],
          where: {
            idorigen: { [Op.iLike]: idorigen },
            iddestino: { [Op.iLike]: iddestino },
          },
          include: [
            {
              model: Avion,
              attributes: ["nombre"],
            },
          ],
        },
      ],
    })

    res.status(200).json(pasajes)
  } catch (error) {
    console.error("Error al obtener los pasajes:", error)
    res.status(500).json({ error: "Error al obtener los pasajes" })
  }
}

const getPasajesByClienteId = async (req, res) => {
  const idcliente = req.params.idcliente

  try {
    const pasajes = await Pasaje.findAll({
      where: {
        idcliente: idcliente,
      },
      include: {
        model: Ruta,
        attributes: ["idorigen", "iddestino", "horariosalida", "duracion"],
        include: [
          {
            model: Avion,
            attributes: ["nombre"],
          },
        ]
      },
    })

    res.status(200).json(pasajes)
  } catch (error) {
    console.error("Error al obtener los pasajes:", error)
    res.status(500).json({ error: "Error al obtener los pasajes" })
  }
}

const crearPasaje = async (req, res) => {
  const { idcliente, idruta, idclase, idreserva, fecha, precio } = req.body

  try {
    const nuevoPasaje = await Pasaje.create({
      idcliente,
      idruta,
      idclase,
      idreserva,
      fecha,
      precio,
    })

    res.status(201).json(nuevoPasaje)
  } catch (error) {
    console.error("Error al crear el pasaje:", error)
    res.status(500).json({ error: "Error al crear el pasaje" })
  }
}

module.exports = { getPasajes, getPasajesByClienteId, getPasajesByAirport, crearPasaje }
