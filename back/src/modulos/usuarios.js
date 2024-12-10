// MODULOS PARA ADMINISTRAR LA INFO DE LOS CIUDADANOS
const express = require("express");
const bd = require("./bd.js");
const usuario = express();

usuario.get("/api/usuarios/listartodos", (req, res) => {
  let consulta = "SELECT * from usuarios";
  bd.query(consulta, (error, usuario) => {
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
        usuario: usuario,
      });
    }
  });
});

usuario.post("/api/usuarios/agregarUsuario", (req, res) => {
  let frmDatos = {
    nombre: req.body.nombre,
    rol_idrol: req.body.rol,
    apellido: req.body.apellido,
    password: req.body.password,
  };

  let consulta = "INSERT INTO usuarios SET ?";
  bd.query(consulta, [frmDatos], (error, usuario) => {
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
        usuario: usuario,
      });
    }
  });
});


usuario.put("/api/usuarios/editarUsuario/:id", (req, res) => {
  // Recibimos los datos enviadoes desde el formulario

  let id = req.params.id;

  let frmDatos = {
    nombre: req.body.nombre,
    rol_idrol: req.body.rol,
    apellido: req.body.apellido,
  };

  // HACEMOS CONSULTA

  let consulta = "UPDATE usuarios SET ? WHERE idusuarios = ?";
  bd.query(consulta, [frmDatos, id], (error, rol) => {
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

usuario.delete("/api/usuarios/eliminarUsuario/:id", (req, res) => {
  let id = req.params.id;

  let consulta = "DELETE FROM usuarios WHERE idusuarios = ?";
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
        mensaje: "No se encontró un usuario con ese ID.",
      });
    }

    res.send({
      status: "ok",
      mensaje: "Usuario eliminado con éxito.",
    });
  });
});


module.exports = usuario;
