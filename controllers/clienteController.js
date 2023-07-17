const { Op } = require("sequelize")
const Cliente = require("../models/cliente")

const getClientes = async (req, res) => {
  const clientes = await Cliente.findAll()
  res.status(200).json(clientes)
}

const getClientesPasaporte = async (req, res) => {
  const pasaporte = req.params.busqueda
  const clientes = await Cliente.findAll({
    where: { pasaporte: { [Op.iLike]: `%${pasaporte}%` } },
  })
  if (clientes.length === 0) {
    res
      .status(404)
      .json({
        message: "No se encontraron clientes con el pasaporte proporcionado",
      })
  } else {
    res.status(200).json(clientes)
  }
}

const getClientesEmail = async (req, res) => {
  const email = req.params.busqueda
  const clientes = await Cliente.findAll({
    where: { email: { [Op.iLike]: `%${email}%` } },
  })
  if (clientes.length === 0) {
    res
      .status(404)
      .json({
        message: "No se encontraron clientes con el email proporcionado",
      })
  } else {
    res.status(200).json(clientes)
  }
}

const getClienteById = async (req, res) => {
  const idcliente = req.params.idcliente

  try {
    const cliente = await Cliente.findByPk(idcliente)

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" })
    }

    res.json(cliente)
  } catch (error) {
    console.error("Error al obtener el cliente:", error)
    res.status(500).json({ error: "Error al obtener el cliente" })
  }
}

module.exports = { getClientes, getClientesPasaporte, getClientesEmail, getClienteById }
