const express = require("express")
const router = express.Router()
const reservaController = require("../controllers/reservaController")

router.get("/reservas", reservaController.getReservas)
router.get("/reservas/:idreserva", reservaController.getReservaById)
router.post("/reservas", reservaController.crearReserva)

module.exports = router
