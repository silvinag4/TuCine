const adminli = document.getElementById("adminli");
const sesionli = document.getElementById("sesionli");
const iniciarSesionli = document.getElementById("iniciarSesionli");
const registroli = document.getElementById("registroli");
const carritoli = document.getElementById("carritoli");
const historialli = document.getElementById("historialli");

iniciarSesionli.addEventListener('click', () => {
    window.location.href = './login.html'
})

registroli.addEventListener('click', () => {
    window.location.href = './registro.html'
})

carritoli.addEventListener('click', () => {
    window.location.href = './carrito.html'
})

if (localStorage.getItem('userLogin')) {
    const usuarioGuardado = JSON.parse(localStorage.getItem('userLogin'));
    iniciarSesionli.classList.add('d-none');
    registroli.classList.add('d-none');

    sesionli.addEventListener('click', () => {
        localStorage.removeItem('userLogin');
        location.reload();
    })

    if (usuarioGuardado.admin === false) {
        adminli.classList.add('d-none');
        historialli.classList.add('d-none');
    }

    if (usuarioGuardado.admin === true) {
        carritoli.classList.add('d-none');
    }

    adminli.classList.add('');
}

adminli.classList.add('d-none');
sesionli.classList.add('d-none');
carritoli.classList.add('d-none');
historialli.classList.add('d-none');
