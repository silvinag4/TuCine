function verificarUsuario() {
    const usuarioGuardado = localStorage.getItem('userLogin');

    if (usuarioGuardado) {
        const usuario = JSON.parse(usuarioGuardado);
    }
}

function login(event) {
    event.preventDefault()
    const correo = document.getElementById("correo").value
    const password = document.getElementById("password").value
    const userData = JSON.parse(localStorage.getItem('userData')) || []
    const validUser = userData.find(user => user.correo === correo && user.password === password)

    if (!correo || !password) {
        return alert('Debe completar todos los campos.')
    }

    if (!validUser) {
        return alert('Usuario y/o conttraseña incorrectos.');
    }

    const usuario = { correo, admin: validUser.admin, carrito: validUser.carrito };
    localStorage.setItem('userLogin', JSON.stringify(usuario));
    verificarUsuario();

    alert('Haz iniciado sesión.');
    window.location.href = validUser.admin ? './admi.html' : './index.html';
}

verificarUsuario();
