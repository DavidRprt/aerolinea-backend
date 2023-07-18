const express = require("express")
const router = express.Router()
const clienteController = require("../controllers/clienteController")

router.get("/clientes", clienteController.getClientes)
router.get("/clientes/pasaporte/:busqueda", clienteController.getClientesPasaporte)
router.get("/clientes/email/:busqueda", clienteController.getClientesEmail)
router.get("/clientes/:idcliente", clienteController.getClienteById)
router.post("/clientes", clienteController.postCliente)

module.exports = router