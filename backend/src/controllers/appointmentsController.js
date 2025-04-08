const appointmentsController = {};
import modelAppointments from "../models/appointments.js";

//SELECT
appointmentsController.getAppointments = async (req, res) => {
    const appointments = await modelAppointments.find()
    res.json(appointments);
};

//INSERT
appointmentsController.insertAppointments = async (req, res) => {
    const{ date, time, motive, doctor_id, patient_id } = req.body;
    const newAppointment = new modelAppointments({date, time, motive, doctor_id, patient_id})
    await newAppointment.save()
    res.json({message: "Appointment saved"});
};

//DELETE
appointmentsController.deleteAppointments = async (req, res) => {
    await modelAppointments.findByIdAndDelete(req.params.id)
    res.json({message: "Appointment deleted"});
};

//UPDATE
appointmentsController.updateAppointments = async (req, res) => {
    const {date, time, motive, doctor_id, patient_id} = req.body;
    const updateAppointments = await modelAppointments.findByIdAndUpdate(req.params.id, {date, time, motive, doctor_id, patient_id})
    res.json({message: "Appointment updated successfully"});
};

export default appointmentsController;