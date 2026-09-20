/**
 * Ferretería El Tornillo - Manejador del Formulario de Contacto
 * Validación en el navegador (cliente) sin frameworks.
 */

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formulario-contacto');
  const inputNombre = document.getElementById('nombre');
  const inputMensaje = document.getElementById('mensaje');
  const mensajeEstado = document.getElementById('mensaje-estado');

  if (!formulario) return;

  formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    // Limpiar estados previos
    limpiarEstado();

    const nombreValor = inputNombre.value.trim();
    const mensajeValor = inputMensaje.value.trim();

    // Validación 1: El nombre debe tener al menos 2 caracteres
    if (nombreValor.length < 2) {
      const textoAviso = nombreValor.length === 0 
        ? 'Por favor, ingresa tu nombre para continuar.' 
        : 'El nombre debe tener al menos 2 caracteres.';

      mostrarAviso(textoAviso, 'error');
      marcarInvalido(inputNombre);
      inputNombre.focus();
      return;
    }

    // Validación 2: El mensaje no debe estar vacío
    if (mensajeValor.length === 0) {
      mostrarAviso('Por favor, escribe un mensaje con tu consulta o solicitud.', 'error');
      marcarInvalido(inputMensaje);
      inputMensaje.focus();
      return;
    }

    // Si todas las validaciones son correctas: mostrar mensaje de éxito
    const mensajeExito = `¡Gracias, ${nombreValor}! Hemos recibido tu mensaje correctamente. Pronto nos pondremos en contacto.`;
    mostrarAviso(mensajeExito, 'exito');

    // Limpiar campos del formulario
    formulario.reset();
  });

  // Limpiar indicador de error cuando el usuario empieza a escribir
  inputNombre.addEventListener('input', () => {
    if (inputNombre.classList.contains('campo-invalido')) {
      inputNombre.classList.remove('campo-invalido');
    }
  });

  inputMensaje.addEventListener('input', () => {
    if (inputMensaje.classList.contains('campo-invalido')) {
      inputMensaje.classList.remove('campo-invalido');
    }
  });

  /**
   * Muestra un mensaje de aviso en el contenedor de estado.
   * @param {string} texto - Mensaje a mostrar.
   * @param {'error'|'exito'} tipo - Tipo de mensaje.
   */
  function mostrarAviso(texto, tipo) {
    if (!mensajeEstado) return;

    mensajeEstado.className = `mensaje-estado alerta-${tipo}`;
    const icono = tipo === 'error' ? '⚠️' : '✅';
    mensajeEstado.innerHTML = `<span class="icono-estado">${icono}</span><span>${texto}</span>`;
    mensajeEstado.style.display = 'flex';

    // Hacer scroll suave hacia el aviso en dispositivos móviles si es necesario
    mensajeEstado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /**
   * Restablece el contenedor de mensajes y bordes de campos.
   */
  function limpiarEstado() {
    if (mensajeEstado) {
      mensajeEstado.className = 'mensaje-estado';
      mensajeEstado.innerHTML = '';
      mensajeEstado.style.display = 'none';
    }
    inputNombre.classList.remove('campo-invalido');
    inputMensaje.classList.remove('campo-invalido');
  }

  /**
   * Aplica la clase de campo inválido a un elemento de formulario.
   * @param {HTMLElement} elemento
   */
  function marcarInvalido(elemento) {
    elemento.classList.add('campo-invalido');
  }
});
