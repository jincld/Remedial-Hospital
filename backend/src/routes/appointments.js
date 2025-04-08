import express from "express";
import appointmentsController from "../controllers/appointmentsController.js";

const router = express.Router();

router.route("/")
.get(appointmentsController.getAppointments)
.post(appointmentsController.insertAppointments);

router.route("/:id")
.put(appointmentsController.updateAppointments)
.delete(appointmentsController.deleteAppointments);

export default router;