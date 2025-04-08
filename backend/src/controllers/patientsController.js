const patientsController = {};
import modelPatients from "../models/patients.js";

//SELECT
patientsController.getPatients = async (req, res) => {
    const patients = await modelPatients.find()
    res.json(patients);
};

//INSERT
patientsController.insertPatients = async (req, res) => {
    const{ name, email, password, age, telephone, isVerified } = req.body;
    const newPatient = new modelPatients({name, email, password, age, telephone, isVerified})
    await newPatient.save()
    res.json({message: "Patient saved"});
};

//DELETE
patientsController.deletePatients = async (req, res) => {
    await modelPatients.findByIdAndDelete(req.params.id)
    res.json({message: "Patient deleted"});
};

//UPDATE
patientsController.updatePatients = async (req, res) => {
    const {name, email, password, age, telephone, isVerified} = req.body;
    const updatePatients = await modelPatients.findByIdAndUpdate(req.params.id, {name, email, password, age, telephone, isVerified})
    res.json({message: "Patient updated successfully"});
};

export default patientsController;