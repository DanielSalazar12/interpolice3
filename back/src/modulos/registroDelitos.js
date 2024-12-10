const express = require("express");

const bd = require("./bd.js");
const registroDelito = express();

registroDelito.get("/api/registroDelito/listartodos", (req, res) => {
  let consulta = "SELECT * from usuarios registro_delito";
  bd.query(consulta, (error, registroDelito) => {
    if (error) {
      res.status(404).send({
        status: "error",
        mensaje: "Ocurrió un error en la consulta.",
        error: error,
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "Consulta exitosa.",
        registroDelito: registroDelito,
      });
    }
  });
});

registroDelito.post("/api/registro/agregarRegistro", (req, res) => {
  let frmDatos = {
    descripcion: req.body.descripcion,
    tipo_delito_idtipo_delito : req.body.tipo_delito_idtipo_delito,
  };

  let consulta = "INSERT INTO registro_delito SET ?";
  bd.query(consulta, [frmDatos], (error, registroDelito) => {
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
        registroDelito: registroDelito,
      });
    }
  });
});

module.exports = registroDelito;
