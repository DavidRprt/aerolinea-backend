const express = require("express")
const router = express.Router()
const reservaController = require("../controllers/reservaController")
const { validateToken } = require("../utils/middleware")

router.get("/reservas", reservaController.getReservas)
router.get("/reservas/:idreserva", reservaController.getReservaById)
router.post("/reservas", validateToken, reservaController.crearReserva)

module.exports = router
