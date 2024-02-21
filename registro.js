
function registro(event) {
    event.preventDefault()

    const username = document.getElementById("username").value
    const correo = document.getElementById("correo").value
    const password = document.getElementById("password").value
    const confirmarPassword = document.getElementById("confirmarPassword").value
    const admin = false;
    let carrito = [];

    const userData = JSON.parse(localStorage.getItem('userData')) || [];

    const isUserRegistered = userData.find(user => user.correo === correo)

    if (!username || !correo || !password || !confirmarPassword) {
        return alert('Debe completar todos los campos.');
    }

    if (isUserRegistered) {
        return alert('Correo ya existente.');
    }

    userData.push({
        username,
        correo,
        password,
        admin,
        carrito
    });

    localStorage.setItem("userData", JSON.stringify(userData));
    alert('Has sido registrado con éxito.')
    window.location.href = 'login.html'

}
