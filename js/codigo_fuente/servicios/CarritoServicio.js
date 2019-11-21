document.addEventListener("DOMContentLoaded", () => {

});

document.getElementById("btnAgregarAlCarrito").addEventListener("click", () => {
    const productoParaAgregar = JSON.parse(sessionStorage.getItem("productoDetalle"));
    const divRow = document.createElement("row");
    divRow.classList.add("row");
    const divCol4 = document.createElement("col-4");
    divCol4.classList.add("col-4");
    const img = document.createElement("img");
    img.setAttribute("src", productoParaAgregar.imagen[0])
    img.classList.add("w-100","img-thumbnail");
    const divCol8 = document.createElement("col-8");
    divCol8.classList.add("col-8");
    const pNombre = document.createElement("p");
    pNombre.classList.add("mb-0");
    pNombre.innerText = productoParaAgregar.nombre;
    const pPrecio = document.createElement("p");
    pPrecio.classList.add("light-blue-text","mb-0");
    const strong = document.createElement("strong");
    strong.innerText = `$${productoParaAgregar.precio}`;
    const pCantidad = document.createElement("p");
    pCantidad.classList.add("mb-0");
    pCantidad.innerText = `Cantidad: 1`;


});