let api = "http://localhost:4102/api/usuarios/";

let contenido = document.querySelector("#contenido");
let frmCrearUsuarios = document.querySelector("#frmCrearUsuario");
let nombre = document.querySelector("#nombreUsuario");
let rol = document.querySelector("#rol");
let apellido = document.querySelector("#apellidoUsuario");
let contra = document.querySelector("#password");
let btnNuevo = document.querySelector("#btnNuevo");

const CrearUsuarios = new bootstrap.Modal(
  document.getElementById("CrearUsuario")
);

let accion = "";

//Esto es para poner en blanco los inputs
btnNuevo.addEventListener("click", () => {
  nombre.value = "";
  rol.value = "";
  apellido.value = "";
  accion = "crear";

  CrearUsuarios.show();
});

/*
funcion necesaria para capturar el evento click por cada 
fila de una tabla 
y obtener el id
element : elemento html
event : evento que desencadena (el evento en si mismo)
selector : id o clase del elemento
handler : manejor del evento (click, onclick)
*/
const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

btnNuevo.addEventListener("click", () => {
  CrearUsuarios.show();
});

frmCrearUsuarios.addEventListener("submit", (e) => {
  if (accion == "crear") {
    e.preventDefault();

    fetch(api + "agregarUsuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre.value,
        rol: rol.value,
        apellido: apellido.value,
        password: contra.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Inserción exitosa");
        console.log(res);
      });
  } else if (accion == "editar") {
    e.preventDefault();
    fetch(api + "editarUsuario/" + idForm, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre.value,
        rol: rol.value,
        apellido: apellido.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.reload();
      });
  }
});

function listartodos() {
  fetch(api + "listartodos")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      contenido.innerHTML = "";

      res.usuario.forEach((usuario) => {
        let fila = `<tr> 
                    <td>${usuario.idusuarios}</td> 
                    <td>${usuario.nombre}</td> 
                    <td>${usuario.rol_idrol}</td> 
                    <td>${usuario.apellido}</td>
                    <td>${usuario.password}</td>
                    <td><button class="btnBorrar btn btn-danger" id="btnBorrar"><i class="bi bi-trash"></i></button></td>
                    <td><button class="btnEditar btn btn-secondary" onclick="editar(${usuario.idusuarios},'${usuario.nombre}',${usuario.rol_idrol},'${usuario.apellido}','${usuario.password}')"><i class="bi bi-pencil-square"></i></button></td>
                </tr>`;
        contenido.innerHTML += fila;
      });
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
}

on(document, "click", ".btnBorrar", (e) => {
  let fila = e.target.parentNode.parentNode;
  let idForm = fila.firstElementChild.innerText;
  let respuesta = window.confirm(
    `Seguro que desea borrar el registro de: ${idForm}`
  );
  if (respuesta) {
    console.log(idForm);
    fetch(api + "eliminarUsuario/" + idForm, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === "ok") {
          fila.remove();
        } else {
          alert('No se pudo eliminar el usuario. Intenta nuevamente.');
        }
      })
      .catch((error) => {
        console.error('Error al eliminar el usuario:', error);
        alert('Hubo un error al intentar eliminar el usuario.');
      });
  }
});

let idForm = "";
function editar(id, nombreUsuario, rolUsuario, apellidoUsuario, passwordUsuario) {
  nombre.value = nombreUsuario;
  rol.value = rolUsuario;
  apellido.value = apellidoUsuario;
  password.value = passwordUsuario;

  accion = "editar";
  CrearUsuarios.show();
  idForm = id;
}


listartodos();
