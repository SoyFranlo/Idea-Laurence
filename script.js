class Producto {
  constructor(nombre, valor, alt, img) {
    this.img = img;
    this.nombre = nombre;
    this.valor = valor;
    this.alt = alt;
  }
}

const productos = [
  new Producto(
    "Tercera Camiseta Boca 23/24",
    "$27.999",
    "Camiseta Celeste Boca",
    "https://bocashop.vteximg.com.br/arquivos/ids/169709-550-550/HT9916_1.jpg?v=638199528119430000"
  ),
  new Producto(
    "Camiseta Boca Titular 22/23",
    "$21.999",
    "Camiseta Boca Titular 22/23",
    "https://bocashop.vteximg.com.br/arquivos/ids/168815-550-550/HE6329_1.jpg?v=637975643272330000"
  ),
  new Producto(
    "Camiseta Alternativa Boca 22/23",
    "$21.999",
    "Camiseta Alternativa Boca 22/23",
    "https://bocashop.vteximg.com.br/arquivos/ids/168780-550-550/IB9458_1.jpg?v=637975642811000000"
  ),
  new Producto(
    "Short Arquero Boca 22/23",
    "$12.999",
    "Short Arquero Boca 22/23",
    "https://bocashop.vteximg.com.br/arquivos/ids/168807-550-550/HE6327.jpg?v=637975643182000000"
  ),
  new Producto(
    "Tercera Camiseta 22/23",
    "$32.999",
    "Tercera Camiseta 22/23",
    "https://bocashop.vteximg.com.br/arquivos/ids/169068-550-550/GC0433_1.jpg?v=638036881373030000"
  ),
  new Producto(
    "Hoodie Boca",
    "$29.999",
    "Hoodie Boca",
    "https://bocashop.vteximg.com.br/arquivos/ids/169541-550-550/HC0984_2.jpg?v=638122401881500000"
  ),
  new Producto(
    "Campera Presentación Boca",
    "$30.000",
    "Campera Presentación Boca",
    "https://bocashop.vteximg.com.br/arquivos/ids/169286-550-550/HC1009_1.jpg?v=638090670845130000"
  ),
  new Producto(
    "Campera Invierno Boca",
    "$62.999",
    "Campera Invierno Boca",
    "https://bocashop.vteximg.com.br/arquivos/ids/168666-550-550/HB0565_1.jpg?v=637944618994930000"
  ),
  new Producto(
    "Camiseta Titular Basquet",
    "$17.999",
    "Camiseta Titular Basquet",
    "https://bocashop.vteximg.com.br/arquivos/ids/169683-550-550/HR8267_1.png?v=638193397661070000"
  ),
];

const productContainer = document.querySelector(".contenedor-items");

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
});
let submitButton = document.getElementById("botonform");

submitButton.addEventListener("click", function (e) {
  e.preventDefault();

  let nombre = document.getElementById("nombre").value;
  let email = document.getElementById("email").value;
  let contrasena = document.getElementById("password").value;
  const header = document.querySelector(".header");

  let nuevousuario = {
    nombreUsuario: nombre,
    emailUsuario: email,
    contrasenaUsuario: contrasena,
    estaLogueado: false,
  };

  if (!nombre || !email || !contrasena) {
    alert("Hay campos sin completar");
    return;
  } else {
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      alert("El correo ingresado no es válido.");
      return;
    } else {
      localStorage.setItem("usuario", JSON.stringify(nuevousuario));
      alert("Hola " + nombre);
      document.getElementById("myForm").style.display = "none";
      let header = document.getElementsByClassName("header")[0];
      const headerh2 = document.createElement("h2");
      let cerrarsesion = document.createElement("button");
      cerrarsesion.classList.add("cerrarsesion");
      cerrarsesion.textContent = "Cerrar Sesión";
      headerh2.textContent = "Bienvenido " + nombre;
      header.appendChild(headerh2);
      header.appendChild(cerrarsesion);
      cerrarsesion.addEventListener("click", function () {
        location.reload();
      });
    }
  }
});



//Variable que mantiene el estado visible del carrito
let carritoVisible = false;

//Espermos que todos los elementos de la página cargen para ejecutar el script
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
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
  let botonesRestarCantidad =
    document.getElementsByClassName("restar-cantidad");
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
}

//Eliminamos todos los elementos del carrito y lo ocultamos

function pagarClicked() {
  let btnPagar = document.getElementsByClassName("btn-pagar")[0];
  btnPagar.style.display = "none";
  let usuarioGuardado = localStorage.getItem("usuario");
  if (usuarioGuardado) {
    let usuario = JSON.parse(usuarioGuardado);
    if (!usuario.estaLogueado) {
      // Crear elementos de input para email y contraseña
      let emailInput = document.createElement("input");
      emailInput.type = "email";
      emailInput.placeholder = "Ingresa tu email";
      emailInput.id = "emailCarrito";

      let contrasenaInput = document.createElement("input");
      contrasenaInput.type = "password";
      contrasenaInput.placeholder = "Ingresa tu contraseña";
      contrasenaInput.id = "contrasenaCarrito";

      // Mostrar inputs en el carrito
      let carritoItems = document.getElementsByClassName("carrito-items")[0];
      let inputsContainer = document.createElement("div");
      inputsContainer.classList.add("carrito-inputs-container");
      inputsContainer.appendChild(emailInput);
      inputsContainer.appendChild(contrasenaInput);
      carritoItems.appendChild(inputsContainer);

      // Crear botón de confirmar
      let confirmarButton = document.createElement("button");
      confirmarButton.textContent = "Confirmar";
      confirmarButton.classList.add("carrito-confirmar-button");
      carritoItems.appendChild(confirmarButton);

      // Escuchar el evento click del botón de confirmar
      confirmarButton.addEventListener("click", function () {
        let emailCarrito = document.getElementById("emailCarrito").value;
        let contrasenaCarrito =
          document.getElementById("contrasenaCarrito").value;

        // Validar si los datos ingresados coinciden con los del usuario almacenado
        if (
          emailCarrito === usuario.emailUsuario &&
          contrasenaCarrito === usuario.contrasenaUsuario
        ) {
          // Eliminar los inputs y el botón del carrito
          carritoItems.removeChild(inputsContainer);
          carritoItems.removeChild(confirmarButton);

          // Resto del código para completar la compra...
          alert("Gracias por tu compra!");
          vaciarCarrito();
        } else {
          alert("Los datos ingresados no coinciden con los del usuario.");
        }
      });
    }
  }
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

  agregarItemAlCarrito(titulo, precio, imagenSrc);

  hacerVisibleCarrito();
}

//Función que hace visible el carrito
function hacerVisibleCarrito() {
  carritoVisible = true;
  let carrito = document.getElementsByClassName("carrito")[0];
  carrito.style.marginRight = "0";
  carrito.style.opacity = "1";

  let items = document.getElementsByClassName("contenedor-items")[0];
  items.style.width = "60%";
}

//Función que agrega un item al carrito
function agregarItemAlCarrito(titulo, precio, imagenSrc) {
  let item = document.createElement("div");
  item.classList.add("item");
  let itemsCarrito = document.getElementsByClassName("carrito-items")[0];
  //Controlamos que el item que intenta ingresar no se encuentre en el carrito
  let nombresItemsCarrito = itemsCarrito.getElementsByClassName(
    "carrito-item-titulo"
  );
  for (let i = 0; i < nombresItemsCarrito.length; i++) {
    if (nombresItemsCarrito[i].innerText == titulo) {
      alert("El item ya se encuentra en el carrito");
    }
  }
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

  //La siguiente función controla si hay elementos en el carrito
  //Si no hay, elimino el carrito
  ocultarCarrito();
}

//Función que controla si hay elementos en el carrito. Si no hay, oculto el carrito.
function ocultarCarrito() {
  let carritoItems = document.getElementsByClassName("carrito-items")[0];
  if (carritoItems.childElementCount == 0) {
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

  document.getElementsByClassName("carrito-precio-total")[0].innerText =
    "$" + total.toLocaleString("es") + ",00";
}
