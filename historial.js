function cargarHistorialCompras() {
  const tablaHistorialCompras = document.getElementById('tablaHistorialCompras');
  tablaHistorialCompras.innerHTML = ''; // Limpiar la tabla antes de cargar nuevos datos

  // Obtener el historial de compras del localStorage
  const historialCompras = JSON.parse(localStorage.getItem('historialCompras')) || [];

  // Iterar sobre el historial de compras y agregar filas a la tabla
  historialCompras.forEach(compra => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
          <td>${compra.usuario}</td>
          <td>${compra.producto}</td>
          <td>${compra.cantidad}</td>
          <td>${compra.precio}</td>
          <td>${compra.funcion}</td>
          <td>${compra.total}</td>
          <td>${new Date(compra.fecha).toLocaleString()}</td>
      `;
    tablaHistorialCompras.appendChild(fila);
  });
}

function limpiarHistorial() {
  if (localStorage.getItem('historialCompras')) {
    localStorage.removeItem('historialCompras');
    location.reload();
  }
}

// Llamar a la función para cargar el historial de compras cuando se cargue la página
cargarHistorialCompras();