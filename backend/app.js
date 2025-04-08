//importar todo de la librería de express
import express from "express";
import doctors from "./src/routes/doctors.js";
import patients from "./src/routes/patients.js";
import appointments from "./src/routes/appointments.js";
import registerDoctors from "./src/routes/registerDoctors.js";
import registerPatients from "./src/routes/registerPatients.js";
import loginRoute from "./src/routes/login.js";
import cookieParser from "cookie-parser";
//crear constante que es igual a la libreria que importé y se ejecuta
const app = express();

//que acepte archivos json
app.use (express.json());
//que acepte cookies
app.use(cookieParser());

//rutas para crud
app.use("/api/doctors", doctors)
app.use("/api/patients", patients)
app.use("/api/appointments", appointments)
app.use("/api/registerDoctors", registerDoctors)
app.use("/api/registerPatients", registerPatients)
app.use("/api/login", loginRoute)

//importo esta constante para usar express en todos lados
export default app;