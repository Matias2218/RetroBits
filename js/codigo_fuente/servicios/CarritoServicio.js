document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname == "/RetroBits/carrito.html") {
    } else {
        agregarAlCarrito();
    }
});


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
        });
    }
    document.getElementById("totalProductos").innerText = "$" + totalProductos;
    sessionStorage.setItem("totalProductos", totalProductos);
}

function agregarAlCarrito() {
    document.getElementById("btnAgregarAlCarrito").addEventListener("click", () => {
        const productoParaAgregar = JSON.parse(sessionStorage.getItem("productoDetalle"));
        if (sessionStorage.getItem("productosCarrito") === null) {
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
            document.getElementById("totalProductos").innerText = "$" + (productoParaAgregar.precio * productoParaAgregar.cantidad).toString();
            sessionStorage.setItem("productosCarrito", JSON.stringify([productoParaAgregar]));
            sessionStorage.setItem("totalProductos", (productoParaAgregar.precio * productoParaAgregar.cantidad).toString());
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
                });
            }
        } else {
            const productos = JSON.parse(sessionStorage.getItem("productosCarrito"));
            if(productos.length === 0)
            {
                const btn = document.getElementById("btnVerCarrito");
                btn.removeAttribute("disabled");
                const btnComprar = document.getElementById("btnComprar");
                btnComprar.removeAttribute("disabled");
            }
            let totalProductos = 0;
            let esRepetido = false;
            productos.forEach((producto) => {
                if (producto.id === productoParaAgregar.id) {
                    ++producto.cantidad;
                    esRepetido = true;
                }
            });
            if (!esRepetido) {
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
                productos.push(productoParaAgregar);
                productos.forEach((producto) => totalProductos += producto.precio * producto.cantidad);
                sessionStorage.setItem("productosCarrito", JSON.stringify(productos));
                sessionStorage.setItem("totalProductos", totalProductos);
                document.getElementById("totalProductos").innerText = "$" + totalProductos;
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
                            const btn = document.getElementById("btnVerCarrito");
                            btn.setAttribute("disabled","true");
                            const btnComprar = document.getElementById("btnComprar");
                            btnComprar.setAttribute("disabled", "true");
                        }
                    });
                }
            } else {
                sessionStorage.setItem("productosCarrito", JSON.stringify(productos));
                cargarCarrito();
            }

        }
    });
}

