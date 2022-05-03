fetch("http://localhost:9000/api/products/roedor/comida")
.then(response => {
   return response.json();
})
.then(
    (data) => {
        var divP = '';
        for(var i = 0; i <= data.length -1; i++){
            if(i < 5) divP = 'parte1';
            else divP = 'parte2';
            
            crearMiniatura(
                divP,
                data[i].imagen,
                data[i].nombre,
                data[i].precio,
                data[i].oferta,
                data[i].descuento,
                data[i].opciones,
                data[i].identificador);
        }
    }
);

function crearMiniatura(div, img, nombre, precio, oferta, descuento, opciones, id) {
    var parte1 = document.getElementById(div);
    
    var div = document.createElement('div');
    div.className = "col";
    parte1.appendChild(div);
    
    var imgs = document.createElement('img');
    imgs.src = img;
    imgs.style.width = "60%"
    imgs.alt = nombre;
    
    var pNombre = document.createElement('p');
    pNombre.className = "nombre-producto";
    pNombre.innerHTML = `<b>${nombre.split("-")[0]}</b> ${nombre.split("-")[1]}`;

    var pPrecio = document.createElement('p');
    pPrecio.innerHTML = `<b>${precio}</b>`;

    var pOferta = document.createElement('p');
    pOferta.className = "oferta-producto";
    pOferta.innerHTML = `<b>${oferta} <span class= "descuento-producto">${descuento}</span></b>`;

    var pOpciones = document.createElement('p');
    pOpciones.className = "opc-producto";
    pOpciones.innerHTML = `<b>Opciones: </b> <span>${opciones}</span>`;
    
    const btnCarrito = document.createElement('button');
    btnCarrito.className = "btn btn-success";
    btnCarrito.innerHTML = '<i class="fa fa-cart-plus" aria-hidden="true"></i> Agregar al carrito';
    btnCarrito.onclick = () => {
        alert(`El ID es: ${id}`);
    }

    div.appendChild(imgs);
    div.appendChild(pNombre);
    div.appendChild(pPrecio);
    div.appendChild(pOferta);
    div.appendChild(pOpciones);
    div.appendChild(btnCarrito);
}