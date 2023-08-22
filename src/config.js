import { config } from "dotenv"; // variables de entorno permite que diferentes entornos tengan diferentes configuraciones
config(); // con esto ya podremos leer variables de entorno en un archivo .env

//forma en que se lee, process objeto global de nodejs, env almacenas todas las variables y port es una de esas
// console.log(process.env.PORT) 
// console.log(process.env.DB_HOST) 
// console.log(process.env.DB_USER) 
// console.log(process.env.DB_PASSWORD) 
// console.log(process.env.DB_DATABASE) 
// console.log(process.env.DB_PORT)

//estas variables on para usar en produccion
export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "123456789";
export const DB_DATABASE = process.env.DB_DATABASE || "companydb";
export const DB_PORT = process.env.DB_PORT || 3306;

