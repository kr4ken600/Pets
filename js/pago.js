//Variables globales total en productos y pago final
var totalProducto = 0;
var pgFinal = 0;
var productoTotal = 0;
var addressSelect = '';
var addresStatus = false;
const user = localStorage.getItem("id");
let id = null;
if(!user)
    id = localStorage.getItem("id_invitado");
else{
    id = user;
    document.getElementById("noSesion").classList.add("ghost");
    document.getElementById("sesion").classList.remove("ghost");


    getAddress();
}

//Funcion para leer la informacion del archivo JSON
fetch(`http://localhost:9000/api/car/${id}`)
    .then(response => {
        return response.json();
    })
    .then((data) => {
        data.forEach(element => {
            xhr = new XMLHttpRequest();
            xhr.open("GET", `http://localhost:9000/api/products/${element.id_producto}`);
            xhr.onreadystatechange = function() {
                if(this.readyState === 4 && this.status === 200){
                    const product = JSON.parse(this.response);
                    añadirProducto(
                        false,
                        product.imagen,
                        product.nombre.split("-")[0],
                        product.nombre.split("-")[1],
                        product.opciones, 
                        element.cantidad,
                        product.oferta !== "" ? product.oferta.split("$")[1] : product.precio.split("$")[1],
                        element.precio
                    );
                }
            }
            xhr.send();
            totalProducto += Math.floor(element.precio);
                    productoTotal ++;
        });
        totales();
    })

//Funcion para crear la lista de productos
function añadirProducto(clas, imgn, marca, nombre, peso, cantidad, precioUnidad, total){
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
    coldatos.className = "col-7 mb-3";

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
    var h6 = document.createElement("h6");
    total = total.split(".")[1].length > 2 
        ? total.substring(0, total.indexOf(".") + 3) 
        : total;
    h6.innerText = `\$${total}`;
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

let status = 0;

const btnInvitado = document.getElementById("invitado");
const btnCuenta = document.getElementById("cuenta");

document.getElementById("invitado").onclick = () => {
    status = 0;
    if(status === 0){
        document.getElementById("dInvitado").classList.remove("ghost");
        btnInvitado.classList.remove("unselect");

        document.getElementById("dCuenta").classList.add("ghost");
        btnCuenta.classList.add("unselect");        
    }
}

btnCuenta.onclick = () => {
    status = 1;
    if(status === 1){
        document.getElementById("dCuenta").classList.remove("ghost");
        btnCuenta.classList.remove("unselect");

        document.getElementById("dInvitado").classList.add("ghost");
        btnInvitado.classList.add("unselect");
    }
}

document.getElementById("dirLogin").onclick = () => {
    location.href = "user/logout.html";
}

function getAddress() {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", `http://localhost:9000/api/address/${localStorage.getItem("id")}`);
    xhr.onreadystatechange = function (){
        if(this.readyState === 4 && this.status === 200){
            const data = JSON.parse(this.response);
            
            if(data.length > 0){
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    address(
                        index + 1,
                        element.ciudad,
                        element.colonia,
                        element.calle,
                        element.codigoPostal,
                        element.telefono,
                        element.identificador
                    );
                }
            }
        }
    }
    xhr.send();
}

function address(length, ciudad, colonia, calle, codPostal, numero, id) {
    const direccionesCard = document.getElementById("sesion");

    const contenedorCard = document.createElement('div');
    contenedorCard.className = "col-4 mb-3 btn";

    const card = document.createElement('div');
    card.className = "card";
    card.id = id;

    const cardBody = document.createElement('div');
    cardBody.classList = "card-body";

    const h5 = document.createElement('h5');
    h5.classList = "card-title";
    h5.innerText = `Direccion ${length}`;

    const h6 = document.createElement('h6');
    h6.classList = "card-subtitle mb-2 text-muted";
    h6.innerText = ciudad;

    const  p1 = document.createElement('p');
    p1.classList = "card-text";
    p1.innerText = `Colonia: ${colonia}`;

    const  p2 = document.createElement('p');
    p2.classList = "card-text";
    p2.innerText = `Calle: ${calle}`;

    const  p3 = document.createElement('p');
    p3.classList = "card-text";
    p3.innerText = `Codigo Postal: ${codPostal}`;

    const  p4 = document.createElement('p');
    p4.classList = "card-text";
    p4.innerText = `Telefono: ${numero}`;

    const cardFooter = document.createElement('div');
    cardFooter.className ="card-footer d-grid gap-2";

    cardBody.appendChild(h5);
    cardBody.appendChild(h6);
    cardBody.appendChild(p1);
    cardBody.appendChild(p2);
    cardBody.appendChild(p3);
    cardBody.appendChild(p4);

    card.appendChild(cardBody);

    contenedorCard.appendChild(card);

    contenedorCard.onclick = () => {
        card.classList.toggle("addres-select");

        if (card.classList.contains("addres-select")) addresStatus = true;
        else addresStatus = false;
    }
    
    direccionesCard.appendChild(contenedorCard);
}

function metodoCheck() {
    const btnPagar = document.getElementById("btnPagar");
    var metodo = document.metodos.metodo.value;
    if(metodo.length === 0) metodo = "nada";
    else btnPagar.disabled = false;
    switch (metodo) {
        case "tarjeta":
            document.getElementById("colTarjeta").classList.remove("ghost");
            document.getElementById("colPaypal").classList.add("ghost");
            document.getElementById("colEfectivo").classList.add("ghost");
            break;
        case "paypal":
            document.getElementById("colPaypal").classList.remove("ghost");
            document.getElementById("colTarjeta").classList.add("ghost");
            document.getElementById("colEfectivo").classList.add("ghost");
            break;
        case "efectivo":
            document.getElementById("colEfectivo").classList.remove("ghost");
            document.getElementById("colTarjeta").classList.add("ghost");
            document.getElementById("colPaypal").classList.add("ghost");
            break
        default:
            break;
    }
}

function efectivoCheck() {
    var efectivo = document.efectivos.efectivo.value;
    if(efectivo.length === 0) efectivo = "nada";
    efectivo !== "nada" ? console.log(efectivo) : null;
}

const btnPagar = document.getElementById("btnPagar");
btnPagar.onclick = () => {
    var metodo = document.metodos.metodo.value;
    switch (metodo) {
        case "tarjeta":
            var inputs = document.forms["tarjetaDatos"].elements["input"];
            var values = [];
            inputs.forEach(element => {
                if (element.value !== '') values.push(element.value);
            });
            if (values.length < 4) alert("Ingresa todos los datos de la tarjeta")
            else addressDatos(addresStatus);
            break;
        case "efectivo":
            var efectivo = document.efectivos.efectivo.value;
            if(efectivo.length === 0) alert("Selecciona el metodo de pago en efectivo");
            else addressDatos(addresStatus);
            break;
        default:
            addressDatos(addresStatus);
            break;
    }
}

function addressDatos(status) {
    if(!status){
        var addressDatos = document.forms["addressDatos"].elements["inputs"];
        var values = [];
        addressDatos.forEach(element => {
            if(element.value !== '') values.push(element.value);
        });
        if(values.length < 9) alert("Ingresa todos los datos de la direccion de invitado");
        else alert("El pedido esta siendo procesado...");
    } else {
        alert("El pedido esta siendo procesado...");
        deleteCarrito();
    }
}

function deleteCarrito() {
    const xhr = new XMLHttpRequest();
    
    xhr.open('DELETE', `http://localhost:9000/api/car/user/${id}`);
        xhr.onreadystatechange = function (){
            if(this.readyState === 4 && this.status === 200){
                const data = JSON.parse(this.response);
                if(data.deletedCount > 0 ){
                    console.log("Procesando Pago");
                    location.href = 'index.html';
                }
            }
        }
    xhr.send();
}