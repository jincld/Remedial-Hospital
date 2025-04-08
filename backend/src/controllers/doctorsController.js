const doctorsController = {};
import modelDoctors from "../models/doctors.js";

//SELECT
doctorsController.getDoctors = async (req, res) => {
    const doctors = await modelDoctors.find()
    res.json(doctors);
};

//INSERT
doctorsController.insertDoctors = async (req, res) => {
    const{ name, email, password, specialty } = req.body;
    const newDoctor = new modelDoctors({name, email, password, specialty})
    await newDoctor.save()
    res.json({message: "Doctor saved"});
};

//DELETE
doctorsController.deleteDoctors = async (req, res) => {
    await modelDoctors.findByIdAndDelete(req.params.id)
    res.json({message: "Doctor deleted"});
};

//UPDATE
doctorsController.updateDoctors = async (req, res) => {
    const {name, email, password, specialty} = req.body;
    const updateDoctors = await modelDoctors.findByIdAndUpdate(req.params.id, {name, email, password, specialty})
    res.json({message: "Doctor updated successfully"});
};

export default doctorsController;