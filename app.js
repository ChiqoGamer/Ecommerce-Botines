// Cierra el menú al hacer clic en cualquier enlace del menú
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('menu-toggle').checked = false;
    });
});

function mostrarAlerta(mensaje) {
    const alerta = document.getElementById('alerta-personalizada');

    // Asegurarse de reiniciar la animación
    alerta.style.display = 'block'; // Mostrarlo en pantalla
    alerta.textContent = mensaje;
    alerta.classList.remove('alerta-mostrar'); // Reinicio por si ya estaba
    void alerta.offsetWidth; // Forzar reflow para reiniciar animación
    alerta.classList.add('alerta-mostrar');

    // Limpiar cualquier timeout anterior
    if (alerta.timeoutId) {
        clearTimeout(alerta.timeoutId);
    }

    // Ocultar después de 2 segundos
    alerta.timeoutId = setTimeout(() => {
        alerta.classList.remove('alerta-mostrar');
        alerta.style.display = 'none';
    }, 2000);
}


document.addEventListener("DOMContentLoaded", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const renderizarProductos = () => {
        // url = "https://dummyjson.com/products";
        //url = "https://dummyjson.com/products?limit=10";
        url = "https://dummyjson.com/products/category/mobile-accessories";
        fetch(url)
            .then((respuesta) => respuesta.json())
            .then((datos) => {
                let contenedorProductos = document.getElementById("contenedor-productos");

                for (const producto of datos.products) {
                    let tarjetaProducto = document.createElement("article");
                    tarjetaProducto.classList.add("tarjeta-producto");

                    let imagenProducto = document.createElement("img")
                    imagenProducto.src = producto.images[0]
                    imagenProducto.alt = producto.description


                    let tituloProducto = document.createElement("h3");
                    tituloProducto.textContent = producto.title;
                    tituloProducto.classList.add("titulo-prodcuto");

                    let precioProducto = document.createElement("p")
                    precioProducto.textContent = `$ ${producto.price}`

                    let botonAgregar = document.createElement("button")
                    botonAgregar.textContent = "Agregar"

                    botonAgregar.addEventListener("click", () => {
                        //alert(`${producto.title} agregado al carrito`)
                        mostrarAlerta(`${producto.title} agregado al carrito`)
                        agregarProducto(producto);
                        actualizarAgregados();
                    })

                    tarjetaProducto.appendChild(imagenProducto);
                    tarjetaProducto.appendChild(tituloProducto);
                    tarjetaProducto.appendChild(precioProducto);
                    tarjetaProducto.appendChild(botonAgregar);

                    contenedorProductos.appendChild(tarjetaProducto);

                }
            })
            .catch((error) => {
                console.error("ERROR: ", error);

            })
    }


    const agregarProducto = (producto) => {
        carrito.push(producto)
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }

    const actualizarAgregados = () => {
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

    renderizarProductos();
    actualizarAgregados();

});