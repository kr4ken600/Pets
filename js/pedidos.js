//Variable global para calcular el total de productos
var totalProducto = 0;

//Funcion para leer la informacion del archivo JSON
fetch("../utils/productoCompra.json")
    .then(response => {
        return response.json();
    })
    .then((data) => {
        for(var i = 0; i <= data.length - 1; i++){
            var clas = false;
            if(i !== data.length-1 ){
                clas = true;
            }
            añadirProducto(clas, data[i].imgn, data[i].marca, data[i].nombre, data[i].peso, data[i].precio);
            totalProducto += Math.floor(data[i].precio);
        }
        totales();
    })


//Funcion para crear los productos agregados al carrito
function añadirProducto(clas, imgn, marca, nombre, peso, precio){
    //Obtenemos el div contenedor
    var div = document.getElementById("pedidos");

    //Creamos una fila contenedora de la informacion
    var prod = document.createElement("div");
    clas == true ? prod.className = "row align-items-center linear" : prod.className = "row align-items-center";

    div.appendChild(prod);

    //Creamos una columna para la imagen
    var colimg = document.createElement("div");
    colimg.className = "col ps-5 pe-5 pt-3 pb-3";

    //Creamos una columna para los datos
    var coldatos = document.createElement("div");
    coldatos.className = "col ps-5 pe-5 pt-3 pb-3";

    //Creamos una columna para el precio
    var colprecio = document.createElement("div");
    colprecio.className = "col-2 ps-5 pe-5 pt-3 pb-3";

    //Agregamos las columnas a la fila contenedora
    prod.appendChild(colimg);
    prod.appendChild(coldatos);
    prod.appendChild(colprecio);

    //Creamos el icono de x 
    var span = document.createElement("span");
    span.className = "me-3"
    span.innerHTML = '<i class="fa fa-times question" aria-hidden="true"></i>';

    //Creamos la imagen
    var img = document.createElement("img");
    img.src = imgn;
    img.style.width = "100px"
    img.className = "me-3"

    //Agregamos la x y la imagen a su columna
    colimg.appendChild(span);
    colimg.appendChild(img);

    //Creamos el nombre de la marca
    var h6Marca = document.createElement("h6");
    h6Marca.className = "question";
    h6Marca.innerText = marca;

    //Creamos el nombre del producto
    var h6Nombre = document.createElement("h6");
    h6Nombre.innerText = nombre;

    //Creamos la informacion adicional
    var pPeso = document.createElement("p");
    pPeso.className = "question";
    pPeso.innerHTML = `${peso.split("-")[0]} <b>${peso.split("-")[1]}</b>`;

    //Agregamos esa informacion a su columna
    coldatos.appendChild(h6Marca);
    coldatos.appendChild(h6Nombre);
    coldatos.appendChild(pPeso);

    //Creamos el precio
    var h4 = document.createElement("h4");
    h4.innerText = `\$${precio}`;

    //Agregamos el precio a su columna
    colprecio.appendChild(h4);
}

//Funcion para calcular los totales 
function totales(){
    var precio = document.getElementById("precio");
    precio.innerText = `\$${totalProducto}`;

    var totalPago = document.getElementById("totalPago");
    totalPago.innerText = `\$${totalProducto}`;
}

//Funcion para manipular los eventos del selector
const selector = document.querySelector("#comboBX");
selector.addEventListener('change', (event) => {
    const result = event.target.value;
    var totalResult = Math.floor(result) + totalProducto;
    var totalPago = document.getElementById("totalPago");
    totalPago.innerText = `\$${totalResult}`;
})

//Funcion para los eventos del boton
const btnPagar = document.getElementById("btnPagar");
btnPagar.onclick = () => {
    location.href = "pagar.html"
}