let api = "https://interpolice2.onrender.com/api/especie/";
let frmCrearEspecie = document.querySelector("#frmCrearEspecie");
let especie = document.querySelector("#especie");
let btnNuevo = document.querySelector("#btnNuevo");
let contenido = document.querySelector("#contenido");

const crearEspecie = new bootstrap.Modal(
  document.getElementById("crearEspecie")
);

btnNuevo.addEventListener("click", () => {
  especie.value = "";

  accion = "crear";

  crearEspecie.show();
});

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

function listartodos() {
  fetch(api + "listartodos")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      contenido.innerHTML = "";

      res.especie.forEach((especie) => {
        let fila = `<tr> 
            <td>${especie.idespecie_ciudadano}</td> 
            <td>${especie.nombre}</td> 
            <td><button class="btnBorrar btn btn-danger" id="btnBorrar"><i class="bi bi-trash"></i></button></td>
            <td><button class="btnEditar btn btn-secondary"Onclick="editar(${especie.idespecie_ciudadano},'${especie.nombre}')"><i class="bi bi-pencil-square"></i></button></td>
          </tr>`;
        contenido.innerHTML += fila;
      });
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
}

frmCrearEspecie.addEventListener("submit", (e) => {
  e.preventDefault();

  if (accion == "crear") {
    e.preventDefault();
    fetch(api + "agregarEspecie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: especie.value,
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
  } else if (accion == "editar") {
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
  }
});

let idFrom = "";
function editar(id, nombre) {
  especie.value = nombre;

  accion = "editar";
  crearEspecie.show();
  idForm = id;
}

on(document, "click", ".btnBorrar", (e) => {
  let fila = e.target.parentNode.parentNode;
  let idForm = fila.firstElementChild.innerText;
  let respuesta = window.confirm(
    `Seguro que desea borrar el registro de: ${idForm}`
  );
  if (respuesta) {
    console.log(idForm);
    fetch(api + "eliminarEspecie/" + idForm, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === "ok") {
          fila.remove();
        } else {
          alert("No se pudo eliminar el especie. Intenta nuevamente.");
        }
      })
      .catch((error) => {
        console.error("Error al eliminar el especie:", error);
        alert("Hubo un error al intentar eliminar el especie.");
      });
  }
});

listartodos();
