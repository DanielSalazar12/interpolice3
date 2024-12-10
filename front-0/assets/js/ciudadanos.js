let api = "
https://interpolice2.onrender.com/api/ciudadano/";
let contenido = document.querySelector("#contenido");
let nombre = document.querySelector("#nombreCitizen");
let apellido = document.querySelector("#apellidosCitizen");
let apodo = document.querySelector("#apodoCitizen");
let email = document.querySelector("#emailCitizen");
let foto = document.querySelector("#fotoCitizen");
let fechaNace = document.querySelector("#fechaNace");
let especieCitizen = document.querySelector('#especieCitizen');
let frmCrearCitizen = document.querySelector("#frmCrearCitizen");
let btnNuevo = document.querySelector("#btnNuevo");
let accion = "";


const CrearCitizen = new bootstrap.Modal(
  document.getElementById("CrearCitizen")
);



btnNuevo.addEventListener("click", () => {
  nombre.value = "";
  apellido.value = "";
  apodoCitizen.value = "";
  email.value = "";
  foto.value = "";
  fechaNace.value = "";
  accion == "crear";
  console.log("rewe5r");
  CrearCitizen.show();
});


frmCrearCitizen.addEventListener("submit", (e) => {
  e.preventDefault();
  if (accion == 'crear') {

    fetch(api + "agregarCiudadano", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre.value,
        apellidos: apellido.value,
        apodo: apodo.value,
        email: email.value,
        foto: foto.value,
        fechanace: fechaNace.value,
        especieCitizen: especieCitizen.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("Inserción exitosa");
        console.log(res);
        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else if (accion == "editar") {

    fetch(api + "editarporid/" + idForm, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        nombre: nombre.value,
        apellidos: apellido.value,
        apodo: apodo.value,
        email: email.value,
        foto: foto.value,
        fechanace: fechaNace.value,
        especieCitizen: especieCitizen.value,
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

      res.ciudadano.forEach((ciudadano) => {
        let fila = `<tr> 
          <td>${ciudadano.id}</td> 
          <td>${ciudadano.nombre}</td> 
          <td>${ciudadano.apellidos}</td> 
          <td>${ciudadano.apodo}</td>
          <td>${ciudadano.email}</td>
          <td><img src="${ciudadano.foto}" alt="Foto" width="50" height="50"></td>  
          <td>${ciudadano.fechanace.slice(0, 10)}</td>
          <td>${ciudadano.especie_ciudadano_idespecie_ciudadano}</td>
          <td><button class="btnBorrar btn btn-danger" id="btnBorrar"><i class="bi bi-trash"></i></button></td>
          <td><button class="btnEditar btn btn-secondary" Onclick="editar(${ciudadano.id},'${ciudadano.nombre}','${ciudadano.apellidos}','${ciudadano.apodo}','${ciudadano.email}','${ciudadano.foto}','${ciudadano.fechanace}',${ciudadano.especie_ciudadano_idespecie_ciudadano})"><i class="bi bi-pencil-square"></i></button></td>
        </tr>`;
        contenido.innerHTML += fila;
      });
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
}

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

on(document, "click", ".btnBorrar", (e) => {
  let fila = e.target.parentNode.parentNode;
  let idForm = fila.firstElementChild.innerText;
  let respuesta = window.confirm(
    `Seguro que desea borrar el registro de: ${idForm}`
  );
  if (respuesta) {
    console.log(idForm);
    fetch(api + "eliminarCiudadano/" + idForm, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (res.status === "ok") {
          fila.remove();
        } else {
          alert('No se pudo eliminar el ciudadano. Intenta nuevamente.');
        }
      })
      .catch((error) => {
        console.error('Error al eliminar el ciudadano:', error);
        alert('Hubo un error al intentar eliminar el ciudadano.');
      });
  }
});


function editar(idCitizen, nombreCitizen, apellidoCitizen, apodoCitizen, emailCitizen, fotoCitizen, fechaNacimientoCitizen, idEspecieCitizen) {

  nombre.value = nombreCitizen;
  apellido.value = apellidoCitizen;
  apodo.value = apodoCitizen;
  email.value = emailCitizen;
  foto.value = fotoCitizen;
  fechaNace.value = fechaNacimientoCitizen;
  especieCitizen.value = idEspecieCitizen;
  console.log(nombreCitizen);


  accion = "editar";
  CrearCitizen.show();
  idForm = idCitizen;
}



function eliminar(id) {

  accion = "editar";
  CrearCitizen.show();
  idForm = id;
}


listartodos();