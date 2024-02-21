function cerrarSesion() {
    if (localStorage.getItem('userLogin')) {
        localStorage.removeItem('userLogin');
        location.reload();
    }
    homePage();
}

function homePage() {
    window.location.href = 'index.html';
}