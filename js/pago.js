//Variables globales total en productos y pago final
var totalProducto = 0;
var pgFinal = 0;
var productoTotal = 0;

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
            productoTotal ++;
        }
        totales();
    })

//Funcion para crear la lista de productos
function añadirProducto(clas, imgn, marca, nombre, peso, precio){
    //Obtenemos el div contenedor
    var div = document.getElementById("cont-productos");

    //Creamos una fila contenedora de la informacion
    var prod = document.createElement("div");
    clas == true ? prod.className = "row align-items-center" : prod.className = "row align-items-center";

    div.appendChild(prod);

    //Creamos una columna para la imagen
    var colimg = document.createElement("div");
    colimg.className = "col-3";
    
    //Creamos una columna para los datos
    var coldatos = document.createElement("div");
    coldatos.className = "col-7";

    //Creamos una columna para el precio
    var colprecio = document.createElement("div");
    colprecio.className = "col-2";

    //Agregamos las columnas a la fila contenedora
    prod.appendChild(colimg);
    prod.appendChild(coldatos);
    prod.appendChild(colprecio);

    //Creamos la imagen
    var img = document.createElement("img");
    img.src = imgn;
    img.style.width = "80px"
    img.className = "me-3"

    //Agregamos la imagen a su columna
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
    var h6 = document.createElement("h6");
    h6.innerText = `\$${precio}`;
    h6.style.fontWeight = "bold";

    //Agregamos el precio a su columna
    colprecio.appendChild(h6);
}

//Controlamos el evento del checkbox
var check = document.getElementById("cbox");
check.addEventListener('change', validate, false);

//Funcion para validar el estado del checkbox
function validate() {
    var totalPago = document.getElementById("pagoFinal");
    var seguro = document.getElementById("seguro");
    var checked = check.checked;
    if(checked){
        seguro.innerText = "$67.00"
        totalPago.innerText = `\$${pgFinal + 67}.00`;
    } else {
        seguro.innerText = "$00.00"
        totalPago.innerText = `\$${pgFinal}.00`;
    }
}

//Funcion para calcular los totales 
function totales(){
    var precio = document.getElementById("precio");
    precio.innerText = `\$${totalProducto}`;

    var envio = Math.floor(document.getElementById("envio").innerHTML.split("$")[1]);
    var seguro = Math.floor(document.getElementById("seguro").innerHTML.split("$")[1]);
    
    pgFinal = totalProducto + envio + seguro;

    var totalPago = document.getElementById("pagoFinal");
    totalPago.innerText = `\$${pgFinal}.00`;

    var productos = document.getElementById("prodc-total");
    productos.innerText = `${productoTotal} productos`
}