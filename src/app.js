import express from "express";
import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";
// import "./config.js"; // asi de esta forma ejecita toda lo que hay en este archivo


const app = express();

app.use(express.json())

app.use(indexRoutes);
app.use(employeesRoutes);
// app.use('/api',employeesRoutes); // condicionar bajo que url 

//si la ruta no existe
app.use((req, res, next) => {
    res.status(404).json({ message: "Not found" });
  });

export default app;