function actualizarFechaHora() {
    // Busca en el documento el elemento con id 'script'
    // Este es el contenedor donde vamos a mostrar la fecha y la hora
    const contenedorFechaHora = document.getElementById('script');

    // Si no existe ese elemento en la página, no hacemos nada y salimos de la función
    if (!contenedorFechaHora) return;

    // Creamos un nuevo objeto Date con la fecha y hora actuales
    const ahora = new Date();

    // Definimos las opciones para formatear la fecha en español de Chile
    // weekday: nombre del día
    // year: año completo
    // month: nombre del mes
    // day: día del mes en número
    const opcionesFecha = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    // Convierte la fecha actual a un texto legible en formato local español Chile
    const fechaFormateada = ahora.toLocaleDateString('es-CL', opcionesFecha);

    // Convierte la hora actual a texto con formato de 24 horas sin AM/PM
    const horaFormateada = ahora.toLocaleTimeString('es-CL', { hour12: false });

    // Combina la fecha y la hora en un solo texto, separados por un guion
    const textoFechaHora = `${fechaFormateada} - ${horaFormateada}`;

    // Actualiza el contenido del elemento HTML para mostrar la fecha y hora
    contenedorFechaHora.textContent = textoFechaHora;
}
actualizarFechaHora();
setInterval(actualizarFechaHora, 1000);

//Para la funcion validar, tuve que quitar los "required" del html para ver el mensaje en rojo
function validar() {
    var nombre = document.getElementById("nombre").value;
    var correo = document.getElementById("email").value;
    var mensaje = document.getElementById("mensaje").value;
    var contenedor = document.getElementById("mensaje-formulario");

    // Verificar si algún campo está vacío
    if (nombre === "" || correo === "" || mensaje === "") {
        contenedor.innerHTML = "Por favor, completa todos los campos.";
        contenedor.style.color = "red";
        contenedor.style.backgroundColor = "#ffe5e5";
        contenedor.style.padding = "10px";
        return false;
    }

    // Validar el formato del correo
    if (!correo.includes("@") || !correo.includes(".") ) {
        contenedor.innerHTML = "El correo electrónico no tiene un formato válido.";
        contenedor.style.color = "red";
        contenedor.style.backgroundColor = "#ffe5e5";
        contenedor.style.padding = "10px";
        return false;
    }

    // Si todo está bien
    contenedor.innerHTML = "Formulario enviado correctamente.";
    contenedor.style.color = "green";
    contenedor.style.backgroundColor = "#e6ffe5";
    contenedor.style.padding = "10px";

    return false; // Para que no se recargue la página
}