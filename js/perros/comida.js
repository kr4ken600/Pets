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
                data[i].opciones,
                data[i].identificador);
        }
    }
);

//Funcion para crear la miniatura
function crearMiniatura(div, img, nombre, precio, oferta, descuento, opciones, id) {

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

    const btnCarrito = document.createElement('button');
    btnCarrito.disabled = true;
    btnCarrito.className = "btn btn-success";
    btnCarrito.innerHTML = '<i class="fa fa-cart-plus" aria-hidden="true"></i> Agregar al carrito';
    btnCarrito.onclick = () => {
        const xhr = new XMLHttpRequest();
        
        const data = JSON.stringify({
            identificador: generateRandomIdentificador(5),
            id_cliente: localStorage.getItem("id"),
            id_producto: id,
            cantidad: document.getElementById(id).value,
            precio: `${(document.getElementById(id).value * oferta.split("$")[1])}`,
        });

        xhr.open("POST", "http://localhost:9000/api/car" ,true);
        xhr.onreadystatechange = function () {
            if(this.readyState === 4 && this.status === 200){
                alert("Producto agregado al carrito");
            } 
        }
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(data);
    }

    const cantidad = document.createElement('input');
    cantidad.className = "mb-2 cantidad-selector"
    cantidad.type = "number";
    cantidad.id = id;
    cantidad.step = "0";
    cantidad.min = "0";
    cantidad.value = 0;
    cantidad.onchange = (event) => {
        var data = event.target.value;
        if(data > 0) btnCarrito.disabled = false;
        else btnCarrito.disabled = true;
    }

   

    //Agregamos todo al div contenedor de informacion
    div.appendChild(imgs);
    div.appendChild(pNombre);
    div.appendChild(pPrecio);
    div.appendChild(pOferta);
    div.appendChild(pOpciones);
    div.appendChild(cantidad);
    div.appendChild(btnCarrito);
}

const  generateRandomIdentificador = (num) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1= '';
    const charactersLength = characters.length;
    for ( let i = 0; i < num; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result1;
}

