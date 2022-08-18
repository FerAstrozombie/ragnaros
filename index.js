//traemos el boton de cerrar cesion y agregamos el reseteo
let botonCesion = document.getElementById("modificadorBoton2");
botonCesion.addEventListener("click", () => sessionStorage.clear());
botonCesion.addEventListener("click", () => nombre.remove())

let botonArriba = document.getElementById("botonArriba")
botonArriba.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
})

let usuario;
let usuarioStorage = sessionStorage.getItem("usuario");

//Validamos el usuario
if (usuarioStorage) {
    let usuario = usuarioStorage;
    let padre = document.getElementById("nombre")
    let mensaje = document.createElement("p");
    mensaje.innerHTML = `Bienvenid@ ${usuarioStorage}`;
    mensaje.className = "mensajeBinvenida";
    padre.append(mensaje)
    
}else{
    Swal 
        .fire({
            title: "Ingrese usuario",
            input: "text",
            showCancelButton: true,
            cancelButton: "Cancelar",
            })
            .then(resultado =>{
                if (resultado.value){
                    let usuario = resultado.value
                    sessionStorage.setItem("usuario", usuario);
                    let padre = document.getElementById("nombre")
                    let mensaje = document.createElement("p");
                    mensaje.innerHTML = `Bienvenid@ ${usuario}`;
                    mensaje.className = "mensajeBinvenida";
                    padre.append(mensaje)
                }
            })
        }






