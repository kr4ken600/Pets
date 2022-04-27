//Funcion para obtener la informacion del archivo JSON
fetch("http://localhost:9000/api/products/perro/comida")
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
                data[i].opciones);
        }
    }
);

//Funcion para crear la miniatura
function crearMiniatura(div, img, nombre, precio, oferta, descuento, opciones) {

    //Obtenemos el div que se va a ocupar como contenedor
    var parte1 = document.getElementById(div);
    
    //Creamos un div para contener toda la informacion
    var div = document.createElement('div');
    div.className = "col";
    parte1.appendChild(div);
    
    //Creamos la imgaen
    var imgs = document.createElement('img');
    imgs.src = img;
    imgs.style.width = "60%"
    imgs.alt = nombre;
    
    //Creamos el nombre del producto
    var pNombre = document.createElement('p');
    pNombre.className = "nombre-producto";
    pNombre.innerHTML = `<b>${nombre.split("-")[0]}</b> ${nombre.split("-")[1]}`;

    //Creamos el precio
    var pPrecio = document.createElement('p');
    pPrecio.innerHTML = `<b>${precio}</b>`;

    //Creamos la oferta
    var pOferta = document.createElement('p');
    pOferta.className = "oferta-producto";
    pOferta.innerHTML = `<b>${oferta} <span class= "descuento-producto">${descuento}</span></b>`;

    //Creamos las opciones de compra
    var pOpciones = document.createElement('p');
    pOpciones.className = "opc-producto";
    pOpciones.innerHTML = `<b>Opciones: </b> <span>${opciones}</span>`;

    //Agregamos todo al div contenedor de informacion
    div.appendChild(imgs);
    div.appendChild(pNombre);
    div.appendChild(pPrecio);
    div.appendChild(pOferta);
    div.appendChild(pOpciones);
}

