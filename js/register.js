const form = document.querySelector('form');
const nombre = document.querySelector('input[name="nombre"]');
const apellido = document.querySelector('input[name="apellido"]');
const correo = document.querySelector('input[name="correo"]');
const contraseña = document.querySelector('input[name="contraseña"]');
const contraseña2 = document.querySelector('input[name="contraseña2"]');
const telefono = document.querySelector('input[name="telefono"]');
const pais = document.querySelector('input[name="pais"]');
const ciudad = document.querySelector('input[name="ciudad"]');
const direccion = document.querySelector('input[name="direccion"]');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  // Validar que no hay campos vacíos
  if (!nombre.value || !apellido.value || !correo.value || !contraseña.value || !contraseña2.value || !telefono.value || !pais.value || !ciudad.value || !direccion.value) {
    Toastify({
      text: 'Debe llenar todos los campos',
      backgroundColor: '#FFA500',
      gravity: 'bottom',
    }).showToast();
    return;
  }

  // Validar que las contraseñas coinciden
  if (contraseña.value !== contraseña2.value) {
    Toastify({
      text: 'Las contraseñas no coinciden',
      backgroundColor: '#FFA500',
      gravity: 'bottom',
    }).showToast();
    return;
  }

  // Validar que el correo no ha sido registrado antes
  const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const existeUsuario = usuariosRegistrados.some(usuario => usuario.correo === correo.value);
  if (existeUsuario) {
    Toastify({
      text: 'Este correo ya está registrado',
      backgroundColor: '#FFA500',
      gravity: 'bottom',
    }).showToast();
    return;
  }

  // Guardar los datos del formulario
  const usuario = {
    nombre: nombre.value,
    apellido: apellido.value,
    correo: correo.value,
    contraseña: contraseña.value,
    telefono: telefono.value,
    pais: pais.value,
    ciudad: ciudad.value,
    direccion: direccion.value,
  };
  usuariosRegistrados.push(usuario);
  localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));

  // Mostrar mensaje de éxito
  Toastify({
    text: 'Datos guardados con éxito',
    backgroundColor: '#228B22',
    gravity: 'bottom',
  }).showToast();
});
