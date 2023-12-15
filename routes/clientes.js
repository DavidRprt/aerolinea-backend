const express = require("express")
const router = express.Router()
const clienteController = require("../controllers/clienteController")
const { validateToken } = require("../utils/middleware")

router.get("/clientes", clienteController.getClientes)
router.get("/topclientes", clienteController.obtenerTopClientes)
router.get("/clientes/pasaporte/:busqueda", clienteController.getClientesPasaporte)
router.get("/clientes/email/:busqueda", clienteController.getClientesEmail)
router.get("/clientes/:idcliente", clienteController.getClienteById)
router.post("/clientes", validateToken, clienteController.postCliente)
router.patch(
  "/clientes/:idcliente",
  validateToken,
  clienteController.updateClienteMillas
)

module.exports = router