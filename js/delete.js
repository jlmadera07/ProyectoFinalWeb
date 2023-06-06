// Manejar el clic en el botón para mostrar y ocultar el formulario
document.getElementById('delete-button').addEventListener('click', function() {
    const form = document.getElementById('delete-form');
    const table = document.getElementById('producto-table');
    this.style.display = "none";
    if (form.style.display === "none") {
        form.style.display = "block";
        table.style.display = "block";
        // Cargar los datos de los productos en la tabla
        fetch('http://localhost:8082/productos')
            .then(response => response.json())
            .then(data => fillTable(data))
            .catch(error => console.error('Error:', error));
    } else {
        form.style.display = "none";
        table.style.display = "none";
    }
});

// Función para llenar la tabla con los datos de los productos
function fillTable(data) {
    let tbody = document.getElementById('producto-table').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
    data.forEach(producto => {
        let row = tbody.insertRow();
        row.insertCell().innerText = producto.id;
        row.insertCell().innerText = producto.titulo;
        row.insertCell().innerText = producto.imagen;
        row.insertCell().innerText = producto.categoriaId;
        row.insertCell().innerText = producto.categoriaNombre;
        row.insertCell().innerText = producto.precio;
    });
}

// Manejar el envío del formulario para enviar una petición DELETE al servidor
document.getElementById('delete-producto-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Crear un objeto FormData, pasando el formulario como parámetro
    const formData = new FormData(e.target);

    // Obtener el ID del producto a eliminar
    const productoId = formData.get('id');

    fetch(`http://localhost:8082/productos/${productoId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert("El producto fue eliminado exitosamente.");
            // Eliminar la fila de la tabla
            let tbody = document.getElementById('producto-table').getElementsByTagName('tbody')[0];
            let row = Array.from(tbody.rows).find(r => r.cells[0].innerText === productoId);
            tbody.deleteRow(row.rowIndex);
        } else {
            alert("Error al eliminar el producto.");
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

