document.addEventListener("DOMContentLoaded", () => {
    const total = sessionStorage.getItem("totalProductos");
    document.getElementById("totalVenta").innerHTML = "Total de la compra: $"+total;
    Push.create('Venta confirmada!', {
        body: "Venta 091932\nTotal Venta:$"+total,
        icon: 'img/truck.png',
        timeout: 4000,
        onClick: function () {
            window.focus();
            this.close();
        }
    });
    sessionStorage.removeItem("productosCarrito");
    sessionStorage.removeItem("totalProductos");


});
window.addEventListener("load", () => {
    document.getElementById("btnVerCarrito").setAttribute("disabled","true");
    document.getElementById("btnComprar").setAttribute("disabled","true");
});
