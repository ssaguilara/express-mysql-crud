import { pool } from "../db.js";

// try y cath para manejo de error por si se dañao en alguna peticion no afecte a las otras
export const getEmployees = async (req, res) => {
  try {
    // throw new Error('DB Error') // lo podemos ejecutar paraensayar los errores
    const [rows] = await pool.query("SELECT * FROM employee");
    res.json(rows);
    // res.send("obteniendo empleados");
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(rows[0]);

    // res.send("obteniendo empleado");
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("DELETE FROM employee WHERE id = ?", [id]);

    //affectedRows viene del objeto rows, si elimina aparece un numero
    if (rows.affectedRows <= 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.sendStatus(204);
    // res.send("eliminando empleado");
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createEmployee = async (req, res) => {
  const { name, salary } = req.body; // enviado en el thunderclient
  // la fila insertada es la primera del objeto, es igual que results de index.rotes
  try {
    const [rows] = await pool.query(
      "INSERT INTO employee (name, salary) VALUES (?, ?)",
      [name, salary]
    );
    //(?, ?) esto es de la biblioteca
    // res.send({ rows });
    // res.send("creando empleados");
    res.status(201).json({ id: rows.insertId, name, salary });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateEmployee = async (req, res) => {
  // descriptivamente para la operacion diferentes (semanticamente), pero ambas hacen la misma cosa
  // se usa el metodo path porque con este podemos enviar un solo valor, name o salary o ambos
  // con put tocaria si o si enviar ambos(todos), porque al enviar uno quedaria el otro faltante en null
  const { id } = req.params;
  const { name, salary } = req.body;

  try {
    //IFNULL es que si le pasamos un valor este lo deje igual, name o salary, esto hace que put y path sea lo mismo
    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?",
      // "UPDATE employee SET name = ?, salary = ? WHERE id = ?",
      [name, salary, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Employee not found" });

    //mysql devuelve un objeto, pa saber que fila fu afecta necesitamos consultar la fila de nuevo
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
    // res.send("actualizando empleado");
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
