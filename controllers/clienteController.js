const { Op } = require("sequelize")
const Cliente = require("../models/cliente")
const Pasaje = require("../models/pasaje")
const Ruta = require("../models/rutas")
const Avion = require("../models/avion")

// Metodo para obtener todos los clientes
const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll({
      include: [
        {
          model: Pasaje,
          include: [
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

    res.status(200).json(clientes)
  } catch (error) {
    console.error("Error al obtener los clientes:", error)
    res.status(500).json({ error: "Error al obtener los clientes" })
  }
}

// Metodo para agregar un nuevo cliente
const postCliente = async (req, res) => {
  try {
    const nuevoCliente = await Cliente.create(req.body)
    res.status(201).json(nuevoCliente)
  } catch (error) {
    console.error("Error al reguistrar el cliente:", error)
    res.status(500).json({ error: "Error al registrar el cliente" })
  }
}

// Metodo para obtener los clientes con mas millas
const obtenerTopClientes = async (req, res) => {
  try {
    const topClientes = await Cliente.findAll({
      attributes: ["idcliente", "nombre", "apellido", "email", "millas"],
      order: [["millas", "DESC"]],
      limit: 5,
    })

    const clientesConVuelos = await Promise.all(
      topClientes.map(async (cliente) => {
        const cantidadVuelos = await Pasaje.count({
          where: { idcliente: cliente.idcliente },
        })
        // Calcular el promedio de millas por vuelo
        const millasPromedioPorVuelo =
          cantidadVuelos > 0 ? cliente.millas / cantidadVuelos : 0
        return {
          ...cliente.dataValues,
          cantidadVuelos,
          millasPromedioPorVuelo,
        }
      })
    )

    res.status(200).json(clientesConVuelos)
  } catch (error) {
    console.error("Error al obtener los clientes top:", error)
    res.status(500).json({ error: "Error al obtener los clientes" })
  }
}

// Metodo para buscar clientes por pasaporte
const getClientesPasaporte = async (req, res) => {
  const pasaporte = req.params.busqueda
  try {
    const clientes = await Cliente.findAll({
      where: { pasaporte: pasaporte },
      include: [
        {
          model: Pasaje,
          include: [
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

    if (clientes.length === 0) {
      return res.status(404).json({
        message: "No se encontraron clientes con el pasaporte proporcionado",
      })
    }

    res.status(200).json(clientes)
  } catch (error) {
    console.error("Error al obtener los clientes:", error)
    res.status(500).json({ error: "Error al obtener los clientes" })
  }
}

// Metodo para buscar clientes por email
const getClientesEmail = async (req, res) => {
  const email = req.params.busqueda
  try {
    const clientes = await Cliente.findAll({
      where: { email: { [Op.iLike]: `%${email}%` } },
      include: [
        {
          model: Pasaje,
          include: [
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

    if (clientes.length === 0) {
      return res.status(404).json({
        message: "No se encontraron clientes con el email proporcionado",
      })
    }

    res.status(200).json(clientes)
  } catch (error) {
    console.error("Error al obtener los clientes:", error)
    res.status(500).json({ error: "Error al obtener los clientes" })
  }
}

// Metodo para buscar clientes por id
const getClienteById = async (req, res) => {
  const idcliente = req.params.idcliente

  try {
    const cliente = await Cliente.findByPk(idcliente, {
      include: [
        {
          model: Pasaje,
          include: [
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

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" })
    }

    res.json(cliente)
  } catch (error) {
    console.error("Error al obtener el cliente:", error)
    res.status(500).json({ error: "Error al obtener el cliente" })
  }
}

// Metodo para actualizar las millas del cliente
const updateClienteMillas = async (req, res) => {
  const id = req.params.idcliente
  const millas = req.body.millas

  try {
    // encontrar el cliente
    const cliente = await Cliente.findByPk(id)
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" })
    }

    // actualizar las millas
    cliente.millas += millas
    await cliente.save()

    res.json(cliente)
  } catch (error) {
    console.error("Error al actualizar las millas del cliente:", error)
    res
      .status(500)
      .json({ error: "Error al actualizar las millas del cliente" })
  }
}

module.exports = {
  getClientes,
  getClientesPasaporte,
  getClientesEmail,
  getClienteById,
  postCliente,
  updateClienteMillas,
  obtenerTopClientes,
}
