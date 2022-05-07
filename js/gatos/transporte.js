fetch("http://localhost:9000/api/products/gato/transporte")
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
                data[i].opciones,
                data[i].identificador);
        }
    }
);

function crearMiniatura(div, img, nombre, precio, opciones, id) {
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

    var pOpciones = document.createElement('p');
    pOpciones.className = "opc-producto";
    pOpciones.innerHTML = `<b>Opciones: </b> <span>${opciones}</span>`;

    const btnCarrito = document.createElement('button');
    btnCarrito.className = "btn btn-success";
    btnCarrito.innerHTML = '<i class="fa fa-cart-plus" aria-hidden="true"></i> Agregar al carrito';
    btnCarrito.onclick = () => {
        const xhr = new XMLHttpRequest();
        let data = null;
        if(localStorage.getItem("id")){
            data = JSON.stringify({
                identificador: generateRandomIdentificador(5),
                id_cliente: localStorage.getItem("id"),
                id_producto: id,
                cantidad: document.getElementById(id).value,
                precio: `${(document.getElementById(id).value * precio.split("$")[1])}`,
            });
        } else {
            data = JSON.stringify({
                identificador: generateRandomIdentificador(5),
                id_cliente: localStorage.getItem("id_invitado"),
                id_producto: id,
                cantidad: document.getElementById(id).value,
                precio: `${(document.getElementById(id).value * precio.split("$")[1])}`,
            });
        }
        
        xhr.open("POST", "http://localhost:9000/api/car" ,true);
        xhr.onreadystatechange = function () {
            if(this.readyState === 4 && this.status === 200){
                alert("Producto agregado al carrito");
                document.getElementById(id).selectedIndex = 0;
                btnCarrito.disabled = true;
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

    div.appendChild(imgs);
    div.appendChild(pNombre);
    div.appendChild(pPrecio);
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