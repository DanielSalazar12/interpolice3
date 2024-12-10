const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(require("./src/modulos/citizen.js"));
app.use(require("./src/modulos/categoria.js"));
app.use(require("./src/modulos/tipoDelito.js"));
app.use(require("./src/modulos/roles.js"));
app.use(require("./src/modulos/usuarios.js"));
app.use(require("./src/modulos/especies.js"));
app.use(require("./src/modulos/registroDelitos.js"));
app.listen(4102, () => {
  console.log(`server runnig in : $ 4102`);
});

const port = process.env.PORT || 4102;

app.listen(port, () => {
  console.log(`app on in posrt:${port}`);
});