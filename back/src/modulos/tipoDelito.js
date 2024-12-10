const express = require("express");

const bd = require("./bd.js");
const delito = express();

delito.get("/api/delito/listartodos", (req, res) => {
  let consulta = "SELECT * FROM tipo_delito";  // Sintaxis SQL correcta

  bd.query(consulta, (error, delito) => {
    if (error) {
      res.status(500).send({
        status: "error",
        mensaje: "Ocurrió un error en la consulta.",
        error: error
      });
    } else {
      res.send({
        status: "ok",
        mensaje: "Consulta exitosa.",
        delito: delito
      });
    }
  });
});

delito.post("/api/delito/agregarDelito", (req, res) => {
  let frmDatos = {
    delito: req.body.delito,
  };

  let consulta = "INSERT INTO tipo_delito SET ?";
  bd.query(consulta, [frmDatos], (error, rol) => {
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


delito.put("/api/delito/editarDelito/:id", (req, res) => {

  let id = req.params.id;

  let frmDatos = {
    delito: req.body.delito,
  };

  let consulta = "Update tipo_delito set ? where idtipo_delito=?";
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

delito.delete("/api/delito/eliminarDelito/:id", (req, res) => {
  let id = req.params.id;

  let consulta = "DELETE FROM tipo_delito where idtipo_delito=?";
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
        mensaje: "No se encontró un delito con ese ID.",
      });
    }

    res.send({
      status: "ok",
      mensaje: "Delito eliminado con éxito.",
    });
  });
});


module.exports = delito
