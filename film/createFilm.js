const express = require("express");
const router = express.Router();
const mysql = require("mysql");

// Conexión a la base de datos cine-aurora
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cine-aurora"
});

db.connect((err) => {
    if (err) {
        console.error(err);
        return;
    }
});

// Mostrar Películas
router.get("/showFilm", (req, res) => {
    db.query('SELECT * FROM film', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error al obtener datos");
        } else {
            res.send(result);
        }
    });
});

// Registro de película
router.post("/createFilm", (req, res) => {
    const { codeFilm, nameFilm } = req.body;
    db.query('INSERT INTO film (codeFilm, nameFilm) VALUES (?, ?)', 
        [codeFilm, nameFilm],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error al registrar película");
            } else {
                res.send("¡Película registrada con ÉXITO!");
            }
        }
    );
});

module.exports = router;
