const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentController");
const { validateAppointment } = require("../validators/appointmentValidator");

router.get("/", appointmentController.getAllAppointments);

router.get("/:id", appointmentController.getAppointmentById);

router.post("/", validateAppointment, appointmentController.createAppointment);

router.put("/:id", validateAppointment, appointmentController.updateAppointment);

router.delete("/:id", appointmentController.deleteAppointment);

module.exports = router;
