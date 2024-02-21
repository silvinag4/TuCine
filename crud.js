const form = document.getElementById('regFormulario');
const nombreInput = document.getElementById('nombreInput');
const correoInput = document.getElementById('correoInput');
const contraInput = document.getElementById('contraInput');
let adminInput = document.getElementById('adminInput');
let carritoInput = document.getElementById('carritoInput');
const tablaBody = document.getElementById('tablaBody');

let data = JSON.parse(localStorage.getItem('userData')) || [];
let logUser = JSON.parse(localStorage.getItem('userLogin')) || [];

form.addEventListener('submit', (event) => {
    const nombre = nombreInput.value;
    const correo = correoInput.value;
    const contrasena = contraInput.value;
    const admin = adminInput.checked;
    const isUserRegistered = data.find(user => user.correo === correo);

    if (isUserRegistered) {
        return alert('Correo ya existente.');
    }

    let carrito = [];

    if (carritoInput.value.trim() !== '') {
        try {
            carrito = JSON.parse(carritoInput.value);
        } catch (error) {
            console.error('Error al analizar el valor del carrito:', error);
        }
    }

    if (nombre && correo) {
        const newData = {
            username: nombre,
            correo,
            password: contrasena,
            admin,
            carrito
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
    localStorage.setItem('userData', JSON.stringify(data));
    const correo = correoInput.value;
    const admin = adminInput.checked;
    const carrito = JSON.parse(carritoInput.value);

    if (correo === logUser.correo) {
        const usuario = {
            correo,
            admin,
            carrito
        }

        localStorage.setItem('userLogin', JSON.stringify(usuario))
    }
    localStorage.setItem('userData', JSON.stringify(data))
};

function renderTabla() {
    tablaBody.innerHTML = '';

    data.forEach((item, index) => {
        const fila = document.createElement('tr');
        const nombreCelda = document.createElement('td');
        const correoCelda = document.createElement('td');
        const contraCelda = document.createElement('td');
        const adminCelda = document.createElement('td');
        const accionCelda = document.createElement('td');
        const editarBoton = document.createElement('button');
        const eliminarBoton = document.createElement('button');

        nombreCelda.textContent = item.username;
        correoCelda.textContent = item.correo;
        contraCelda.textContent = item.password;
        adminCelda.textContent = item.admin ? 'Si' : 'No';
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

        fila.appendChild(nombreCelda);
        fila.appendChild(correoCelda);
        fila.appendChild(contraCelda);
        fila.appendChild(adminCelda);
        fila.appendChild(accionCelda);

        tablaBody.appendChild(fila);
    });
};

const editarData = (index) => {
    const item = data[index];
    nombreInput.value = item.username;
    correoInput.value = item.correo;
    contraInput.value = item.password;
    carritoInput.value = JSON.stringify(item.carrito);
    console.log("Carrito antes de editar:", item.carrito);

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

/*este código maneja el registro de usuarios, verifica la existencia de correos electrónicos duplicados, 
almacena los datos en localStorage, y proporciona funcionalidades para editar y eliminar usuarios,
 además de mostrarlos en una tabla HTML. */