// MODULOS PARA ADMINISTRAR LA INFO DE LOS CIUDADANOS
const express = require("express");

const bd = require("./bd.js");
const ciudadano = express();


/* const frmCrearCitizen = new bootstrap.Modal(
  document.getElementById("frmCrearCitizen")
);
let btnNuevo = document.querySelector("#btnNuevo");

btnNuevo.addEventListener("click", () => {
  frmCrearCitizen.show();
}); */


ciudadano.get("/api/ciudadano/listartodos", (req, res) => {
  let consulta =
    "SELECT id,citizen.nombre,citizen.apellidos,citizen.apodo,citizen.email,citizen.foto,citizen.fechanace,citizen.especie_ciudadano_idespecie_ciudadano FROM citizen ";
  bd.query(consulta, (error, ciudadano) => {
    if (error) {
      res.status(404).send({
        status: "error",
        mensaje: "ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "Consulta exitosa !",
        ciudadano: ciudadano
      });
    }
  });
});

ciudadano.get("/api/ciudadano/listarporid/:id", (req, res) => {
  // recibimos el parametro

  let id = req.params.id;

  let consulta = "SELECT * FROM citizen WHERE id = ? ";
  bd.query(consulta, [id], (error, ciudadano) => {
    if (error) {
      res.status(404).send({
        status: "error",
        mensaje: "ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "Consulta exitosa !",
        ciudadano: ciudadano
      });
    }
  });
});

ciudadano.delete("/api/ciudadano/borrarporid/:id", (req, res) => {

  let id = req.params.id;

  let consulta = "DELETE FROM citizen WHERE id = ? ";
  bd.query(consulta, [id], (error, ciudadano) => {
    if (error) {
      res.status(404).send({
        status: "error",
        mensaje: "ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "Consulta exitosa !",
        ciudadano: ciudadano
      });
    }
  });
});

ciudadano.post("/api/ciudadano/agregarCiudadano", (req, res) => {

  let frmDatos = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    apodo: req.body.apodo,
    email: req.body.email,
    foto: req.body.foto,
    fechanace: req.body.fechanace,
    especie_ciudadano_idespecie_ciudadano: req.body.especieCitizen
  };

  let consulta = "INSERT INTO citizen SET ?";
  bd.query(consulta, [frmDatos], (error, ciudadano) => {
    if (error) {
      res.status(404).send({
        status: "error",
        mensaje: "Ocurrió un error en la consulta.",
        error: error
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "Consulta exitosa.",
        ciudadano: ciudadano
      });
    }
  });
});


ciudadano.put("/api/ciudadano/editarporid/:id", (req, res) => {
  // Recibimos los datos enviado desde el formulario

  let id = req.params.id;

  let frmDatos = {
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    apodo: req.body.apodo,
    email: req.body.email,
    foto: req.body.foto,
    fechanace: req.body.fechanace,
    especie_ciudadano_idespecie_ciudadano: req.body.especieCitizen
  };
  // HACEMOS CONSULTA

  let consulta = "UPDATE citizen SET ? WHERE id = ?";
  bd.query(consulta, [frmDatos, id], (error, ciudadano) => {
    if (error) {
      res.send({
        status: "error",
        mensaje: "ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "Actualizacion exitosa !",
        ciudadano: ciudadano
      });
    }
  });
});

ciudadano.delete("/api/ciudadano/eliminarCiudadano/:id", (req, res) => {
  let id = req.params.id;

  let consulta = "DELETE FROM citizen where id=?";
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
        mensaje: "No se encontró un ciudadanos con ese ID.",
      });
    }

    res.send({
      status: "ok",
      mensaje: "ciudadano eliminado con éxito.",
    });
  });
});


module.exports = ciudadano;
