import express from "express";
import patientsController from "../controllers/patientsController.js";

const router = express.Router();

router.route("/")
.get(patientsController.getPatients)
.post(patientsController.insertPatients);

router.route("/:id")
.put(patientsController.updatePatients)
.delete(patientsController.deletePatients);

export default router;