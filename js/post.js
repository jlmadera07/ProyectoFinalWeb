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

     const idInput = document.getElementById('post-id');
    const tituloInput = document.getElementById('post-titulo');
    const imagenInput = document.getElementById('post-imagen');
    const categoriaIdInput = document.getElementById('post-categoriaId');
    const categoriaNombreInput = document.getElementById('post-categoriaNombre');
    const precioInput = document.getElementById('post-precio');

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
        else if (input === categoriaNombreInput && !validCategories.includes(input.value.trim().toLowerCase())) {
            allFilled = false;
            input.classList.add('input-error');
        } else if (input === precioInput && isNaN(input.value)) {
            allFilled = false;
            input.classList.add('input-error');
        } else {
            input.classList.add('input-success');
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
    

    fetch("http://localhost:8082/productos", {
        method: 'POST',
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
    }).then(data => {
        console.log('Success:', data);
        alert("Los datos fueron insertados exitosamente."); // Alerta de éxito

    }).catch((error) => {
        console.error('Error:', error);
        alert("No se puedieron enviar los datos."); // Alerta de éxito

    });
    loadTableData();
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
        });
    })
    .catch(error => console.error('Error:', error));
}

// Cargar datos de la tabla cuando se carga la página
window.onload = loadTableData;
