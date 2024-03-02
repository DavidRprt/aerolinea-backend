const { Op } = require("sequelize")
const Reserva = require("../models/reserva")
const Pasaje = require("../models/pasaje")
const Cliente = require("../models/cliente")
const Ruta = require("../models/rutas")
const Avion = require("../models/avion")
const Menu = require("../models/menu")

const getReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      include: [
        {
          model: Pasaje,
          attributes: [
            "idpasaje",
            "idruta",
            "idclase",
            "fecha",
            "precio",
          ],
          include: [
            {
              model: Cliente,
              attributes: ["idcliente", "nombre", "apellido", "millas"],
            },
            {
              model: Ruta,
              attributes: [
                "idorigen",
                "iddestino",
                "horariosalida",
                "duracion",
              ],
              include: [
                {
                  model: Avion,
                  attributes: ["nombre"],
                },
              ],
            },
          ],
        },
      ],
    })

    res.status(200).json(reservas)
  } catch (error) {
    console.error("Error al obtener las reservas:", error)
    res.status(500).json({ error: "Error al obtener las reservas" })
  }
}

const getReservaById = async (req, res) => {
  const idreserva = req.params.idreserva

  try {
    const reserva = await Reserva.findByPk(idreserva, {
      include: [
        {
          model: Pasaje,
          attributes: [
            "idpasaje",
            "idruta",
            "idclase",
            "fecha",
            "precio",
            "id_menu",
          ],
          include: [
            {
              model: Cliente,
              attributes: ["idcliente", "nombre", "apellido", "millas"],
            },
            {
              model: Menu,
              attributes: ["nombre"],
            },
            {
              model: Ruta,
              attributes: [
                "idorigen",
                "iddestino",
                "horariosalida",
                "duracion",
              ],
              include: [
                {
                  model: Avion,
                  attributes: ["nombre"],
                },
              ],
            },
          ],
        },
      ],
    })

    if (!reserva) {
      return res.status(404).json({ message: "Reserva no encontrada" })
    }

    res.status(200).json(reserva)
  } catch (error) {
    console.error("Error al obtener la reserva:", error)
    res.status(500).json({ error: "Error al obtener la reserva" })
  }
}

const crearReserva = async (req, res) => {
  const { idmetodo, fechaemision, preciototal } = req.body

  const fixedid = idmetodo

  try {
    const reserva = await Reserva.create({
      idmetodo: fixedid,
      fechaemision,
      preciototal,
    })

    res.status(201).json(reserva)
  } catch (error) {
    console.error("Error al crear la reserva:", error)
    res.status(500).json({ error: "Error al crear la reserva" })
  }
}

module.exports = { getReservas, getReservaById, crearReserva }
