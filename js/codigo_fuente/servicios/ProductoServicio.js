import {Producto} from '../clases/Producto.js';

const productos = [new Producto(1, 'Super Nintendo', 'Consola', 'Consola Super Nintendo Original - 2 controladores Alternativos - Fuente de alimentación - Conexión A / V Original', 50000, 'img/supern.png'),
                   new Producto(2, 'Atari 2600', 'Consola', 'La consola ATARI 2600 con 2 mandos con cable', 5000, 'img/atari.png'),
                   new Producto(3, 'Super Mario World', 'VideoJuego Retro', 'Primer videojuego creado para acompañar el estreno de Super Nintendo Entertainment System para Japón, Europa y América del Norte.', 28000, 'img/SNES-Super-Mario-World.jpg')];

document.addEventListener('DOMContentLoaded', () => {
   cargarProductos();
});

function cargarProductos() {
    console.log(productos);
}

