//importar el archivo app.js
import app from "./app.js";
//importar la conexión con base de datos
import "./database.js";
import {config} from "./src/config.js";

//crear función que ejecuta el servidor
async function main() {
    app.listen(config.server.port);
    console.log("Server running! :D");
}
//ejecutar la función
main();