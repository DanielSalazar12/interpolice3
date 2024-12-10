const express = require("express");

const bd = require("./bd.js");
const rol = express();

rol.get("/api/rol/listartodos", (req, res) => {
  let consulta = "SELECT * FROM rol";
  bd.query(consulta, (error, rol) => {
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
        rol: rol,
      });
    }
  });
});

rol.post("/api/rol/agregarRol", (req, res) => {
  let frmDatos = {
    nombre: req.body.nombre,
  };

  let consulta = "INSERT INTO rol SET ?";
  bd.query(consulta, [frmDatos], (error, rol) => {
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
        rol: rol,
      });
    }
  });
});

rol.put("/api/rol/editarRol/:id", (req, res) => {

  let id = req.params.id;

  let frmDatos = {
    nombre: req.body.nombre,
  };

  let consulta = "Update rol set ? where idrol=?";
  bd.query(consulta, [frmDatos, id], (error, rol) => {
    if (error) {
      res.status(400).send({
        status: "error",
        mensaje: "Ocurrió un error en la consulta.",
        error: error,
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "Consulta exitosa.",
        rol: rol,
      });
    }
  });
});

rol.delete("/api/rol/eliminarRol/:id", (req, res) => {

  let id = req.params.id;


  let consulta = "Delete from rol where idrol=?";
  bd.query(consulta, [id], (error, rol) => {
    if (error) {
      res.status(400).send({
        status: "error",
        mensaje: "Ocurrió un error en la consulta.",
        error: error,
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "Consulta exitosa.",
        rol: rol,
      });
    }
  });
});
module.exports = rol;
