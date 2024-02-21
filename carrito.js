// Obtener los datos del localStorage
const userLogin = JSON.parse(localStorage.getItem('userLogin')) || [];
const userData = JSON.parse(localStorage.getItem('userData')) || [];

// Función para generar tarjetas
function generarTarjetas() {
    const contenedorTarjetas = document.getElementById('tarjetasContenedor');

    // Limpiar el contenedor antes de agregar nuevas tarjetas
    contenedorTarjetas.innerHTML = '';

    // Iterar sobre los datos y crear tarjetas dinámicas
    if (userLogin.carrito.length === 0) {
        const tarjeta = document.createElement('h5');
        tarjeta.classList.add('tarjeta');
        tarjeta.classList.add('vh-0');
        tarjeta.innerHTML = `
            Agrega productos a tu carrito.
        `;
        contenedorTarjetas.appendChild(tarjeta);
    } else {
        userLogin.carrito.forEach((producto, index) => {
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta');
            tarjeta.classList.add('card');
            tarjeta.style.width = "18rem"
            tarjeta.classList.add('p-0')

            // Crear contenido de la tarjeta
            tarjeta.innerHTML = `
            <img class="card-img-top" src="./imgs/${producto.imagen}" alt="${producto.nombre}" style="width: 100%; height: 400px; object-fit: cover;"></img>
            <div class="d-flex justify-content-between align-items-end card-body">
                <div>                
                    <h5 class="titulo card-title">${producto.nombre}</h5>
                    <p class="descripcion card-text">${producto.descripcion}</p>
                </div>
                <button class="btn-delete btn btn-danger bg-danger fw-bold" onclick="eliminarCard(${index})">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                </button>
            </div>
            `;

            // Agregar la tarjeta al contenedor
            contenedorTarjetas.appendChild(tarjeta);
        });
    }
}

function eliminarCard(idProducto) {
    const carritoUsuario = userLogin.carrito;

    const producto = carritoUsuario[idProducto];

    if (producto) {
        carritoUsuario.splice(idProducto, 1);

        localStorage.setItem('userLogin', JSON.stringify(userLogin));
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

    location.reload();
}

// Llamar a la función para generar las tarjetas cuando se cargue la página
window.onload = generarTarjetas;