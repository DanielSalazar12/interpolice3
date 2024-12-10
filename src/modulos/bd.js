// ADMINSTRACION DE LA CONEXION A LA BD 
// USANDO CALLBACKS


const mysql = require("mysql2"); // PRINCIPIO DE INMUTABILIDAD

// CADENA DE CONEXION
// Create the connection to database
const cnx = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "interpolice"
});

// A simple SELECT query

 cnx.query("SELECT * FROM citizen",(err, results) => {
    console.log(results); // results contains rows returned by server
    
 })


cnx.connect((error) => {
  if (error) {
    console.log(`Error en la conxion: \n ${error}`);
  } else {
    console.log("Conexion exitosa");
  }
});

module.exports = cnx;
