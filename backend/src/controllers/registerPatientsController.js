import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer";
import crypto from "crypto";
import patientModel from "../models/patients.js";
import {config} from "../config.js";
import { text } from "express";

//array de funciones
const registerPatientsController = {};

registerPatientsController.register = async (req, res) =>{
    const{name, email, password, age, telephone, isVerified} = req.body;

    try{
        const existingPatient = await patientModel.findOne({email})
        if(existingPatient) {
            return res.json({message: "El paciente ya existe"})
        }

        //Encriptar contraseña
        const passwordHash = await bcryptjs.hash(password, 10)

        const newPatient = new patientModel({name, email, password: passwordHash, age, telephone: telephone || null, isVerified: isVerified || false})

        await newPatient.save();

        //generar código aleatorio para verificar
        const verificationCode = crypto.randomBytes(3).toString("hex")

        //generar TOKEN que contenga el código de verificación
        const tokenCode = jsonwebtoken.sign(            
            //Qué voy a guardar
            {email, verificationCode},
            //Cuál es el secreto
            config.JWT.secret,
            //Cuándo expira
            {expiresIn: "2h"} 
        )

        res.cookie("verificationToken", tokenCode, {maxAge: 2*60*60*1000})

        //enviar correo electrónico
        //1- transporter ¿quién lo envía?
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.email_user,
                pass: config.email.email_pass
            }
        })

        //2- mailoption ¿quién lo recibe?
        const mailOptions = {
            from: config.email.email_user,
            to: email,
            subject: "Verificación de correo - Hospital Pro-Familia",
            text: "Para verificar tu cuenta, ingresa el siguiente código: " + verificationCode + " \n El código expira en 2 horas."
        }

        //3- enviar el correo
        transporter.sendMail(mailOptions, (error, info) =>{
            if(error){
                return res.json({message: "Error sending amail " + error})
            }
            console.log("Email sent" + info)
        });

        res.json({message: "Patient registered, please verify your email using the sent code."})
    
    } catch (error) {
        console.log("catch error: " + error)
        }
};

registerPatientsController.verifyCodeEmail = async (req, res) =>{
     const {requireCode} = req.body;

     try {
        //verificar y decodificar el token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        const {email, verificationCode: storedCode} = decoded;
        
        if (requireCode !== storedCode) {
            return res.json({message: "Invalid code"})
        }

        const client = await clientModel.findOne({email})
        client.isVerified = true;
        await client.save();

        res.clearCookie({verificationToken});
        res.json({message: "Email verified successfully"})

     } catch (error) {
        console.log("error: " +error)
     }
};


export default registerPatientsController;