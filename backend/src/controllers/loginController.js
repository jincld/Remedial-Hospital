//Importar tablas de users
import doctorModel from "../models/doctors.js";
import patientModel from "../models/patients.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import {config} from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        let userFound; //Guardar usuario encontrado
        let userType; //Guardar tipo de usuario

        //Cuenta admin
        if(email === config.emailAdmin.email && password === config.emailAdmin.password){
            userType = "admin",
            userFound ={_id: "admin"}
        }else{ 
            //Cuenta empleado
            userFound = await doctorModel.findOne({email})
            userType = "doctor"

            //Cuenta cliente
            if(!userFound){
                userFound = await patientModel.findOne({email})
                userType = "patient"
            }
        }

        if(!userFound){
            console.log("Cuenta no encontrada")
            return res.json({message: "User not found"})
        }

        //Validar la contraseña, solo si no es admin
        if(userType !== "admin"){
            //Ver si la contraseña escrita en el login es la misma que la base de datos
            const isMatch = await bcrypt.compare(password, userFound.password)
            if(!isMatch){
                return res.json({message: "Contraseña incorrecta"})
            }
        }

        //TOKEN
        jsonwebtoken.sign(
            //Que voy a guardar
            {id: userFound._id},
            //Secreto
            config.JWT.secret,
            //Expiración
            {expiresIn: config.JWT.expiresIn},
            //Función flecha
            (error, token) => {
                if(error) console.log(error)
                
                res.cookie("authToken", token)
                res.json({message: "Login successful"})
            }
        )
    } catch (error) {
        res.json({message: "Error"})
    }
 }

 export default loginController;