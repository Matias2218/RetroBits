import {Producto} from '../clases/Producto.js';

const productos = [new Producto(1, 'NINTENDO NES', "Consola / VideoJuegos", "NES, la aclamada consola de Nintendo, lanzada en 1985, original y con todos sus accesorios.\n" +
    "\n" +
    "Solo tienes que conectar la consola NES a tu televisor, agarrar el control clásico y redescubrir el encanto de los juegos de NES.", 35000, ["img/nintendones.png", "img/supermario.png", "img/mariobros.png"], 1),
    new Producto(2, "ATARI 2600", "Consola", "Consola Atari 2600 reparada, con un control y cableado original.", 35000, ["img/atari2600.png"], 1),
    new Producto(3, "Crash Bandicoot 4", "VideoJuego", "Crash Bandicoot 4: La venganza de Cortex para GameCube", 35000, ["img/crash.png"], 1),
    new Producto(4, "Control PlayStation 1", "Control", "Control PlayStation 1 rojo, SCPH-1080. Control original.", 35000, ["img/controller.png"], 1),
    new Producto(5, "Dreamcast", "Consola", "Consola Dreamcast incluye un control más cableado original. ", 35000, ["img/dreamcast.png"], 1),
    new Producto(6, "Nintendo 64", "Consola", "Consola Nintendo 64 original nueva, caja cerrada.", 35000, ["img/nintendo64.png"], 1),

];

document.addEventListener("DOMContentLoaded", () => {
});

var detallesRef = document.querySelectorAll("a[name='detalleHref']");
for (let i = 0; i < detallesRef.length; i++) {
    detallesRef[i].addEventListener("click", (e) => {
        const idProducto = e.target.parentElement.children[1].value;
        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id == idProducto) {
                sessionStorage.setItem("productoDetalle", JSON.stringify(productos[i]));
                window.location.href = "detalleProducto.html";
            }
        }
    });
}

