const { Op } = require("sequelize")
const Cliente = require("../models/cliente")
const Pasaje = require("../models/pasaje")
const Ruta = require("../models/rutas")
const Avion = require("../models/avion")

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


const postCliente = async (req, res) => {
  try {
    const nuevoCliente = await Cliente.create(req.body)
    res.status(201).json(nuevoCliente)
  } catch (error) {
    console.error("Error al reguistrar el cliente:", error)
    res.status(500).json({ error: "Error al registrar el cliente" })
  }}

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
             attributes: ["idorigen", "iddestino", "horariosalida", "duracion"],
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
}
