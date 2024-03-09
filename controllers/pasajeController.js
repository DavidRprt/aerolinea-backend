const { Op } = require("sequelize")
const Pasaje = require("../models/pasaje")
const Cliente = require("../models/cliente")
const Ruta = require("../models/rutas")
const Menu = require("../models/menu")
const Avion = require("../models/avion")
const Clase = require("../models/clase")
const sequelize = require("../utils/sequelize")
const Equipaje = require("../models/equipaje")

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

const getTodosLosEquipajes = async (req, res) => {
  try {
    const equipajes = await Equipaje.findAll()
    res.status(200).json(equipajes)
  } catch (error) {
    console.error("Error al obtener todos los equipajes:", error)
    res.status(500).json({ error: "Error al obtener todos los equipajes" })
  }
}

const getTodosLosMenues = async (req, res) => {
  try {
    const menues = await Menu.findAll()
    res.status(200).json(menues)
  } catch (error) {
    console.error("Error al obtener los menús:", error)
    res.status(500).json({ error: "Error al obtener los menús" })
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
        ],
      },
    })

    res.status(200).json(pasajes)
  } catch (error) {
    console.error("Error al obtener los pasajes:", error)
    res.status(500).json({ error: "Error al obtener los pasajes" })
  }
}

const crearPasaje = async (req, res) => {
  const {
    idcliente,
    idruta,
    idclase,
    idreserva,
    fecha,
    precio,
    equipajeExtra,
  } = req.body
  const id_menu = 1 

  try {
    // Primero, creamos el pasaje
    const nuevoPasaje = await Pasaje.create({
      idcliente,
      idruta,
      idclase,
      idreserva,
      fecha,
      precio: precio, 
      id_menu,
    })
    let equipajesCreados = []
    for (let i = 0; i < equipajeExtra; i++) {
      const nuevoEquipaje = await Equipaje.create({
        idpasaje: nuevoPasaje.idpasaje
      })
      equipajesCreados.push(nuevoEquipaje)
    }

    res.status(201).json({ nuevoPasaje, equipajesCreados })
  } catch (error) {
    console.error("Error al crear el pasaje y el equipaje:", error)
    res.status(500).json({ error: "Error al crear el pasaje y el equipaje" })
  }
}

const getPasajesPorClase = async (req, res) => {
  try {
    const frecuenciaPorClase = await Pasaje.findAll({
      attributes: [
        "idclase",
        [sequelize.fn("COUNT", sequelize.col("idpasaje")), "cantidadPasajes"],
        [sequelize.fn("AVG", sequelize.col("precio")), "precioPromedio"],
      ],
      group: ["idclase"],
      raw: true,
    })

    const resultados = frecuenciaPorClase.map((item) => ({
      clase: item.idclase,
      cantidadPasajes: item.cantidadPasajes,
      precioPromedio: parseFloat(item.precioPromedio).toFixed(2),
    }))

    res.status(200).json(resultados)
  } catch (error) {
    console.error("Error al obtener la frecuencia de pasajes por clase:", error)
    res
      .status(500)
      .json({ error: "Error al obtener la frecuencia de pasajes por clase" })
  }
}

const actualizarMenusDePasajes = async (req, res) => {
  const cambiosMenu = req.body 

  try {
    await Promise.all(
      Object.entries(cambiosMenu).map(async ([idpasaje, id_menu]) => {
        await Pasaje.update({ id_menu }, { where: { idpasaje } })
      })
    )

    res
      .status(200)
      .json({ message: "Menús de pasajes actualizados correctamente." })
  } catch (error) {
    console.error("Error al actualizar menús de pasajes:", error)
    res.status(500).json({ error: "Error al actualizar menús de pasajes" })
  }
}

module.exports = {
  getPasajes,
  getPasajesByClienteId,
  getPasajesByAirport,
  crearPasaje,
  getPasajesPorClase,
  getTodosLosMenues,
  actualizarMenusDePasajes,
  getTodosLosEquipajes
}
