let api = "
https://interpolice2.onrender.com/api/delito/";
let delito = document.querySelector("#delito");
let contenido = document.querySelector("#contenido");
let frmCrearDelito = document.querySelector("#frmCrearDelito");
let btnNuevo = document.querySelector("#btnNuevo");
let accion = "";


const crearDelito = new bootstrap.Modal(
    document.getElementById("crearDelito")
);


btnNuevo.addEventListener('click', () => {
    delito.value = "";

    accion = 'crear';

    crearDelito.show();
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

            res.delito.forEach((delito) => {
                let fila = `<tr> 
            <td>${delito.idtipo_delito}</td> 
            <td>${delito.delito}</td> 
            <td><button class="btnBorrar btn btn-danger" id="btnBorrar"><i class="bi bi-trash"></i></button></td>
            <td><button class="btnEditar btn btn-secondary"Onclick="editar(${delito.idtipo_delito},'${delito.delito}')"><i class="bi bi-pencil-square"></i></button></td>
          </tr>`;
                contenido.innerHTML += fila;
            });
        })
        .catch((error) => {
            console.error("Error al obtener los datos:", error);
        });
}


let idFrom = "";
function editar(id, descDelito) {
    delito.value = descDelito;

    accion = "editar";
    crearDelito.show();
    idForm = id;
}


frmCrearDelito.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log("rewte45y");

    if (accion == "crear") {
        e.preventDefault();
        fetch(api + "agregarDelito", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                delito: delito.value,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log("Inserción exitosa");
                console.log(res);
                location.reload();
            })
            .catch((error) => {
                console.error('Error al agregar el rol:', error);
            });
    } else if (accion == "editar") {
        e.preventDefault();
        fetch(api + "editarDelito/" + idForm, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                delito: delito.value,
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
        fetch(api + "eliminarDelito/" + idForm, {
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




listartodos();
