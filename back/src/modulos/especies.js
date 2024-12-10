const express = require("express");

const bd = require("./bd.js");
const especie = express();

especie.get("/api/especie/listartodos", (req, res) => {
    let consulta = "SELECT * FROM especie_ciudadano";
    bd.query(consulta, (error, especie) => {
        if (error) {
            res.status(404).send({
                status: "error",
                mensaje: "ocurrio un error en la consulta !",
                error: error,
            });
        } else {
            res.send({
                status: "ok",
                mensaje: "Consulta exitosa !",
                especie: especie,
            });
        }
    });
});

especie.post("/api/especie/agregarEspecie", (req, res) => {
    let frmDatos = {
        nombre: req.body.nombre,
    };

    let consulta = "INSERT INTO especie_ciudadano SET ?";
    bd.query(consulta, [frmDatos], (error, especie) => {
        if (error) {
            res.status(500).send({
                status: "error",
                mensaje: "Ocurrió un error en la consulta.",
                error: error,
            });
        } else {
            res.send({
                status: "ok",
                mensaje: "Consulta exitosa.",
                especie: especie,
            });
        }
    });
});

especie.delete("/api/especie/eliminarEspecie/:id", (req, res) => {
    let id = req.params.id;

    let consulta = "DELETE FROM especie_ciudadano where idespecie_ciudadano =?";
    bd.query(consulta, [id], (error, resultado) => {
        if (error) {
            return res.status(400).send({
                status: "error",
                mensaje: "Ocurrió un error en la consulta.",
                error: error,
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).send({
                status: "error",
                mensaje: "No se encontró un especie con ese ID.",
            });
        }

        res.send({
            status: "ok",
            mensaje: "especie eliminado con éxito.",
        });
    });
});

module.exports = especie;