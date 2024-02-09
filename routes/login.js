const express = require("express")
const router = express.Router()
const loginController = require("../controllers/loginController")

router.post("/login", loginController.login)
router.post("/request-reset-password", loginController.requestResetPassword)
router.post("/reset-password", loginController.resetPassword)

module.exports = router
