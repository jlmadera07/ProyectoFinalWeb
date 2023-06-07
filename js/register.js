document.getElementById('registro-form').addEventListener('submit', function (event) {
  event.preventDefault(); // Evita que se envíe el formulario automáticamente

  // Obtén los valores de los campos del formulario
  var nombre = document.getElementsByName('nombre')[0].value;
  var apellido = document.getElementsByName('apellido')[0].value;
  var correo = document.getElementsByName('correo')[0].value;
  var contraseña = document.getElementsByName('contraseña')[0].value;
  var contraseña2 = document.getElementsByName('contraseña2')[0].value; // Agregado
  var telefono = document.getElementsByName('telefono')[0].value;
  var edad = document.getElementsByName('edad')[0].value;

  // Crea un objeto con los datos del formulario
  var formData = {
    nombre: nombre,
    apellido: apellido,
    correo: correo,
    contraseña: contraseña,
    contraseña2: contraseña2, // Agregado
    telefono: telefono,
    edad: edad
  };

  // Realiza la petición POST al backend utilizando fetch
  fetch('http://localhost:8080/personas/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(data => {
      // Maneja la respuesta del backend
      console.log(data); // Puedes mostrar la respuesta en la consola o hacer algo más con ella

      // Redirecciona al usuario a otra página si es necesario
      // window.location.href = '/otra-pagina.html';

      // Validar que no hay campos vacíos
      if (!nombre || !apellido || !correo || !contraseña || !contraseña2 || !telefono || !edad) {
        Toastify({
          text: 'Debe llenar todos los campos',
          backgroundColor: '#FFA500',
          gravity: 'bottom',
        }).showToast();
        return;
      }

      // Validar que las contraseñas coinciden
      if (contraseña !== contraseña2) {
        Toastify({
          text: 'Las contraseñas no coinciden',
          backgroundColor: '#FFA500',
          gravity: 'bottom',
        }).showToast();
        return;
      }

      if (contraseña.length < 6 || !/[!@#$%^&*(),.?":{}|<>0-9]/.test(contraseña) || !/[A-Z]/.test(contraseña)) {
        Toastify({
          text: 'La contraseña debe tener al menos 6 caracteres, incluir un carácter especial, una mayúscula y un número',
          backgroundColor: '#FFA500',
          gravity: 'bottom',
        }).showToast();

        // Agregar clase CSS para resaltar la casilla de contraseña en rojo
        document.getElementsByName('contraseña')[0].classList.add('error');

        return;
      }

      // Validar que el correo no ha sido registrado antes
      const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const existeUsuario = usuariosRegistrados.some(usuario => usuario.correo === correo);
      if (existeUsuario) {
        Toastify({
          text: 'Este correo ya está registrado',
          backgroundColor: '#FFA500',
          gravity: 'bottom',
        }).showToast();

        document.getElementsByName('correo')[0].classList.add('error');
        return;
      }

      // Guardar los datos del formulario
      const usuario = {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        contraseña: contraseña,
        telefono: telefono,
        edad: edad
      };
      usuariosRegistrados.push(usuario);
      localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

      // Obtener el contenedor de la lista de usuarios
      var listaUsuarios = document.getElementById('lista-usuarios');

      // Crear un elemento <div> para representar el nuevo usuario
      var usuarioElemento = document.createElement('div');
      usuarioElemento.className = 'usuario';

      // Crear un elemento <span> para mostrar el nombre y apellido del usuario
      var nombreElemento = document.createElement('span');
      nombreElemento.className = 'usuario-nombre';
      nombreElemento.textContent = nombre + ' ' + apellido;

      // Crear un elemento <div> para las acciones de editar y eliminar
      var accionesElemento = document.createElement('div');
      accionesElemento.className = 'acciones';

      // Crear el botón de editar
      var editarBoton = document.createElement('button');
      editarBoton.textContent = 'Editar';
      editarBoton.addEventListener('click', function () {
        // Lógica para editar el usuario
        console.log('Editar usuario:', usuario);
      });

      // ...

      // Crear el botón de editar
      var editarBoton = document.createElement('button');
      editarBoton.textContent = 'Editar';
      editarBoton.addEventListener('click', function () {
        // Obtener el ID del usuario a editar
        var usuarioId = usuario.id;

        // Obtener los nuevos valores de los campos del formulario
        var nuevoNombre = prompt('Ingrese el nuevo nombre:');
        var nuevoApellido = prompt('Ingrese el nuevo apellido:');
        var nuevoCorreo = prompt('Ingrese el nuevo correo:');
        var nuevaContraseña = prompt('Ingrese la nueva contraseña:');
        var nuevoTelefono = prompt('Ingrese el nuevo teléfono:');
        var nuevaEdad = prompt('Ingrese la nueva edad:');

        // Crear un objeto con los datos actualizados del formulario
        var datosActualizados = {
          nombre: nuevoNombre,
          apellido: nuevoApellido,
          correo: nuevoCorreo,
          contraseña: nuevaContraseña,
          telefono: nuevoTelefono,
          edad: nuevaEdad
        };

        // Realizar la solicitud PUT al backend para actualizar los datos del usuario
        fetch(`http://localhost:8080/personas/${usuarioId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datosActualizados)
        })
          .then(response => response.json())
          .then(data => {
            // Manejar la respuesta del backend
            console.log(data); // Puedes mostrar la respuesta en la consola o hacer algo más con ella

            // Actualizar los datos del usuario en la lista de usuarios
            usuario.nombre = nuevoNombre;
            usuario.apellido = nuevoApellido;
            usuario.correo = nuevoCorreo;
            usuario.contraseña = nuevaContraseña;
            usuario.telefono = nuevoTelefono;
            usuario.edad = nuevaEdad;

            // Actualizar el contenido del elemento del usuario en la lista de usuarios
            nombreElemento.textContent = nuevoNombre + ' ' + nuevoApellido;

            // Mostrar mensaje de éxito
            Toastify({
              text: 'Datos actualizados con éxito',
              backgroundColor: '#228B22',
              gravity: 'bottom',
            }).showToast();
          })
          .catch(error => {
            // Manejar cualquier error que ocurra
            console.error('Error:', error);
          });
      });

      // ...


      // Crear el botón de eliminar
      var eliminarBoton = document.createElement('button');
      eliminarBoton.textContent = 'Eliminar';
      eliminarBoton.addEventListener('click', function () {
        // Realizar una solicitud DELETE al backend para eliminar el usuario
        fetch(`http://localhost:8080/personas/delete/${usuario.id}`, {
          method: 'DELETE'
        })
          .then(response => response.json())
          .then(data => {
            // Maneja la respuesta del backend
            console.log(data); // Puedes mostrar la respuesta en la consola o hacer algo más con ella

            // Eliminar el elemento del usuario de la lista de usuarios
            listaUsuarios.removeChild(usuarioElemento);

            Toastify({
              text: 'Usuario eliminado con éxito',
              backgroundColor: '#228B22',
              gravity: 'bottom',
            }).showToast();
          })
          .catch(error => {
            // Maneja cualquier error que ocurra
            console.error('Error:', error);
          });
      });

      // Agregar los botones al elemento de acciones
      accionesElemento.appendChild(editarBoton);
      accionesElemento.appendChild(eliminarBoton);

      // Agregar el nombre y las acciones al elemento del usuario
      usuarioElemento.appendChild(nombreElemento);
      usuarioElemento.appendChild(accionesElemento);

      // Agregar el elemento del usuario a la lista de usuarios
      listaUsuarios.appendChild(usuarioElemento);

      // Mostrar mensaje de éxito
      Toastify({
        text: 'Datos guardados con éxito',
        backgroundColor: '#228B22',
        gravity: 'bottom',
      }).showToast();
    })
    .catch(error => {
      // Maneja cualquier error que ocurra
      console.error('Error:', error);
    });
});
