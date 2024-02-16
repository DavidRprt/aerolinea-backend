const express = require("express")
const router = express.Router()
const tripulantesController = require("../controllers/tripulantesController")
const { validateToken } = require("../utils/middleware")

router.get("/cargos", tripulantesController.getAllCargos)
router.get("/tripulantes", tripulantesController.getAllTripulantes)
router.get("/tripulacion", tripulantesController.getAllTripulaciones)

router.post("/tripulantes", validateToken, tripulantesController.addTripulante)
router.put(
  "/tripulantes/:idtripulante",
  validateToken,
  tripulantesController.updateTripulante
)




module.exports = router
