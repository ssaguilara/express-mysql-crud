import { pool } from "../db.js";

export const index = (req, res) => res.json({ message: "welcome to my api" });

export const ping = async (req, res) => {
    //recordar podemos extraer la informacion por posiciones asignadoles una variable, en este caso la primera es result
    // const [result] = await pool.query('SELECT 1 + 1 AS result')
    const [result] = await pool.query('SELECT "pong" AS result');
    res.json(result[0]);
};
