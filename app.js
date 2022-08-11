//import { productos } from "./productos.js"
//import { carritoIndex } from "./carrito.js"

class Producto{
    constructor(img, nombre, precio,cantidad, id){
        this.img = img;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.id = id;
        this.vendido = false;
    }

    vender(){
        this.vendido = true;
    }
}
let productosLista = [];

const cargar = async () => {
    const response = await fetch("../productos.json")
    const productos = await response.json();

    productos.forEach(producto => {
    productosLista.push(new Producto(producto.img, producto.nombre, producto.precio, producto.cantidad, producto.id));
    });

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
            carritoIndex(producto.id);
            alert(`Se agrego ${producto.nombre}`);
            
        })
    
        let carritoIndex = (productoId) => {
    
            const contenedorCarrito = document.getElementById("carrito-contenedor")
        
            const renderProductosCarrito = () => {
        
                let producto = productos.find(producto => producto.id == productoId);
                productosLista.push(producto);
                localStorage.setItem("producto", JSON.stringify(producto));
                console.log(producto);
                
                producto.cantidad = 1;
        
                let div = document.createElement("div")
                div.classList.add("productoEnCarrito")
                div.innerHTML = `<img src= ${producto.img}" class= "img-fluid tamañoImagenRender" alt="..."> 
                                    <p class= "carritoParrafo">${producto.nombre}</p>
                                    <p class="carritoParrafo">Precio: $${producto.precio}</p>
                                    <p class="carritoParrafo" id= "cantidad${producto.id}">Cantidad: ${producto.cantidad}</p>
                                    <button class= "botonEliminar" id="eliminar${producto.id}" ><i class="fa-solid fa-trash-can"></i></button>
                                `
        
                contenedorCarrito.appendChild(div);
                const botonEliminar = document.getElementById(`eliminar${producto.id}`);
                botonEliminar.addEventListener("click" , eliminarDelCarrito)
                function eliminarDelCarrito(productoId) {
                    const prod = carritoIndex.find((producto) => producto.id == productoId)
                    let i = carritoIndex.indexOf(prod)
                    if (i != -1) {
                        carritoIndex.splice(i, 1)
                    }
                    
                    productosLista()
                
                } 
                
            }
            renderProductosCarrito();
        }
    

    })
    
    }
    mostrarProductos(productos);
    
};
cargar();
