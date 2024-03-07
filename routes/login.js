const express = require("express")
const router = express.Router()
const loginController = require("../controllers/loginController")

router.get("/clients", loginController.getAllEmployees)
router.get("/jobs", loginController.getAllJobs)
router.get("/logs", loginController.getAllLogs)
router.post("/login", loginController.login)
router.post("/request-reset-password", loginController.requestResetPassword)
router.post("/reset-password", loginController.resetPassword)
router.patch("/update-employee-job", loginController.updateEmployeeJob)

module.exports = router
