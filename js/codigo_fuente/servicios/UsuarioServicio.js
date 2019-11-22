import {Usuario} from '../clases/Usuario.js';

function load(url, element) {
    let req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    element.innerHTML = req.responseText;
}

window.addEventListener("load", () => {
    cargarCarrito();
    if (window.location.pathname == "/RetroBits/carrito.html") {
        cargarVistaCarrito();
    }
});

function cargarVistaCarrito() {
    let html = "";
    let htmlTotal = "";
    let totalPrecio = 0;
    const productos = JSON.parse(sessionStorage.getItem("productosCarrito"));
    productos.forEach((producto, index) => {
        if (index === 0) {
            totalPrecio += producto.precio * producto.cantidad;
            let htmlPrev = ` <h5 class="h5 mb-0">Mi Carrito</h5>
                    <hr>
                    <div class="row mb-4" id="carrito${producto.id}">
                        <div class="col-sm-4">
                            <img src="${producto.imagen[0]}" class="w-100 img-thumbnail">
                        </div>
                        <div class="col-sm-4">
                            <p class="mb-0">${producto.nombre}</p>
                            <p class="mb-0">Cantidad: ${producto.cantidad}</p>
                            <a class="mb-0" name="eliminarVista"><small><i class="far fa-trash-alt fa-1x text-dark"></i> Eliminar</small></a>
                        </div>
                        <div class="col-sm-4">
                            <p class="light-blue-text text-right mb-0">
                                <strong>$${producto.precio}</strong>
                            </p>
                        </div>
                    </div>`;
            let htmlTotalPrev = `<div class="text-center border border-light p-5">
                    <h5 class="h5 mb-0">Total</h5>
                    <hr>
                    <table class="table mb-5 table-borderless">
                       <tr>
                            <td class="text-left py-0">
                                <p>${producto.nombre}</p>
                            </td>
                            <td class="text-right py-0">
                                <h6 class="h6 mb-0">
                                    <p>$${producto.precio * producto.cantidad}</p>
                                </h6>
                            </td>
                        </tr>`;
            htmlTotal += htmlTotalPrev;
            html += htmlPrev;
        }
        else {
            totalPrecio += producto.precio * producto.cantidad;
            let htmlPrev = `<div class="row mb-4" id="carrito${producto.id}">
                        <div class="col-sm-4">
                            <img src="${producto.imagen[0]}" class="w-100 img-thumbnail">
                        </div>
                        <div class="col-sm-4">
                            <p class="mb-0">${producto.nombre}</p>
                            <p class="mb-0">Cantidad: ${producto.cantidad}</p>
                            <a class="mb-0" name="eliminarVista"><small><i class="far fa-trash-alt fa-1x text-dark"></i> Eliminar</small></a>
                        </div>
                        <div class="col-sm-4">
                            <p class="light-blue-text text-right mb-0">
                                <strong>$${producto.precio}</strong>
                            </p>
                        </div>
                    </div>`;
            let htmlTotalPrev = `<tr>
                            <td class="text-left py-0">
                                <p>${producto.nombre}</p>
                            </td>
                            <td class="text-right py-0">
                                <h6 class="h6 mb-0">
                                    <p>$${producto.precio * producto.cantidad}</p>
                                </h6>
                            </td>
                        </tr>`;
            htmlTotal += htmlTotalPrev;
            html += htmlPrev;
        }
    });
    let htmlTotalPrev = `
                    </table>
                    <label><small>¿Tienes un código promocional?</small></label>
                    <div class="form-row mb-3">
                        <div class="col">
                            <input type="text" id="txtCupon" class="form-control" placeholder="Ingresalo aquí">
                        </div>
                        <div class="col">
                            <button class="btn btn-warning text-dark btn-block btn-sm h-100">Cupon</button>
                        </div>
                    </div>
                    <table class="table mb-3 table-borderless">
                        <tr>
                            <td class="text-left py-0">
                                <h4 class="h4 mb-0">TOTAL</h4>
                            </td>
                            <td class="text-right py-0">
                                <h4 class="h4 mb-0">$${totalPrecio}</h4>
                            </td>
                        </tr>
                    </table>
                    <button class="btn btn-dark btn-block" onclick="window.location='detallePago.html';">Comprar</button>
                </div>`;
    htmlTotal += htmlTotalPrev;
    document.getElementById("divVistaCarrito").innerHTML = html;
    document.getElementById("divTotal").innerHTML = htmlTotal;
    const ahref = document.getElementsByName("eliminarVista");
    for (let i = 0; i < ahref.length; i++) {
        ahref[i].addEventListener("click", (e) => {
            const productosCarrito = JSON.parse(sessionStorage.getItem("productosCarrito"));
            const divRow = e.target.closest(".row");
            const idProducto = divRow.id.split(/(\d+)/)[1];
            console.log(idProducto);
            let productosFiltrados = productosCarrito.filter(producto => producto.id != idProducto);
            sessionStorage.setItem("productosCarrito", JSON.stringify(productosFiltrados));
            divRow.remove();
            cargarCarrito();
            cargarVistaCarrito();
        });
    }
}

function cargarCarrito() {
    const modalLimpiar = document.getElementById("modalCarrito");
    while (modalLimpiar.firstChild) {
        modalLimpiar.removeChild(modalLimpiar.firstChild);
    }
    const productos = JSON.parse(sessionStorage.getItem("productosCarrito"));
    let totalProductos = 0;
    if(productos.length === 0)
    {
        const btn = document.getElementById("btnVerCarrito");
        btn.setAttribute("disabled", "true");
        const btnComprar = document.getElementById("btnComprar");
        btnComprar.setAttribute("disabled", "true");
    }
    productos.forEach((productoParaAgregar) => {
        totalProductos += productoParaAgregar.precio * productoParaAgregar.cantidad;
        const divRow = document.createElement("row");
        divRow.classList.add("row", "mb-4");
        divRow.setAttribute("id", productoParaAgregar.id)
        const divCol4 = document.createElement("col-4");
        divCol4.classList.add("col-4");
        const img = document.createElement("img");
        img.setAttribute("src", productoParaAgregar.imagen[0])
        img.classList.add("w-100", "img-thumbnail");
        const divCol8 = document.createElement("col-8");
        divCol8.classList.add("col-8");
        divRow.appendChild(divCol4);
        divCol4.appendChild(img);
        divRow.appendChild(divCol8);
        const pNombre = document.createElement("p");
        pNombre.classList.add("mb-0");
        pNombre.innerText = productoParaAgregar.nombre;
        divCol8.appendChild(pNombre);
        const pPrecio = document.createElement("p");
        pPrecio.classList.add("light-blue-text", "mb-0");
        divCol8.appendChild(pPrecio);
        const strong = document.createElement("strong");
        strong.innerText = `$${productoParaAgregar.precio}`;
        pPrecio.appendChild(strong);
        const pCantidad = document.createElement("p");
        pCantidad.classList.add("mb-0");
        pCantidad.innerText = `Cantidad: ${productoParaAgregar.cantidad}`;
        divCol8.appendChild(pCantidad);
        const a = document.createElement("a");
        a.classList.add("mb-0");
        a.innerText = "Eliminar";
        const i = document.createElement("i");
        i.setAttribute("name", "eliminarProducto");
        i.classList.add("far", "fa-trash-alt", "fa-1x", "text-dark");
        a.appendChild(i);
        divCol8.appendChild(a);
        document.getElementById("modalCarrito").appendChild(divRow);
    });
    const ahref = document.getElementsByName("eliminarProducto");
    for (let i = 0; i < ahref.length; i++) {
        ahref[i].addEventListener("click", (e) => {
            let href = e.target.parentElement.parentElement.parentElement;
            const productosCarrito = JSON.parse(sessionStorage.getItem("productosCarrito"));
            let productosFiltrados = productosCarrito.filter(producto => producto.id != href.id);
            let totalProductos = productosFiltrados
                .map(producto => producto.precio * producto.cantidad)
                .reduce((a, s) => a + s, 0);
            document.getElementById("totalProductos").innerText = "$" + totalProductos.toString();
            sessionStorage.setItem("productosCarrito", JSON.stringify(productosFiltrados));
            href.remove();
            if(productosFiltrados.length === 0)
            {
                console.log("aqui");
                const btn = document.getElementById("btnVerCarrito");
                btn.setAttribute("disabled","true");
                const btnComprar = document.getElementById("btnComprar");
                btnComprar.setAttribute("disabled", "true");
            }
            if (window.location.pathname == "/RetroBits/carrito.html") {
                cargarVistaCarrito();
            }
        });
    }
    document.getElementById("totalProductos").innerText = totalProductos;
    sessionStorage.setItem("totalProductos", totalProductos);
}

document.addEventListener('DOMContentLoaded', () => {
    load("modales.html", document.getElementById('modales'));
    const divsIniciarCrearCuenta = "\n" +
        "        <ul class=\"navbar-nav mr-auto\">\n" +
        "            <li class=\"nav-item \">\n" +
        "                <a class=\"nav-link\" href=\"#\">Inicio</a>\n" +
        "            </li>\n" +
        "            <li class=\"nav-item\">\n" +
        "                <a class=\"nav-link\" href=\"productos.html\">Productos</a>\n" +
        "            </li>\n" +
        "            <li class=\"nav-item\">\n" +
        "                <a class=\"nav-link\" href=\"#\">Galeria</a>\n" +
        "            </li>\n" +
        "        </ul>\n" +
        "        <div style=\"height: 40px; padding: 6px 0 6px;\"><a data-toggle=\"modal\" id=\"btnIniciarSesion\" data-target=\"#modalLRForm\" class=\"text-dark p-6\">Iniciar\n" +
        "            Sesion</a></div>\n" +
        "        <div class=\"text-center\">\n" +
        "            <a href=\"\" class=\"btn btn-dark btn-rounded\" id=\"btnCrearCuenta\" data-toggle=\"modal\"\n" +
        "               data-target=\"#modalLRForm\">\n" +
        "                Crear Cuenta</a>\n" +
        "        </div> " +
        "        <div>" +
        "         <a id='btnCarrito' data-toggle=\"modal\" data-target=\"#modalPoll-1\"><i\n" +
        "                        class=\"fas fa-shopping-cart ml-3\"></i> Carrito</a>   " +
        "        </div>";
    if (sessionStorage.getItem('usuarioLogeado') === null) {
        document.getElementById('basicExampleNav').innerHTML = divsIniciarCrearCuenta;
        document.getElementById('btnCrearCuenta').addEventListener('click', () => {
            activarIniciarSesion();
        });

        document.getElementById('btnIniciarSesion').addEventListener('click', () => {
            activarCrearCuenta();
        });

        document.getElementById('iniciaSesionHref').addEventListener('click', () => {
            activarCrearCuenta();
        });

        document.getElementById('creaCuentaHref').addEventListener('click', () => {
            activarIniciarSesion();
        });
        document.getElementById('btnIniciarSesionUsuario').addEventListener('click', () => {
            const correo = document.getElementById('modalLRInput10').value;
            const contra = document.getElementById('modalLRInput11').value;
            const usuarios = JSON.parse(sessionStorage.getItem('usuarios'));

            usuarios.forEach((usuario) => {
                if (correo === usuario.correo && contra === usuario.contraseña) {
                    console.log('Si puedo logear');
                    sessionStorage.setItem("usuarioLogeado", JSON.stringify(usuario));
                    window.location.href = document.URL;
                }
            });
            console.log('No puede logear');
        });
    } else {
        const nombre = JSON.parse(sessionStorage.getItem('usuarioLogeado')).nombre;
        const correo = JSON.parse(sessionStorage.getItem('usuarioLogeado')).correo;
        const datos = `<ul class="navbar-nav mr-auto">
            <li class="nav-item ">
                <a class="nav-link" href="#">Inicio</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="productos.html">Productos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Galeria</a>
            </li>
        </ul> 
        <div style="height: 40px; padding: 0 0 5px;">
           <p class="mb-0 p-6 mt-1">Bienvenido <strong>${nombre}</strong></p>
        </div>
        <a class="btn btn-dark" id="btnCerrarSesion" href="#">Cerrar sesión</a>
        <a id=btnCarrito data-toggle="modal" data-target="#modalPoll-1"><i class="fas fa-shopping-cart ml-3"></i> Carrito</a>
`;
        document.getElementById('basicExampleNav').innerHTML = datos;
        document.getElementById("btnCerrarSesion").addEventListener("click", () => {
            sessionStorage.removeItem('usuarioLogeado');
            window.location.href = document.URL;
        });
        if(window.location.pathname === "/RetroBits/detallePago.html")
        {
            document.getElementById("txtnombre").setAttribute("value", nombre);
            document.getElementById("txtnombre").setAttribute("disabled", "true");
            document.getElementById("txtEmail").setAttribute("value", correo);
            document.getElementById("txtEmail").setAttribute("disabled", "true");
        }
    }
});


$('#modalLRForm').on('hidden.bs.modal', () => {
    const formRegistro = document.getElementById('formRegistro');
    const formIniciarSesion = document.getElementById('formIniciarSesion');
    formRegistro.parentElement.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
    formIniciarSesion.parentElement.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
    formRegistro.reset();
    formIniciarSesion.reset();

});

function activarIniciarSesion() {
    document.getElementById('crearCuentaTab').classList.add('active');
    document.getElementById('iniciarSesionTab').classList.remove('active');
    document.getElementById('panel7').classList.remove('in', 'show', 'active');
    document.getElementById('panel8').classList.add('in', 'show', 'active');
}

function activarCrearCuenta() {
    document.getElementById('crearCuentaTab').classList.remove('active');
    document.getElementById('iniciarSesionTab').classList.add('active');
    document.getElementById('panel7').classList.add('in', 'show', 'active');
    document.getElementById('panel8').classList.remove('in', 'show', 'active');
}


(function () {
    'use strict';
    window.addEventListener('load', function () {
// Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
// Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                let nombre = document.getElementById('modalLRInput12');
                let email = document.getElementById('modalLRInput13');
                let contrasena = document.getElementById('modalLRInput14');
                let contrasena2 = document.getElementById('modalLRInput15');
                let formRegistro = document.getElementById('formRegistro');
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                if (contrasena.value != contrasena2.value || (contrasena.value == "" || contrasena2.value == "")) {
                    console.log('hola');
                    contrasena.classList.add('invalid');
                    contrasena2.classList.add('invalid');
                    formRegistro.classList.remove('was-validated');
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    form.classList.add('was-validated');
                    if (sessionStorage.getItem('usuarios') === null) {
                        Push.create('Usuario Creado con éxito', {
                            body: "Nombre: "+nombre.value+"\nEmail: "+email.value,
                            icon: 'img/user.png',
                            timeout: 6500,
                            onClick: function () {
                                window.focus();
                                this.close();
                            }
                        });
                        let usuario = [new Usuario(Math.floor((Math.random() * 100) + 1), nombre.value, email.value, contrasena.value)];
                        sessionStorage.setItem('usuarios', JSON.stringify(usuario));
                    } else {
                        let usuarios = sessionStorage.getItem('usuarios');
                        usuarios = JSON.parse(usuarios);
                        usuarios.push(new Usuario(Math.floor((Math.random() * 100) + 1), nombre.value, email.value, contrasena.value));
                        sessionStorage.setItem('usuarios', JSON.stringify(usuarios));
                        Push.create('Usuario Creado con éxito', {
                            body: "Nombre: "+nombre.value+"\nEmail: "+email.value,
                            icon: 'img/user.png',
                            timeout: 6500,
                            onClick: function () {
                                window.focus();
                                this.close();
                            }
                        });
                    }
                    $('#modalLRForm').modal('hide').on('hidden.bs.modal', () => {
                        const formRegistro = document.getElementById('formRegistro');
                        const formIniciarSesion = document.getElementById('formIniciarSesion');
                        formRegistro.parentElement.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
                        formRegistro.classList.remove('was-validated');
                        formIniciarSesion.parentElement.querySelectorAll('.active').forEach(e => e.classList.remove('active'));
                        formRegistro.reset();
                        formIniciarSesion.reset();

                    });
                    event.preventDefault();
                }
            }, false);
        });
    }, false);
})();


(function() {
    'use strict';
    window.addEventListener('load', function() {
// Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validatio');
// Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                else
                {
                    event.preventDefault();
                    event.stopPropagation();
                    window.location.href= "compras.html";
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();
