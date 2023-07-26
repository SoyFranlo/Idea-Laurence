const productContainer = document.querySelector(".contenedor-items");
document;

async function fetchProductos() {
  try {
    const response = await fetch("../JSON/productos.json");
    const data = await response.json();
    const productos = data.productos;

    productos.forEach((producto) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("item");
      productDiv.innerHTML = `
        <span class="titulo-item">${producto.nombre}</span>
        <img src="${producto.img}" alt="${producto.alt}" class="img-item">
        <span class="precio-item">${producto.valor}</span>
        <button class="boton-item">Agregar al Carrito</button>
      `;
      productContainer.appendChild(productDiv);

      // Agregar evento "click" del botón "Agregar al Carrito"
      const botonAgregar = productDiv.querySelector(".boton-item");
      botonAgregar.addEventListener("click", agregarAlCarritoClicked);
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Ups...",
      text: "Algo salió mal!",
      footer: "Intentelo nuevamente en unos instantes.",
    });
  }
}
fetchProductos();

//Variable que mantiene el estado visible del carrito
let carritoVisible = false;

//Espermos que todos los elementos de la página cargen para ejecutar el script
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}
function ready() {
  mostrarFormularioInicio();
}
// Función para mostrar el formulario de inicio con SweetAlert
function mostrarFormularioInicio() {
  Swal.fire({
    title: "Provincia de Residencia",
    html: `
    <div>Lo necesitamos para calcular el costo de envío</div>
    <hr>
      <select id="sel-Provincia" class="swal2-input" required>
        <option value="" selected disabled>Elegir País</option>
        <option value="CABA">CABA</option>
        <option value="Cordoba">Cordoba</option>
      </select>
    `,
    focusConfirm: false,
    showCancelButton: false,
    confirmButtonText: "Enviar",
    allowOutsideClick: false,
    preConfirm: () => {
      const ProvinciaSeleccionado = document.getElementById("sel-Provincia").value;

      if (!ProvinciaSeleccionado) {
        Swal.showValidationMessage("Por favor, completa todos los campos.");
        return;
      }
      // Guardar la información del usuario, incluyendo el país seleccionado
      const nuevousuario = {
        ProvinciaUsuario: ProvinciaSeleccionado,
        estaLogueado: false,
      };
      localStorage.setItem("usuario", JSON.stringify(nuevousuario));

      // Mostrar Sweet Alert con el mensaje de bienvenida
      Swal.fire({
        icon: "success",
        title: `¡Bienvenido/a!`,
        text: "Gracias por unirte a Pasión Xeneize.",
      });
    },
  });
}
//Agregremos funcionalidad a los botones eliminar del carrito
let botonesEliminarItem = document.getElementsByClassName("btn-eliminar");
for (let i = 0; i < botonesEliminarItem.length; i++) {
  let button = botonesEliminarItem[i];
  button.addEventListener("click", eliminarItemCarrito);
}

//Agrego funcionalidad al boton sumar cantidad
let botonesSumarCantidad = document.getElementsByClassName("sumar-cantidad");
for (let i = 0; i < botonesSumarCantidad.length; i++) {
  let button = botonesSumarCantidad[i];
  button.addEventListener("click", sumarCantidad);
}

//Agrego funcionalidad al boton restar cantidad
let botonesRestarCantidad = document.getElementsByClassName("restar-cantidad");
for (let i = 0; i < botonesRestarCantidad.length; i++) {
  let button = botonesRestarCantidad[i];
  button.addEventListener("click", restarCantidad);
}

//Agregamos funcionalidad al boton Agregar al carrito
let botonesAgregarAlCarrito = document.getElementsByClassName("boton-item");
for (let i = 0; i < botonesAgregarAlCarrito.length; i++) {
  let button = botonesAgregarAlCarrito[i];
  button.addEventListener("click", agregarAlCarritoClicked);
}

//Agregamos funcionalidad al botón comprar
document
  .getElementsByClassName("btn-pagar")[0]
  .addEventListener("click", pagarClicked);

//Eliminamos todos los elementos del carrito y lo ocultamos

function pagarClicked() {
  // Realizamos directamente el proceso de compra
  formularioDePago();
  // Vaciamos el carrito
  vaciarCarrito();
}
function formularioDePago() {
  Swal.fire({
    title: "Complete sus datos para finalizar la compra",
    html: `
    <input type="text" id="nombre" class="swal2-input" placeholder="Nombre" required>
    <input type="email" id="email" class="swal2-input" placeholder="Email" required>
      <select id="met-pago" class="swal2-input" required>
        <option value="" selected disabled>Elegir Metodo de Pago</option>
        <option value="MercadoPago">Mercado Pago</option>
        <option value="Transferencia">Transferencia</option>
        <option value="Efectivo">Efectivo en un Pago Fácil</option>
      </select>
    `,
    focusConfirm: false,
    showCancelButton: false,
    confirmButtonText: "Enviar",
    allowOutsideClick: false,
    preConfirm: () => {
      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const metodoPago = document.getElementById("met-pago").value;

      if (!nombre || !email || !metodoPago) {
        Swal.showValidationMessage("Por favor, completa todos los campos.");
        // return;
      } else {
        Swal.fire({
          icon: "success",
          title: "Gracias por tu compra!",
          text: "Serás redirigido/a al inicio",
        });
        setTimeout(function () {
          window.location.reload();
        }, 3000);
      }

      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        Swal.showValidationMessage("El correo ingresado no es válido.");
        return;
      }

      // Guardar la información del usuario, incluyendo el país seleccionado
      const usuarioinfo = {
        nombreUsuario: nombre,
        emailUsuario: email,
        estaLogueado: false,
      };
      localStorage.setItem("usuario", JSON.stringify(usuarioinfo));
    },
  });
}

// Función para vaciar el carrito
function vaciarCarrito() {
  let carritoItems = document.getElementsByClassName("carrito-items")[0];
  while (carritoItems.firstChild) {
    carritoItems.removeChild(carritoItems.firstChild);
  }
  actualizarTotalCarrito();
  ocultarCarrito();
}

//Función que controla el botón clickeado de agregar al carrito
function agregarAlCarritoClicked(event) {
  let button = event.target;
  let item = button.parentElement;
  let titulo = item.getElementsByClassName("titulo-item")[0].innerText;
  let precio = item.getElementsByClassName("precio-item")[0].innerText;
  let imagenSrc = item.getElementsByClassName("img-item")[0].src;
  console.log(imagenSrc);

  let itemsCarrito = document.getElementsByClassName("carrito-items")[0];
  let itemExistente = null;

  // Fijarse si el item ya esta en el carrito
  let carritoItems = itemsCarrito.getElementsByClassName("carrito-item");
  for (let i = 0; i < carritoItems.length; i++) {
    let itemCarrito = carritoItems[i];
    let tituloCarrito = itemCarrito.getElementsByClassName(
      "carrito-item-titulo"
    )[0].innerText;

    if (tituloCarrito === titulo) {
      itemExistente = itemCarrito;
      break;
    }
  }

  if (itemExistente) {
    // Si el item ya existe, aumenta su cantidad
    let cantidadItem = itemExistente.getElementsByClassName(
      "carrito-item-cantidad"
    )[0];
    let cantidadActual = parseInt(cantidadItem.value, 10);
    cantidadActual++;
    cantidadItem.value = cantidadActual;
    actualizarTotalCarrito();
  } else {
    // Si el item no fue agregado aún, procede a agregarse
    agregarItemAlCarrito(titulo, precio, imagenSrc);
  }

  mostrarCarrito();
}
function obtenerCostoEnvio(Provincia) {
  if (Provincia === "CABA") {
    return 2000;
  } else if (Provincia === "Cordoba") {
    return 4000;
  }
  // Si el país no es CABA ni Cordoba, retornar el costo más caro
  return 4000;
}
// Obtener el costo de envío según el país seleccionado
const usuarioGuardado = localStorage.getItem("usuario");
let costoEnvio = 0;
if (usuarioGuardado) {
  const usuario = JSON.parse(usuarioGuardado);
  costoEnvio = obtenerCostoEnvio(usuario.ProvinciaUsuario);
}
// Crear el elemento span para el costo de envío y agregarlo al carrito
const costoEnvioSpan = document.getElementsByClassName(
  "carrito-item-precio"
)[0];
costoEnvioSpan.innerHTML = `Costo de Envio: $${costoEnvio}`;
document.getElementsByClassName("carrito-total")[0].appendChild(costoEnvioSpan);
//Función que hace visible el carrito
function mostrarCarrito() {
  carritoVisible = true;
  let carrito = document.getElementsByClassName("carrito")[0];
  carrito.style.marginRight = "0";
  carrito.style.opacity = "1";

  let items = document.getElementsByClassName("contenedor-items")[0];
  items.style.width = "60%";
}

//Función que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
  let itemsCarrito = document.getElementsByClassName("carrito-items")[0];
  {
    let item = document.createElement("div");
    item.classList.add("item");
    let itemCarritoContenido = `
        <div class="carrito-item">
            <img src="${imagenSrc}" width="80px" alt="">
            <div class="carrito-item-detalles">
                <span class="carrito-item-titulo">${titulo}</span>
                <div class="selector-cantidad">
                    <i class="fa-solid fa-minus restar-cantidad"></i>
                    <input type="text" value="1" class="carrito-item-cantidad" disabled>
                    <i class="fa-solid fa-plus sumar-cantidad"></i>
                </div>
                <span class="carrito-item-precio">${precio}</span>
            </div>
            <button class="btn-eliminar">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);

    //Agregamos la funcion eliminar
    item
      .getElementsByClassName("btn-eliminar")[0]
      .addEventListener("click", eliminarItemCarrito);

    //Agregmos al funcion restar
    let botonRestarCantidad = item.getElementsByClassName("restar-cantidad")[0];
    botonRestarCantidad.addEventListener("click", restarCantidad);

    //Agregamos la funcion sumar
    let botonSumarCantidad = item.getElementsByClassName("sumar-cantidad")[0];
    botonSumarCantidad.addEventListener("click", sumarCantidad);

    //Actualizamos total
    actualizarTotalCarrito();
  }
}
//Aumento la cantidad del elemento seleccionado
function sumarCantidad(event) {
  let buttonClicked = event.target;
  let selector = buttonClicked.parentElement;
  console.log(
    selector.getElementsByClassName("carrito-item-cantidad")[0].value
  );
  let cantidadActual = selector.getElementsByClassName(
    "carrito-item-cantidad"
  )[0].value;
  cantidadActual++;
  selector.getElementsByClassName("carrito-item-cantidad")[0].value =
    cantidadActual;
  actualizarTotalCarrito();
}

//Resto en uno la cantidad
function restarCantidad(event) {
  let buttonClicked = event.target;
  let selector = buttonClicked.parentElement;
  console.log(
    selector.getElementsByClassName("carrito-item-cantidad")[0].value
  );
  let cantidadActual = selector.getElementsByClassName(
    "carrito-item-cantidad"
  )[0].value;
  cantidadActual--;
  if (cantidadActual >= 1) {
    selector.getElementsByClassName("carrito-item-cantidad")[0].value =
      cantidadActual;
    actualizarTotalCarrito();
  }
}

//Elimino el item seleccionado del carrito
function eliminarItemCarrito(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  //Actualizamos el total del carrito
  actualizarTotalCarrito();
  ocultarCarrito();
}

//Función que controla si hay elementos en el carrito. Si no hay, oculto el carrito.
function ocultarCarrito() {
  let carritoItems = document.getElementsByClassName("carrito-items")[0];
  if (carritoItems.childElementCount === 1) {
    let carrito = document.getElementsByClassName("carrito")[0];
    carrito.style.marginRight = "-100%";
    carrito.style.opacity = "0";
    carritoVisible = false;

    let items = document.getElementsByClassName("contenedor-items")[0];
    items.style.width = "100%";
  }
}

//Actualizamos el total de Carrito
function actualizarTotalCarrito() {
  //Seleccionamos el contenedor carrito
  let carritoContenedor = document.getElementsByClassName("carrito")[0];
  let carritoItems = carritoContenedor.getElementsByClassName("carrito-item");
  let total = 0;
  //Recorremos cada elemento del carrito para actualizar el total
  for (let i = 0; i < carritoItems.length; i++) {
    let item = carritoItems[i];
    let precioElemento = item.getElementsByClassName("carrito-item-precio")[0];
    //Quitamos el símbolo de peso y el punto de milesimos.
    let precio = parseFloat(
      precioElemento.innerText.replace("$", "").replace(".", "")
    );
    let cantidadItem = item.getElementsByClassName("carrito-item-cantidad")[0];
    console.log(precio);
    let cantidad = cantidadItem.value;
    total = total + precio * cantidad;
  }
  const nuevoTotal = total + costoEnvio;
  document.getElementsByClassName("carrito-precio-total")[0].innerText =
    "$" + nuevoTotal.toLocaleString("es") + ",00";
}
