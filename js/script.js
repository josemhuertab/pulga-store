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
// Productos de ejemplo para el catálogo
const productos = [
    { id: 1, nombre: "Guitarra eléctrica", precio: 150000, imagen: "assets/img/guitarra.jpeg" },
    { id: 2, nombre: "Audífonos de estudio", precio: 80000, imagen: "assets/img/audifonos.webp" },
    { id: 3, nombre: "Kit Focusrite", precio: 220000, imagen: "assets/img/kit-focusrite.webp" },
    { id: 4, nombre: "Mesa de mezcla", precio: 180000, imagen: "assets/img/tablero-de-mezcla.webp" },
    { id: 5, nombre: "Teclado MIDI", precio: 95000, imagen: "assets/img/teclado.jpg" },
];

// Arreglo para el carrito
let carrito = [];

// Mostrar productos en la página
$(document).ready(function () {
    const contenedor = $("#productos");
    productos.forEach(producto => {
        contenedor.append(`
            <div class="col-6 col-md-4 col-lg-3 mb-4">
                <div class="card h-100">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">$${producto.precio}</p>
                        <button class="btn btn-primary mt-auto agregar-carrito" data-id="${producto.id}">Agregar al carrito</button>
                    </div>
                </div>
            </div>
        `);
    });

    // Evento al hacer clic en "Agregar al carrito"
    $(".agregar-carrito").click(function () {
        const id = $(this).data("id");
        const producto = productos.find(p => p.id === id);
        carrito.push(producto);
        actualizarCarrito();
    });

    // Enviar pedido (simulado)
    $("#form-pedido").submit(function (e) {
        e.preventDefault();
        if (carrito.length === 0) {
            $("#mensajePedido").text("El carrito está vacío.").removeClass("text-success").addClass("text-danger");
            return;
        }
        $("#mensajePedido").text("¡Pedido realizado con éxito! Te contactaremos pronto.").removeClass("text-danger").addClass("text-success");
        carrito = [];
        actualizarCarrito();
        this.reset();
    });
});

// Función para actualizar la lista del carrito
function actualizarCarrito() {
    const lista = $("#carrito");
    const totalTexto = $("#total");
    lista.empty();

    let total = 0;
    carrito.forEach((producto, index) => {
        lista.append(`<li class="list-group-item d-flex justify-content-between align-items-center">
            ${producto.nombre} - $${producto.precio}
            <button class="btn btn-sm btn-danger quitar" data-index="${index}">Quitar</button>
        </li>`);
        total += producto.precio;
    });

    totalTexto.text(total);

    // Evento para quitar producto del carrito
    $(".quitar").click(function () {
        const index = $(this).data("index");
        carrito.splice(index, 1);
        actualizarCarrito();
    });
}
