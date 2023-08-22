import { createPool } from "mysql2/promise"; //conection 1 solo hilo y pool un conjunto de conexiones

// export const pool = createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '123456789',
//   port: 3306,
//   database: 'companydb'
// });

// variables de entorno npm i dotenv

import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "./config.js";

export const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_DATABASE,
});