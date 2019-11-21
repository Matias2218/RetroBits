import {Usuario} from '../clases/Usuario.js';

function load(url, element)
{
    let req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send(null);
    element.innerHTML = req.responseText;
}

document.addEventListener('DOMContentLoaded', ()=> {
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
        "         <a><i\n" +
        "                        class=\"fas fa-shopping-cart ml-3\" data-toggle=\"modal\" data-target=\"#modalPoll-1\"></i></a>   "+
        "        </div>";
    if(sessionStorage.getItem('usuarioLogeado') === null)
    {
        document.getElementById('basicExampleNav').innerHTML =   divsIniciarCrearCuenta;
        document.getElementById('btnCrearCuenta').addEventListener('click', ()=>{
            activarIniciarSesion();
        });

        document.getElementById('btnIniciarSesion').addEventListener('click', ()=>{
            activarCrearCuenta();
        });

        document.getElementById('iniciaSesionHref').addEventListener('click', ()=>{
            activarCrearCuenta();
        });

        document.getElementById('creaCuentaHref').addEventListener('click', ()=>{
            activarIniciarSesion();
        });
        document.getElementById('btnIniciarSesionUsuario').addEventListener('click', ()=>{
            const correo = document.getElementById('modalLRInput10').value;
            const contra = document.getElementById('modalLRInput11').value;
            const usuarios = JSON.parse(sessionStorage.getItem('usuarios'));

            usuarios.forEach((usuario)=>{
                if(correo === usuario.correo && contra === usuario.contraseña)
                {
                    console.log('Si puedo logear');
                    sessionStorage.setItem("usuarioLogeado",JSON.stringify(usuario));
                    window.location.href = "productos.html";
                }
            });
            console.log('No puede logear');
        });
    }
    else {
        const nombre = JSON.parse(sessionStorage.getItem('usuarioLogeado')).nombre;
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
        <h4 style="margin-right: 25px">Bienvenido ${nombre}</h4>
        <a class="nav link" id="btnCerrarSesion" href="#">Cerrar sesión</a>`;
        document.getElementById('basicExampleNav').innerHTML = datos;

        document.getElementById("btnCerrarSesion").addEventListener("click", ()=>{
           sessionStorage.removeItem('usuarioLogeado');
           window.location.href = "index.html";
        });
    }
});


$('#modalLRForm').on('hidden.bs.modal', ()=>{
    const formRegistro = document.getElementById('formRegistro');
    const formIniciarSesion = document.getElementById('formIniciarSesion');
    formRegistro.parentElement.querySelectorAll('.active').forEach( e => e.classList.remove('active'));
    formIniciarSesion.parentElement.querySelectorAll('.active').forEach( e => e.classList.remove('active'));
    formRegistro.reset();
    formIniciarSesion.reset();

});
function activarIniciarSesion() {
    document.getElementById('crearCuentaTab').classList.add('active');
    document.getElementById('iniciarSesionTab').classList.remove('active');
    document.getElementById('panel7').classList.remove('in','show','active');
    document.getElementById('panel8').classList.add('in','show','active');
}

function activarCrearCuenta()
{
    document.getElementById('crearCuentaTab').classList.remove('active');
    document.getElementById('iniciarSesionTab').classList.add('active');
    document.getElementById('panel7').classList.add('in','show','active');
    document.getElementById('panel8').classList.remove('in','show','active');
}




(function() {
    'use strict';
    window.addEventListener('load', function() {
// Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
// Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                let nombre = document.getElementById('modalLRInput12');
                let email = document.getElementById('modalLRInput13');
                let contrasena = document.getElementById('modalLRInput14');
                let contrasena2 = document.getElementById('modalLRInput15');
                let formRegistro = document.getElementById('formRegistro');
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                if(contrasena.value != contrasena2.value || (contrasena.value == "" || contrasena2.value == ""))
                {
                    console.log('hola');
                    contrasena.classList.add('invalid');
                    contrasena2.classList.add('invalid');
                    formRegistro.classList.remove('was-validated');
                    event.preventDefault();
                    event.stopPropagation();
                }
                else
                {
                    form.classList.add('was-validated');
                    if(sessionStorage.getItem('usuarios') === null)
                    {
                        Push.create('Usuario Creado con éxito');
                        let usuario = [new Usuario(Math.floor((Math.random() * 100) + 1), nombre.value, email.value, contrasena.value)];
                        sessionStorage.setItem('usuarios',JSON.stringify(usuario));
                    }
                    else
                    {
                        let usuarios = sessionStorage.getItem('usuarios');
                        usuarios = JSON.parse(usuarios);
                        usuarios.push(new Usuario(Math.floor((Math.random() * 100) + 1), nombre.value, email.value, contrasena.value));
                        sessionStorage.setItem('usuarios', JSON.stringify(usuarios));
                        Push.create('Usuario Creado con éxito');
                    }
                    $('#modalLRForm').modal('hide').on('hidden.bs.modal', ()=>{
                        const formRegistro = document.getElementById('formRegistro');
                        const formIniciarSesion = document.getElementById('formIniciarSesion');
                        formRegistro.parentElement.querySelectorAll('.active').forEach( e => e.classList.remove('active'));
                        formRegistro.classList.remove('was-validated');
                        formIniciarSesion.parentElement.querySelectorAll('.active').forEach( e => e.classList.remove('active'));
                        formRegistro.reset();
                        formIniciarSesion.reset();

                    });
                    event.preventDefault();
                }
            }, false);
        });
    }, false);
})();

