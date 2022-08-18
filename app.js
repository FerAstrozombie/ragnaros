//Funcion para actualizar el carrito
function actualizarCarrito() {

    const contenedorCarrito = document.getElementById("carrito-contenedor")
    contenedorCarrito.innerHTML = ''
    carrito.forEach((producto) => {
        
                let div = document.createElement("div")
                div.classList.add("productoEnCarrito")
                div.innerHTML =    `<img src= ${producto.img} class= "img-fluid tamañoImagenRender" alt="..."> 
                                    <p class= "carritoParrafo">${producto.nombre}</p>
                                    <p class="carritoParrafo">Precio: $${producto.precio}</p>
                                    <p class="carritoParrafo" id= "">Cantidad: ${producto.cantidad}</p>
                                    <button class= "botonEliminar" id="eliminar${producto.id}" ><i class="fa-solid fa-trash-can"></i></button>
                                    `        
                contenedorCarrito.appendChild(div);

                const botonVaciar = document.getElementById("botonVaciar");
                botonVaciar.addEventListener("click", eliminarTodo)  
                
                contadorCarrito()               

                const botonEliminar = document.getElementById(`eliminar${producto.id}`);
                botonEliminar.addEventListener("click", () =>{

                    const quitarProducto = carrito.find(el => el.id === producto.id)
                    
                    quitarProducto.cantidad--
                    
                    if(quitarProducto.cantidad === 0) {
                        const indice = carrito.indexOf(quitarProducto)
                        carrito.splice(indice, 1)
                    }  
                    
                    contadorCarrito()                    
                    localStorage.setItem("carrito", JSON.stringify(carrito))
                    actualizarCarrito()
                });
    })
}

//Funcion eliminar todo del carrito
function eliminarTodo() {
    localStorage.clear(carrito)
    carrito = []
    contadorCarrito()
    actualizarCarrito()    
}
function contadorCarrito(){
    //Contador carrito
    const contadorCarrito = document.getElementById("contador-carrito");
    contadorCarrito.innerText = carrito.reduce((acc, el) => acc + el.cantidad, 0 )
    localStorage.setItem("contadorCarrito", JSON.stringify(contadorCarrito))
}

//Clase constructora de los productos
class Producto{
    constructor(img, nombre, precio,cantidad, id){
        this.img = img;
        this.nombre = nombre;
        this.precio = precio;
        this.stock = this.stock;
        this.id = id;
        this.vendido = false;
    }

    vender(){
        this.vendido = true;
    }
}
//Definicion del array carrito
let carrito = [];

//Me traigo del local storage si hay procutos en el local storage
let carritoLS = JSON.parse(localStorage.getItem('carrito'))

if (carritoLS) {
    carrito = carritoLS
    actualizarCarrito()
}

//Creo el array con todos mis productos
let productosLista = [];

//Creo una funcion asincrona para traerme los productos del archivo JSON
const cargar = async () => {
    const response = await fetch("../productos.json")
    const productos = await response.json();

    productos.forEach(producto => {
    productosLista.push(new Producto(producto.img, producto.nombre, producto.precio, producto.stock, producto.id));
    });

    //Esta funcion me renderiza los productos y los muestra
    const mostrarProductos = (productos) =>{
    
        const contenedorProductos = document.getElementById("producto-contenedor")
        productos.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("cambioTienda");
            div.innerHTML = `<div data-aos="flip-left" class="cambioTienda"">                        
                                <div class= "ordenTienda">
                                    <h5 class= "card-title">${producto.nombre}</h5>
                                    <img src= ${producto.img}" class= "img-fluid tamañoImagen" alt="...">
                                    <p class= "card-text">Id: ${producto.id}</p>
                                    <p class= "card-text">Descripcion: ${producto.nombre}</p>
                                    <p class= "card-text">Precio: $${producto.precio}</p>
                                    <button class= "botonComprar" id=botonComprar${producto.id}>Comprar</button>                                
                                </div>
                            </div>
                            `
        contenedorProductos.appendChild(div);
        const boton = document.getElementById(`botonComprar${producto.id}`)
        boton.addEventListener("click", () => {            
            const productoElegido = carrito.find(el => el.id === producto.id)
            const {stock} = productos.find(el => el.id === producto.id)
            producto.cantidad= 1;
            if (productoElegido) {
                if((productoElegido.cantidad + 1) <= stock) {
                    productoElegido.cantidad +=1
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No hay stock',
                    
                    })
                    
                }
            } else if (stock > 0) {
                const {img, nombre, id, precio} = productos.find(el => el.id === producto.id)
                carrito.push({img: img, nombre: nombre, id: id, precio: precio, cantidad: producto.cantidad})
                Toastify({
                    text: "Producto agregado al carrito",
                    duration: 3000,
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                }).showToast();
                
            } else {
                Swal.fire ({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No hay suficiente stock', 

                })
                
            }    

            localStorage.setItem("carrito", JSON.stringify(carrito))

            actualizarCarrito()
        })      

    })
    }
    mostrarProductos(productos);
    
};
cargar();

function agregarAlCarrito () {

}
