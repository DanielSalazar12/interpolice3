let api = "
https://interpolice2.onrender.com/api/registroDelito/";
let contenido = document.querySelector("#contenido");
let btnNuevo = document.querySelector("#btnNuevo");
let descripcion = document.querySelector("#descripcionRegistroDelito");
let idDelito = document.querySelector("#idRegistroDelito");
let frmDescripcionRegistroDelito = document.querySelector(
  "#frmDescripcionRegistroDelito"
);
let accion = "";

let descripcionRegistroDelito = document.querySelector(
  "#descripcionRegistroDelito"
);

const crearRegistroDelitos = new bootstrap.Modal(
  document.getElementById("crearRegistroDelitos")
);

btnNuevo.addEventListener("click", () => {
  descripcionRegistroDelito.value = "";

  accion = "crear";

  crearRegistroDelitos.show();
});

function listartodos() {
  fetch(api + "listartodos")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      contenido.innerHTML = "";

      res.registroDelito.forEach((registroDelito) => {
        let fila = `<tr> 
            <td>${registroDelito.idregistro_delito}</td> 
            <td>${registroDelito.descripcion}</td> 
            <td>${registroDelito.fecha_registro}</td> 
            <td>${registroDelito.tipo_delito_idtipo_delito}</td> 
            <td><button class="btnBorrar btn btn-danger" id="btnBorrar"><i class="bi bi-trash"></i></button></td>
            <td><button class="btnEditar btn btn-secondary"Onclick="editar(${registroDelito.idregistro_delito},'${registroDelito.descripcion}',${registroDelito.tipo_delito_idtipo_delito})"><i class="bi bi-pencil-square"></i></button></td>
          </tr>`;
        contenido.innerHTML += fila;
      });
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
}

frmDescripcionRegistroDelito.addEventListener("submit", (e) => {
  e.preventDefault();

  if (accion == "crear") {
    e.preventDefault();
    fetch(api + "agregarRegistro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        descripcion: descripcion.value,
        tipo_delito_idtipo_delito: tipo_delito_idtipo_delito.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Inserción exitosa");
        console.log(res);
        location.reload();
      })
      .catch((error) => {
        console.error("Error al agregar el rol:", error);
      });
  }/*  else if (accion == "editar") {
    e.preventDefault();
    fetch(api + "editarEspecie/" + idForm, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: especie.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.reload();
      })
      .catch((error) => {
        console.error("Error al editar el usuario:", error);
      });
  } */
});

let idFrom = "";
function editar(id, descripcionRegistro, idDelito) {
  descripcion.value = descripcionRegistro;
  idDelito = idDelito;

  accion = "editar";
  crearRegistroDelitos.show();
  idForm = id;
}

listartodos();
