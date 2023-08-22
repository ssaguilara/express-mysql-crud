import { Router } from "express"; //crear una seccion de rutas
import {
  createEmployee,
  deleteEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
} from "../controllers/employees.controller.js";

const router = Router();


router.get("/employees", getEmployees);

router.get("/employees/:id", getEmployee);

router.delete("/employees/:id", deleteEmployee);

router.post("/employees", createEmployee);

router.patch("/employees/:id", updateEmployee);


export default router;
