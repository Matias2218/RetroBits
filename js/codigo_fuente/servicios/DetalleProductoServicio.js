const imprimirCarrousel = (producto) => {
    let codigoHtml;

    if (producto.imagen.length === 1) {
        codigoHtml = ` <div class="carousel-inner" role="listbox">
                        <div class="carousel-item active">
                            <img class="d-block w-100 img-thumbnail" src="${producto.imagen}" alt="First slide">
                        </div>
                    </div> 

                    <ol class="carousel-indicators">
                        <li data-target="#carousel-thumb" data-slide-to="0" class="active">
                            <img src="${producto.imagen}" width="100" class="img-thumbnail">
                        </li>
                    </ol>`;
        document.getElementById("carousel-thumb").innerHTML = codigoHtml;
    }
    else
    {
       const divCarrousel =  document.createElement('div');
       divCarrousel.classList.add("carousel-inner");
       divCarrousel.setAttribute("role", "listbox");

       const olCarrousel =  document.createElement('ol');
       olCarrousel.classList.add("carousel-indicators");

       producto.imagen.forEach((imagen, index)=>{
           if(index === 0)
           {
               let divCarrouselInto = document.createElement("div");
               divCarrouselInto.classList.add("carousel-item","active")
               let imgCarrousel = document.createElement("img");
               imgCarrousel.classList.add("d-block","w-100","img-thumbnail");
               imgCarrousel.setAttribute("src", imagen);
               divCarrousel.appendChild(divCarrouselInto);
               divCarrouselInto.appendChild(imgCarrousel);
               let liCarrousel = document.createElement("li");
               liCarrousel.classList.add("active");
               liCarrousel.setAttribute("data-target","#carousel-thumb");
               liCarrousel.setAttribute("data-slide-to",index.toString());
               imgCarrousel = document.createElement("img");
               imgCarrousel.classList.add("img-thumbnail");
               imgCarrousel.setAttribute("width", "100");
               imgCarrousel.setAttribute("src", imagen);
               olCarrousel.appendChild(liCarrousel);
               liCarrousel.appendChild(imgCarrousel);
           }
           else{
               let divCarrouselInto = document.createElement("div");
               divCarrouselInto.classList.add("carousel-item")
               let imgCarrousel = document.createElement("img");
               imgCarrousel.classList.add("d-block","w-100","img-thumbnail");
               imgCarrousel.setAttribute("src", imagen);
               divCarrousel.appendChild(divCarrouselInto);
               divCarrouselInto.appendChild(imgCarrousel);
               let liCarrousel = document.createElement("li");
               liCarrousel.setAttribute("data-target","#carousel-thumb");
               liCarrousel.setAttribute("data-slide-to",index.toString());
               imgCarrousel = document.createElement("img");
               imgCarrousel.classList.add("img-thumbnail");
               imgCarrousel.setAttribute("width", "100");
               imgCarrousel.setAttribute("src", imagen);
               olCarrousel.appendChild(liCarrousel);
               liCarrousel.appendChild(imgCarrousel);
           }
           document.getElementById("carousel-thumb").appendChild(divCarrousel);
           document.getElementById("carousel-thumb").appendChild(olCarrousel);
       })

    }
}

const imprimerDetalleProducto = (producto) => {
    const html = `<h4 class="text-uppercase">${producto.nombre}</h4>
                <h6 class="light-blue-text mb-0">${producto.tipo}</h6>
                <hr>
                <p>${producto.descripcion}</p>
                <p>Precio: $${producto.precio}</p>

                <button type="button" id="btnAgregarAlCarrito" class="btn btn-dark mt-4" data-toggle="modal" data-target="#modalPoll-1"><i
                        class="fas fa-shopping-cart"></i> Añadir al carrito</button>`;
    document.getElementById("detalleProducto").innerHTML = html;
}


document.addEventListener("DOMContentLoaded", () => {
    const productoSeleccionado = JSON.parse(sessionStorage.getItem("productoDetalle"));
    imprimirCarrousel(productoSeleccionado);
    imprimerDetalleProducto(productoSeleccionado);
});
