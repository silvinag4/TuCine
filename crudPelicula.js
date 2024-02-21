const form = document.getElementById('stock');
const idInput = document.getElementById('idInput');
const nombreInput = document.getElementById('nombreInput');
const precioInput = document.getElementById('precioInput');
const ticketsInput = document.getElementById('ticketsInput');
const descripcionInput = document.getElementById('descripcionInput');
const imagenInput = document.getElementById('imagenInput');
const funcion1Input = document.getElementById('funcion1');
const funcion2Input = document.getElementById('funcion2');
const tablaBody = document.getElementById('tablaBody');

let data = JSON.parse(localStorage.getItem('productData')) || [];

let logUser = JSON.parse(localStorage.getItem('userLogin')) || {};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const id = idInput.value;
    const nombre = nombreInput.value;
    const precio = parseFloat(precioInput.value);
    const tickets = parseInt(ticketsInput.value);
    const descripcion = descripcionInput.value;
    const imagen = imagenInput.files.length > 0 ? imagenInput.files[0].name : undefined;
    const funcion1 = funcion1Input.value;
    const funcion2 = funcion2Input.value;
    const isIdExist = data.find(producto => producto.id === id);

    if (isIdExist) {
        return alert('ID existente');
    }

    if (id && nombre && precio && tickets && imagen && descripcion) {
        const newData = {
            id,
            nombre,
            precio,
            tickets,
            descripcion,
            funcion1,
            funcion2,
            imagen,
        }
        data.push(newData);
        guardarDatos();
        renderTabla();
        form.reset();
    } else {
        alert('Debe completar todos los campos.');
    }
});

function guardarDatos() {
    localStorage.setItem('productData', JSON.stringify(data)); /*Almacenar el array actualizado en localStorage*/
};

function renderTabla() {
    tablaBody.innerHTML = ''; /*Limpiar el contenido actual de la tabla*/

    data.forEach((item, index) => {
        const fila = document.createElement('tr');
        const idCelda = document.createElement('td');
        const nombreCelda = document.createElement('td');
        nombreCelda.classList.add('col-2');
        const precioCelda = document.createElement('td');
        const ticketsCelda = document.createElement('td');
        const imagenCelda = document.createElement('td');
        const funcion1Celda = document.createElement('td');
        const funcion2Celda = document.createElement('td');
        const descripcionCelda = document.createElement('td');
        descripcionCelda.style.minHeight = '2rem'
        descripcionCelda.style.maxHeight = '5rem'
        descripcionCelda.style.display = '-webkit-box'
        descripcionCelda.style.overflow = 'hidden'
        descripcionCelda.style.webkitLineClamp = '3'

        const accionCelda = document.createElement('td');
        const editarBoton = document.createElement('button');
        const eliminarBoton = document.createElement('button');

        idCelda.textContent = item.id;
        nombreCelda.textContent = item.nombre;
        precioCelda.textContent = item.precio;
        ticketsCelda.textContent = item.tickets;
        imagenCelda.textContent = item.imagen;
        funcion1Celda.textContent = item.funcion1
        funcion2Celda.textContent = item.funcion2
        descripcionCelda.textContent = item.descripcion;
        editarBoton.textContent = 'Editar';
        eliminarBoton.textContent = 'Eliminar';
        editarBoton.classList.add('bg-success')
        editarBoton.classList.add('text-white')
        editarBoton.classList.add('rounded-1')
        editarBoton.classList.add('border-0')
        editarBoton.classList.add('me-1')
        eliminarBoton.classList.add('bg-danger')
        eliminarBoton.classList.add('text-white')
        eliminarBoton.classList.add('rounded-1')
        eliminarBoton.classList.add('border-0')

        accionCelda.appendChild(editarBoton);
        accionCelda.appendChild(eliminarBoton);

        editarBoton.addEventListener('click', () => {
            editarData(index);
        });


        eliminarBoton.addEventListener('click', () => {
            borrarData(index);
        });

        fila.appendChild(idCelda);
        fila.appendChild(nombreCelda);
        fila.appendChild(precioCelda);
        fila.appendChild(ticketsCelda);
        fila.appendChild(imagenCelda);
        fila.appendChild(descripcionCelda);
        fila.appendChild(funcion1Celda);
        fila.appendChild(funcion2Celda);
        fila.appendChild(accionCelda);

        tablaBody.appendChild(fila);
    });
};
const editarData = (index) => {
    const item = data[index];
    idInput.value = item.id;
    nombreInput.value = item.nombre;
    precioInput.value = item.precio;
    if (imagenInput.files.length > 0 && index < imagenInput.files.length) {
        // Asignar un nuevo archivo al input de imagen
        imagenInput.files[index] = new File([], item.imagen);
    }
    ticketsInput.value = item.tickets;
    descripcionInput.value = item.descripcion;
    funcion1Input.value = item.funcion1
    funcion2Input.value = item.funcion2
    data.splice(index, 1);
    guardarDatos();
    renderTabla();
};

const borrarData = (index) => {
    data.splice(index, 1);
    guardarDatos();
    renderTabla();
};

renderTabla();
