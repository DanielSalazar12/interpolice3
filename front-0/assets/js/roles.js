let api = "http://localhost:4102/api/rol/";
let contenido = document.querySelector("#contenido");
let btnNuevo = document.querySelector("#btnNuevo");
let frmCrearRol = document.querySelector("#frmCrearRol");
let nombre = document.querySelector("#nombreRol");
let accion = "";

const CrearRol = new bootstrap.Modal(
  document.getElementById("CrearRol")
);


btnNuevo.addEventListener('click', () => {
  nombre.value = "";

  accion = 'crear';

  CrearRol.show();
})
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

      res.rol.forEach((rol) => {
        let fila = `<tr> 
          <td>${rol.idrol}</td> 
          <td>${rol.nombre}</td> 
          <td><button class="btnBorrar btn btn-danger" id="btnBorrar"><i class="bi bi-trash"></i></button></td>
          <td><button class="btnEditar btn btn-secondary"Onclick="editar(${rol.idrol},'${rol.nombre}')"><i class="bi bi-pencil-square"></i></button></td>
        </tr>`;
        contenido.innerHTML += fila;
      });
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
}

let idFrom = "";
function editar(id, nombreRol) {
  nombre.value = nombreRol;

  accion = "editar";
  CrearRol.show();
  idForm = id;
}



frmCrearRol.addEventListener('submit', (e) => {
  e.preventDefault();

  console.log("rewte45y");

  if (accion == "crear") {
    e.preventDefault();
    fetch(api + "agregarRol", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Inserción exitosa");
        console.log(res);

      })
      .catch((error) => {
        console.error('Error al agregar el rol:', error);
      });
  } else if (accion == "editar") {
    e.preventDefault();
    fetch(api + "editarRol/" + idForm, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.reload();
      })
      .catch((error) => {
        console.error('Error al editar el usuario:', error);
      });
  }
});


on(document, "click", ".btnBorrar", (e) => {
  let fila = e.target.parentNode.parentNode;
  let idForm = fila.firstElementChild.innerText;
  let respuesta = window.confirm(
    `Seguro que desea borrar el registro de: ${idForm}`
  );
  if (respuesta) {
    console.log(idForm);
    fetch(api + "eliminarRol/" + idForm, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === "ok") {
          fila.remove();
        } else {
          alert('No se pudo eliminar el rol. Intenta nuevamente.');
        }
      })
      .catch((error) => {
        console.error('Error al eliminar el rol:', error);
        alert('Hubo un error al intentar eliminar el rol.');
      });
  }
});



listartodos();
