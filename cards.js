// Obtener los datos del localStorage
const productos = JSON.parse(localStorage.getItem('productData')) || [];
const userLogin = JSON.parse(localStorage.getItem('userLogin')) || {};
const userData = JSON.parse(localStorage.getItem('userData')) || [];
const isAdmin = !localStorage.getItem('userLogin') || (localStorage.getItem('userLogin') && JSON.parse(localStorage.getItem('userLogin')).admin === true);

// Función para generar tarjetas
function generarTarjetas() {
    const contenedorTarjetas = document.getElementById('tarjetasContenedor');

    // Limpiar el contenedor antes de agregar nuevas tarjetas
    contenedorTarjetas.innerHTML = '';

    // Iterar sobre los datos y crear tarjetas dinámicas
    productos.forEach((producto) => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta');
        tarjeta.classList.add('card');
        tarjeta.style.width = "18rem"
        tarjeta.classList.add('my-3');
        tarjeta.classList.add('p-0');

        // Crear contenido de la tarjeta
        tarjeta.innerHTML =
            `
            <img class="card-img-top" src="./imgs/${producto.imagen}" alt="${producto.nombre}" style="width: 100%; height: 400px; object-fit: cover;"></img>
            <div class="card-body">
                <h5 class="titulo card-title">${producto.nombre}</h5>
                <p class="descripcion card-text">${producto.descripcion}</p>
                <div class= "${isAdmin ? 'd-none' : ''}"> 
                    <div class="d-flex justify-content-between">
                        </button>
                        <p id="precio${producto.id}"class="card-text fw-bolder">${producto.precio} ARS</p>
                        <div class="d-flex justify-content-center align-content-center col-5">
                            <button class="btn fw-bolder" onclick="botonTicketResta(${producto.id})">-</button>
                            <span id="cantidad${producto.id}" class="mx-3 my-1 fw-bolder">${1}</span>
                            <button class="btn fw-bolder" onclick="botonTicketSuma(${producto.id})">+</button>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between form-check">
                        <input class="funcion1 form-check-input" type="radio" id="funcion1" name="grupo" value="opcion1">
                        <label class="form-check-label" id="funcion1${producto.id}" for="funcion1${producto.id}">${convertirFormato(producto.funcion1)}</label>
                    </div>
                    <div class="d-flex justify-content-between form-check">
                        <input class="funcion2 form-check-input" type="radio" id="funcion2" name="grupo" value="opcion2">
                        <label class="form-check-label" id="funcion2${producto.id}" for="funcion2${producto.id}">${convertirFormato(producto.funcion2)}</label>
                    </div>
                    <div class="d-flex justify-content-between mt-2">                    
                        <button id="botonAgregarAlCarrito" class="btn fw-bold" onclick="agregarAlCarrito(${producto.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-heart-fill" viewBox="0 0 16 16">
                                <path d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132"/>
                            </svg>
                        </button>
                        <button id="botonComprar" class="btn fw-bold ms-2 col" onclick="comprarPelicula(${producto.id})">COMPRAR</button>
                    </div>
                </div>
            </div>
        `;
        // Agregar la tarjeta al contenedor
        contenedorTarjetas.appendChild(tarjeta);
    });
}

function convertirFormato(fechaISO) {
    const fecha = new Date(fechaISO);

    const nombresDias = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];

    const diaSemana = nombresDias[fecha.getDay()];

    const diaMes = fecha.getDate();

    const mes = fecha.getMonth() + 1;

    //const año = fecha.getFullYear();

    const hora = agregarCeroDelante(fecha.getHours());

    const minutos = agregarCeroDelante(fecha.getMinutes());

    const resultado = `${diaSemana} ${agregarCeroDelante(mes)}/${agregarCeroDelante(diaMes)} ${hora}:${minutos}`;

    return resultado;
}

// Función auxiliar para agregar un cero delante de un número si es menor que 10
function agregarCeroDelante(numero) {
    return numero < 10 ? `0${numero}` : numero;
}

function botonTicketSuma(idProducto) {
    const cantidadElemento = document.getElementById(`cantidad${idProducto}`);
    let cantidad = parseInt(cantidadElemento.innerHTML);
    if (cantidad < 10) {
        cantidad++;
        cantidadElemento.innerHTML = cantidad;
        actualizarPrecio(idProducto, cantidad);
    } else {
        alert("No puedes agregar más de 10 entradas.");
    }
}

function botonTicketResta(idProducto) {
    const cantidadElemento = document.getElementById(`cantidad${idProducto}`);
    let cantidad = parseInt(cantidadElemento.innerHTML);
    if (cantidad > 1) {
        cantidad--;
        cantidadElemento.innerHTML = cantidad;
        actualizarPrecio(idProducto, cantidad);
    }
}

function actualizarPrecio(idProducto, cantidad) {
    const producto = productos.find(producto => producto.id == idProducto);
    const precioElemento = document.getElementById(`precio${idProducto}`);
    if (producto && precioElemento) {
        const nuevoPrecio = producto.precio * cantidad;
        precioElemento.textContent = `${nuevoPrecio} ARS`;
        // También actualizamos el precio real en el objeto producto
        producto.precioTotal = nuevoPrecio;
    }
}

function comprarPelicula(idProducto) {
    const cantidadElemento = document.getElementById(`cantidad${idProducto}`);
    let cantidad = parseInt(cantidadElemento.innerHTML);
    const productoComprado = productos.find(producto => producto.id == idProducto);


    let funcionSeleccionada = '';
    const radioButtons = document.querySelectorAll('input[type="radio"][name="grupo"]');
    radioButtons.forEach((radioButton) => {
        if (radioButton.checked) {
            const idSeleccionado = radioButton.id;
            const labelSeleccionado = document.querySelector(`label[for="${idSeleccionado}${idProducto}"]`);
            funcionSeleccionada = labelSeleccionado.innerHTML;
        }
    });

    if (cantidad <= productoComprado.tickets) {
        alert("Tu compra ha sido realizada con éxito.");

        // Crear un objeto que represente la compra
        const compra = {
            usuario: userLogin.correo, // o cualquier identificador único de usuario que tengas
            producto: productoComprado.nombre,
            cantidad: cantidad,
            precio: productoComprado.precio,
            funcion: funcionSeleccionada,
            total: cantidad * productoComprado.precio,
            fecha: new Date().toISOString() // Fecha actual
            // Puedes agregar más detalles según sea necesario
        };

        // Obtener el historial de compras del localStorage
        const historialCompras = JSON.parse(localStorage.getItem('historialCompras')) || [];

        // Agregar esta compra al historial de compras global
        historialCompras.push(compra);

        // Actualizar el historial de compras en el localStorage
        localStorage.setItem('historialCompras', JSON.stringify(historialCompras));

        // Actualizar el stock de tickets del producto
        if (productoComprado) {
            productoComprado.tickets -= cantidad;
            localStorage.setItem('productData', JSON.stringify(productos));
        }

        // Actualizar localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('userLogin', JSON.stringify(userLogin));

        cantidadElemento.innerHTML = 1;
    } else {
        alert(`Solo quedan ${productoComprado.tickets} entradas disponibles.`);
        cantidadElemento.innerHTML = 1;
    }
}

function agregarAlCarrito(idProducto) {
    // Aquí puedes agregar la lógica para agregar el producto al carrito
    // Puedes usar el id del producto para identificar qué producto agregar al carrito

    const producto = productos.find(producto => producto.id == idProducto)
    console.log(producto)

    if (producto) {
        const productoEnCarrito = userLogin.carrito.find(item => item.id == producto.id)

        if (productoEnCarrito) {
            // Mostrar un alert indicando que el producto ya está en el carrito
            return alert('Producto ya existente');
        } else {
            userLogin.carrito.push(producto)
            localStorage.setItem('userLogin', JSON.stringify(userLogin));
            alert('Producto agregado al carrito');
        }

        const usuarioIndex = userData.findIndex(usuario => usuario.correo === userLogin.correo);

        if (usuarioIndex !== -1) {
            // Si se encuentra al usuario, actualizar su carrito en userData
            userData[usuarioIndex].carrito = userLogin.carrito;
            // Actualizar userData en localStorage
            localStorage.setItem('userData', JSON.stringify(userData));
            console.log('Carrito del usuario actualizado en userData');
        } else {
            console.log('Usuario no encontrado en userData');
        }
    }
}

// Llamar a la función para generar las tarjetas cuando se cargue la página
window.onload = generarTarjetas;