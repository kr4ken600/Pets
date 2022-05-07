//Variable global para calcular el total de productos
var totalProducto = 0;
var id = localStorage.getItem("id") ? localStorage.getItem("id") : localStorage.getItem("id_invitado");

//Funcion para leer la informacion del archivo JSON
fetch(`http://localhost:9000/api/car/${id}`)
    .then(response => {
        return response.json();
    })
    .then((data) => {
        if(data.length > 0){
            data.forEach(element => {
                fetch(`http://localhost:9000/api/products/${element.id_producto}`)
                    .then(response => {
                        return response.json();
                    })
                    .then(producto => {
                        añadirProducto(
                            false, 
                            producto.imagen, 
                            producto.nombre.split(" - ")[0], 
                            producto.nombre.split(" - ")[1], 
                            producto.opciones, 
                            element.cantidad,
                            producto.oferta !== "" ? producto.oferta.split("$")[1] : producto.precio.split("$")[1],
                            element.precio,
                            element.identificador);
                    }).catch((error) => console.error(error));
                totalProducto += Math.floor(element.precio);
                totales();
            });
        } else sinProducto();
    }).catch((error) => console.error(error));


//Funcion para crear los productos agregados al carrito
function añadirProducto(clas, imgn, marca, nombre, peso, cantidad, precioUnidad, total, identificador){
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
    span.onclick= () => {
        const xhr = new XMLHttpRequest();

        xhr.open('DELETE', `http://localhost:9000/api/car/${identificador}`);
        xhr.onreadystatechange = function (){
            if(this.readyState === 4 && this.status === 200){
                const data = JSON.parse(this.response);
                if(data.deletedCount > 0 ){
                    alert("Producto retirado del carrito");
                    location.reload();
                }
            }
        }
        xhr.send();
    }

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
    var pPeso = document.createElement("h6");
    pPeso.className = "question";
    pPeso.innerHTML = `${peso.indexOf("kg") ? "Peso: " : peso.split(" - ")[0]} <b>${peso.split("-")[1]}</b>`;

    var pUnidad = document.createElement("h6");
    pUnidad.className = "question";
    pUnidad.innerHTML = `Precio x unidad: <b>\$${precioUnidad}</b>`

    var pCantidad = document.createElement('h6');
    pCantidad.className = "question";
    pCantidad.innerHTML = `Cantidad: <b>${cantidad} pz</b>`

    //Agregamos esa informacion a su columna
    coldatos.appendChild(h6Marca);
    coldatos.appendChild(h6Nombre);
    coldatos.appendChild(pPeso);
    coldatos.appendChild(pUnidad);
    coldatos.appendChild(pCantidad);

    //Creamos el precio
    var h4 = document.createElement("h4");
    total = total.split(".")[1].length > 2 
        ? total.substring(0, total.indexOf(".") + 3) 
        : total;
    h4.innerText = `\$${total}`;

    //Agregamos el precio a su columna
    colprecio.appendChild(h4);
}

//Funcion en caso de no tener carrito
function sinProducto() {
    //Obtenemos el div contenedor
    var div = document.getElementById("pedidos");

    const divRow = document.createElement('div');
    divRow.className = "row align-items-center";

    const divCol = document.createElement('div');
    divCol.className = "col ps-5 pe-5 pt-3 pb-3"

    const h4 = document.createElement('h4');
    h4.innerText = "No tienes carrito.";
    h4.className = "title";

    divCol.appendChild(h4);
    divRow.appendChild(divCol);
    div.appendChild(divRow);

    document.getElementById("btnPagar").disabled = true;
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