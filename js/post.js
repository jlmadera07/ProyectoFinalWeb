/*document.addEventListener('DOMContentLoaded', function() {
    const idInput = document.getElementById('post-id');
    const tituloInput = document.getElementById('post-titulo');
    const imagenInput = document.getElementById('post-imagen');
    const categoriaIdInput = document.getElementById('post-categoriaId');
    const categoriaNombreInput = document.getElementById('post-categoriaNombre');
    const precioInput = document.getElementById('post-precio');

    // Resto de tu código...
});

// Manejar el clic en el botón para mostrar y ocultar el formulario

document.getElementById('create-button').addEventListener('click', function() {
    const form = document.getElementById('post-form');
    const table = document.getElementById('producto-table');
    const button = document.getElementById('create-button');
    if (form.style.display === "none") {
        form.style.display = "block";
        table.style.display = "block";
        button.style.display = "none";
    } else {
        form.style.display = "none";
        table.style.display = "block";
        button.style.display = "none";
    }
    loadTableData();
});

// Manejar el envío del formulario para enviar una petición POST al servidor
document.getElementById('create-producto-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const inputs = [idInput, tituloInput, imagenInput, categoriaIdInput, categoriaNombreInput, precioInput];

    let allFilled = true;

    inputs.forEach((input) => {
        // Agrega un event listener al evento 'focus'
        input.addEventListener('focus', function() {
            // Cuando el input reciba el foco, elimina la clase 'input-error'
            input.classList.remove('input-error');
        });
    });

    // Restablecer el estilo y verificar si todos los campos están llenos
    for (const input of inputs) {
        input.classList.remove('input-error');
        if (input.value.trim() === '') {
            allFilled = false;
            input.classList.add('input-error');
        }

    }

    if (!allFilled) {
        alert("Por favor, llene todos los campos.");
        return;
    }

    // Crear un objeto FormData, pasando el formulario como parámetro
    const formData = new FormData(e.target);

    // Convertir la FormData a un objeto
    const data = Object.fromEntries(formData);
    
    let url = "http://localhost:8082/productos";
    let method = 'POST';

    // Verificar si el botón es para actualizar
    if (document.getElementById('create-button').textContent === 'Actualizar') {
        url += '/' + document.getElementById('create-button').dataset.id;
        method = 'PUT';
    }

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error: ' + response.statusText);
        }
    })
    .then(data => {
        console.log('Success:', data);
        if (method === 'POST') {
            alert("Los datos fueron insertados exitosamente."); // Alerta de éxito
        } else {
            alert("Los datos fueron actualizados exitosamente."); // Alerta de éxito
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert("No se pudieron enviar los datos."); // Alerta de error
    })
    .finally(() => {
        loadTableData(); // Recarga los datos de la tabla después de crear o actualizar
        document.getElementById('create-button').textContent = 'Crear Producto'; // Cambia el texto del botón de vuelta a 'Crear Producto'
    });    
});
function loadTableData() {
    fetch("http://localhost:8082/productos")
    .then(response => response.json())
    .then(data => {
        const tableBody = document.getElementById('producto-table').getElementsByTagName('tbody')[0];
        tableBody.innerHTML = ""; // Limpia el contenido anterior de la tabla

        // Llenar la tabla con los datos recuperados
        data.forEach(producto => {
            let row = tableBody.insertRow();

            let cell = row.insertCell();
            cell.textContent = producto.id;

            cell = row.insertCell();
            cell.textContent = producto.titulo;

            cell = row.insertCell();
            cell.textContent = producto.imagen;

            cell = row.insertCell();
            cell.textContent = producto.categoriaId;

            cell = row.insertCell();
            cell.textContent = producto.categoriaNombre;

            cell = row.insertCell();
            cell.textContent = producto.precio;

            // Agregar celda de acciones con botones "Actualizar" y "Eliminar"
            cell = row.insertCell();
            let updateButton = document.createElement('button');
             updateButton.textContent = 'Actualizar';
             updateButton.className = 'update-button'; // Agrega esta línea
             updateButton.dataset.id = producto.id; // Añade esta línea
             cell.appendChild(updateButton);
             let deleteButton = document.createElement('button');
             deleteButton.textContent = 'Eliminar';
             deleteButton.className = 'delete-button'; // Agrega esta línea
             cell.appendChild(deleteButton);
        });
    })
    .catch(error => console.error('Error:', error));
}
document.addEventListener('click', function(e) {
    if (e.target && e.target.className === 'update-button') {
        // Obtener el ID del producto desde el atributo de datos del botón de actualizar
        const id = e.target.dataset.id;
        // Realizar una solicitud GET al servidor para obtener los datos del producto
        fetch(`http://localhost:8082/productos/${id}`)
        .then(response => response.json())
        .then(producto => {
            // Cargar los datos del producto en el formulario
            idInput.value = producto.id;
            tituloInput.value = producto.titulo;
            imagenInput.value = producto.imagen;
            categoriaIdInput.value = producto.categoriaId;
            categoriaNombreInput.value = producto.categoriaNombre;
            precioInput.value = producto.precio;
            // Cambiar el estado del botón "Crear producto" a "Actualizar"
            document.getElementById('create-button').textContent = 'Actualizar';
            document.getElementById('create-button').dataset.id = producto.id; // Añade esta línea
        })
        .catch(error => console.error('Error:', error));
    }
});



// Cargar datos de la tabla cuando se carga la página
window.onload = loadTableData;*/
