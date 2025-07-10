document.addEventListener("DOMContentLoaded", () =>{
    const renderizarProductos= () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        productosEnCarrito(carrito);
        
        let seccionProductos = document.getElementById("contenedor-carrito")
        seccionProductos.innerHTML= ""

        if(!carrito.length){
            let mensajeCarrito = document.createElement("p")
            mensajeCarrito.classList.add("mensaje-carrito")
            mensajeCarrito.textContent = "No hay items en el carrito"
            mensajeCarrito.style.color= 'white'
            mensajeCarrito.style.textAlign='center'
            mensajeCarrito.style.margin='100px'

            let seccionPrincipal = document.getElementById("seccion-principal")
            seccionPrincipal.appendChild(mensajeCarrito)            

            const ocultarResumen = document.getElementById("resumen-carrito")
            ocultarResumen.style.display = 'none';
            const ocultarDescripcion = document.getElementById("descripcion")
            ocultarDescripcion.style.display= 'none';
        }
        else{
            carrito.forEach((element,index) => {
                let tarjetaProducto= document.createElement("article")
                tarjetaProducto.classList.add("producto-carrito")
                
                let imagenProducto = document.createElement("img")
                imagenProducto.src = element.images[0]
                
                let tituloProducto = document.createElement("h3")
                tituloProducto.textContent = element.title  
                tituloProducto.classList.add("titulo-producto")              

                let precioProducto = document.createElement("p")
                precioProducto.textContent = `$ ${element.price}`
                precioProducto.classList.add("precio-producto")
                
                let btnEliminar = document.createElement("button")
                btnEliminar.classList.add("btn-eliminar")
                btnEliminar.textContent = "❌ Eliminar"
    
                btnEliminar.addEventListener("click", () => {
                    eliminarProducto(index)
                })

                tarjetaProducto.appendChild(imagenProducto)
                tarjetaProducto.appendChild(tituloProducto)
                tarjetaProducto.appendChild(precioProducto)
                tarjetaProducto.appendChild(btnEliminar)

                seccionProductos.appendChild(tarjetaProducto)
            });

        }
        actualizarAgregados(carrito)
        renderizarBotones()

    }
    
    const renderizarBotones = () => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

        let divAcciones = document.getElementById("acciones-carrito")
        divAcciones.innerHTML = ""

        if(carrito.length){
            let btnVaciar = document.createElement("button")
            btnVaciar.classList.add("btn-vaciar")
            btnVaciar.textContent = "LIMPIAR CARRITO"

            btnVaciar.addEventListener("click",() => {
                vaciarCarrito()
            })

            let btnFinalizar = document.createElement("button")
            btnFinalizar.classList.add("btn-finalizar")
            btnFinalizar.textContent = "FINALIZAR COMPRA"

            btnFinalizar.addEventListener("click", () => {
                let confimado = confirm("Estas seguro que deseas finalizar la copmpra ?")
                if(confimado){
                    alert("Gracias por su compra")
                    localStorage.removeItem("carrito")
                    window.location.href = "./index.html"
                }
            })


            divAcciones.appendChild(btnVaciar)
            divAcciones.appendChild(btnFinalizar)
        }
    }

    const productosEnCarrito = (carrito) => {
        let contadorCarrito =document.getElementById("contador-carrito")
        contadorCarrito.textContent = carrito.length
    };

    const eliminarProducto = (index) => {
        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        carrito.splice(index, 1)

        localStorage.setItem("carrito",JSON.stringify(carrito))
        alert("Eliminado del carrito")
        renderizarProductos()
    }

    const vaciarCarrito = () => {
        localStorage.removeItem("carrito")
        alert("Vaciando carrito")
        renderizarProductos()
    }

     const actualizarAgregados = (carrito) => {
        const contadorCarrito = document.getElementById("contador-carrito")
        if (carrito.length > 0) {
            contadorCarrito.textContent = carrito.length;
            contadorCarrito.style.display = 'inline-block';
        }
        else {
            contadorCarrito.textContent = '';
            contadorCarrito.style.display = 'none';
        }
    }

    renderizarProductos()    
})