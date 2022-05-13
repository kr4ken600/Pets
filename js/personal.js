if(localStorage.getItem("Authorization") === null) location.href = 'logout.html';

if(localStorage.getItem("sesion") === null){
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "http://localhost:9000/api/users/personal");
    xhr.onreadystatechange = function (){
        if(this.readyState === 4 && this.status === 200){
            const data = JSON.parse(this.response);
            document.getElementById("personal").innerText = data.userName;
            localStorage.setItem("id", data.identificador);
            localStorage.setItem("typeUser", data.typeUser);
            localStorage.setItem("userName", data.userName);

            var mascotas = [];
            data.mascota.forEach(elemento => {
                mascotas.push(elemento.mascota);
            });
            localStorage.setItem("mascota", mascotas);
            localStorage.setItem("email", data.email);
            
            fetch(`http://localhost:9000/api/car/${localStorage.getItem('id_invitado')}`)
                .then(response => {
                    return response.json();
                })
                .then((data) => {
                    data.forEach(element => {
                        const xh = new XMLHttpRequest();
                        const update = JSON.stringify({
                            id_cliente: localStorage.getItem('id')
                        });
                        xh.open('POST', `http://localhost:9000/api/car/update/${element.identificador}`);
                        xh.onreadystatechange = function() {
                            if(this.readyState === 4 && this.status === 200){
                                const car = JSON.parse(this.response);
                                console.log(car);
                            }
                        }
                        xh.setRequestHeader("Content-type", "application/json");
                        xh.send(update);
                    });
                })
            
            localStorage.removeItem("id_invitado");
            localStorage.setItem("sesion", true);
            setData();
        }
    }
    xhr.setRequestHeader("Authorization", localStorage.getItem("Authorization"));
    xhr.send();
} else setData();

function setData() {
    const email = document.getElementById("email");
    email.value = localStorage.getItem("email");
    email.disabled = true;

    const userName = document.getElementById("userName");
    userName.value = localStorage.getItem("userName");
    userName.disabled = true;

    const mascota = document.getElementById("mascota");
    var addMascota = localStorage.getItem("mascota");
    addMascota = addMascota.replace(",", " - ").replace(",", " - ");
    mascota.value = addMascota;
    mascota.disabled = true;
}

const datosPR = document.getElementById("datosPR");
const direcciones = document.getElementById("direccionesR");

document.getElementById("datosP").onclick = () => {
    direcciones.classList.add("ghost");
    datosPR.classList.remove("ghost");
}

document.getElementById("direcciones").onclick = () => {
    limipiarDiv();
    datosPR.classList.add("ghost");
    direcciones.classList.remove("ghost");

    const xhr = new XMLHttpRequest();

    xhr.open("GET", `http://localhost:9000/api/address/${localStorage.getItem("id")}`);
    xhr.onreadystatechange = function (){
        if(this.readyState === 4 && this.status === 200){
            const data = JSON.parse(this.response);
            
            if(data.length > 0){
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    getAddress(
                        index + 1,
                        element.ciudad,
                        element.colonia,
                        element.calle,
                        element.codigoPostal,
                        element.telefono,
                        element.identificador
                    );
                }
                const direccionesCard = document.getElementById("direccionesCard");
                const btn = createBtnAddAddress("Puedes agregar mas direcciones");
                direccionesCard.appendChild(btn);
            } else setAddress();
        }
    }
    xhr.send();
}

function getAddress(length, ciudad, colonia, calle, codPostal, numero, id) {
    const direccionesCard = document.getElementById("direccionesCard");

    const contenedorCard = document.createElement('div');
    contenedorCard.className = "col-4 mb-3";

    const card = document.createElement('div');
    card.className = "card";
    card.id = id;

    const cardBody = document.createElement('div');
    cardBody.classList = "card-body";

    const h5 = document.createElement('h5');
    h5.classList = "card-title";
    h5.innerText = `Direccion ${length}`;

    const h6 = document.createElement('h6');
    h6.classList = "card-subtitle mb-2 text-muted-address";
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

    const btnDelete = document.createElement('button');
    btnDelete.className = "btn btn-danger";
    btnDelete.innerText = "Eliminar Dirección";
    btnDelete.onclick = () => {
        const xhr = new XMLHttpRequest();

        xhr.open("DELETE", `http://localhost:9000/api/address/${id}`, true);
        xhr.onreadystatechange = function (){
            if(this.readyState === 4 && this.status === 200){
                alert("La direccion fue eliminada satisfactoriamente");
                location.reload();
            }
        }   
        xhr.send();
    }

    cardBody.appendChild(h5);
    cardBody.appendChild(h6);
    cardBody.appendChild(p1);
    cardBody.appendChild(p2);
    cardBody.appendChild(p3);
    cardBody.appendChild(p4);

    cardFooter.appendChild(btnDelete);

    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    contenedorCard.appendChild(card);
    
    direccionesCard.appendChild(contenedorCard);
}

function setAddress() {
    const dir = document.getElementById("direccionesCard");

    const btn = createBtnAddAddress("No se encontraron direcciones");
    dir.appendChild(btn);
}

function createBtnAddAddress(message) {
    const divPunteado = document.createElement('div');
    divPunteado.className = "col-4 mb-3";

    const card = document.createElement('div');
    card.className = "card";

    const cardBody = document.createElement('div');
    cardBody.classList = "card-body  border-punteado text-center";

    const h6Message = document.createElement('h6');
    h6Message.className = "mb-3"
    h6Message.innerText = message;

    const btnAddress = document.createElement('button');
    btnAddress.className = "btn btn-primary";
    btnAddress.innerHTML = '<i class="fa fa-plus" aria-hidden="true"></i> Agregar direccion';
    btnAddress.setAttribute("data-bs-toggle", "modal");
    btnAddress.setAttribute("data-bs-target", "#modalAddress");

    card.appendChild(cardBody);

    cardBody.appendChild(h6Message);
    cardBody.appendChild(btnAddress);

    divPunteado.appendChild(cardBody);

    return divPunteado;
}

function limipiarDiv() {
    const dir = document.getElementById("direccionesCard");
    dir.innerHTML = "";
    dir.innerHTML = '<h4 class="title mb-5">Direcciones</h4>';
}

document.getElementById("cerrarSesion").onclick = () => {
    localStorage.clear();

    const fpPromise = import('https://openfpcdn.io/fingerprintjs/v3')
        .then(FingerprintJS => FingerprintJS.load());

    fpPromise
        .then(fp => fp.get())
        .then(result => {
            const visitorId = result.visitorId
            console.log(visitorId);
            localStorage.setItem("id_invitado", visitorId.substring(0,10));
            location.reload();
        });
}

document.getElementById("addDirecctionBtn").onclick = () => {
    const ciudad = document.getElementById("recipient-ciudad").value;
    const colonia = document.getElementById("recipient-colonia").value;
    const calle = document.getElementById("recipient-calle").value;
    const codPostal = document.getElementById("recipient-codPostal").value;
    const numExterior = document.getElementById("recipient-numExterior").value;
    const numTelefono = document.getElementById("recipient-numTelefono").value;

    if(ciudad !== '' || colonia !== '' || calle !== '' || codPostal !== '' || numExterior !== '' || numTelefono !== ''){
        var addressData = JSON.stringify({
            identificador: generateRandomIdentificador(5),
            id_cliente: localStorage.getItem("id"),
            codigoPostal: codPostal,
            calle: calle,
            numeroExterior: numExterior,
            colonia: colonia,
            ciudad: ciudad,
            telefono: numTelefono
        });
        const xhr = new XMLHttpRequest();

        xhr.open("POST", 'http://localhost:9000/api/address', true);
        xhr.onreadystatechange = function (){
            if(this.readyState === 4 && this.status === 200){
                console.log(JSON.parse(this.response));
                alert("Direccion agregada correctamente");
                location.reload();
            }
        };
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(addressData);
    } else document.getElementById("messageError").classList.add("messageView");
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