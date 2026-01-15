const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "inventario_db"
});

{ /* RUTA LOGIN */ }
app.post("/login", (req, res) => {
    const usuario = req.body.usuario;
    const clave = req.body.clave;

    db.query(
        "SELECT * FROM usuario WHERE username = ? AND clave = ?",
        [usuario, clave],
        (err, result) => {
            if (err) {
                res.send({ message: err });
            }
            if (result.length > 0) {
                res.send(result[0]);
            } else {
                res.send({ message: "Usuario o contraseña incorrectos" });
            }
        }
    );
});

{ /* CONEXION TABLA USUARIO */ }
app.post("/registrar", (req, res) => {
    const { nombre, apellido, username, clave, rol } = req.body;
    db.query(
        "INSERT INTO usuario (nombre, apellido, username, clave, rol) VALUES (?, ?, ?, ?, ?)",
        [nombre, apellido, username, clave, rol || 'comun'],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            } else {
                res.send("Valores ingresados con éxito");
            }
        }
    );
});

app.get("/usuario", (req, res) => {
    db.query("SELECT * FROM usuario", (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/update", (req, res) => {
    const { id, nombre, apellido, username, clave, rol } = req.body;
    db.query(
        "UPDATE usuario SET nombre=?, apellido=?, username=?, clave=?, rol=? WHERE id=?",
        [nombre, apellido, username, clave, rol, id],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al actualizar");
            } else {
                res.send("Valores ingresados con éxito");
            }
        }
    );
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query(
        "DELETE FROM usuario WHERE id=?",
        [id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            } else {
                res.send("Valores eliminados con éxito");
            }
        }
    );
});

{ /* CONEXION TABLA MARCA */ }
app.post("/registrarMarca", (req, res) => {
    const { nombre_marca, paisOrigen} = req.body;
    db.query(
        "INSERT INTO marca (nombre, pais) VALUES (?, ?)",
        [nombre_marca, paisOrigen],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            } else {
                res.send("Valores ingresados con éxito");
            }
        }
    );
});

app.get("/marca", (req, res) => {
    db.query("SELECT * FROM marca", (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        } else {
            res.send(result);
        }
    });
});

app.put("/updateMarca", (req, res) => {
    const { id, nombre_marca, paisOrigen } = req.body;
    db.query(
        "UPDATE marca SET nombre=?, pais=? WHERE id=?",
        [nombre_marca, paisOrigen, id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            } else {
                res.send("Valores ingresados con éxito");
            }
        }
    );
});

app.delete("/deleteMarca/:id", (req, res) => {
    const id = req.params.id;
    db.query(
        "DELETE FROM marca WHERE id=?",
        [id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            } else {
                res.send("Valores eliminados con éxito");
            }
        }
    );
});

{ /* CONEXION TABLA PRODUCTO */}

app.get("/producto", (req, res) => {
    const orderBy = req.query.orderBy || 'p.id';
    const direction = req.query.direction === 'DESC' ? 'DESC' : 'ASC';
    
    const camposValidos = ['p.id', 'p.nombre', 'p.precio', 'm.nombre'];
    const ordenFinal = camposValidos.includes(orderBy) ? orderBy : 'p.id';

    const query = `
        SELECT p.*, m.nombre AS nombre_marca, u.nombre AS nombre_usuario 
        FROM producto p
        JOIN marca m ON p.marca_id = m.id
        JOIN usuario u ON p.usuario_registro_id = u.id
        ORDER BY ${ordenFinal} ${direction}`;
    
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al obtener productos");
        } else {
            res.send(result);
        }
    });
});

app.post("/registrarProducto", (req, res) => {
    const { nombre, marca_id, descripcion, precio, cantidad_existencias, usuario_registro_id } = req.body;
    db.query(
        "INSERT INTO producto (nombre, marca_id, descripcion, precio, cantidad_existencias, usuario_registro_id) VALUES (?, ?, ?, ?, ?, ?)",
        [nombre, marca_id, descripcion, precio, cantidad_existencias, usuario_registro_id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            } else {
                res.send("Valores ingresados con éxito");
            }
        }
    );
});

app.put("/updateProducto", (req, res) => {
    const { id, nombre, marca_id, descripcion, precio, cantidad_existencias, usuario_registro_id } = req.body;
    db.query(
        "UPDATE producto SET nombre=?, marca_id=?, descripcion=?, precio=?, cantidad_existencias=?, usuario_registro_id=? WHERE id=?",
        [nombre, marca_id, descripcion, precio, cantidad_existencias, usuario_registro_id, id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            } else {
                res.send("Valores ingresados con éxito");
            }
        }
    );
});

app.delete("/deleteProducto/:id", (req, res) => {
    const id = req.params.id;
    db.query(
        "DELETE FROM producto WHERE id=?",
        [id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            } else {
                res.send("Valores eliminados con éxito");
            }
        }
    );
});

app.patch("/updateStock/:id", (req, res) => {
    const id = req.params.id;
    const { cantidad_existencias } = req.body;

    db.query(
        "UPDATE producto SET cantidad_existencias = ? WHERE id = ?",
        [cantidad_existencias, id],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(500).send("Error al actualizar existencias");
            } else {
                res.send("Stock actualizado con éxito");
            }
        }
    );
});

app.listen(3001, () => {
    console.log("Server corriendo en port 3001");
});