//Variables Globales
var estatus = 0;
var token = document.cookie;

//Comprobacion de Token (Sesion)
if(token.split('=')[0] === 'token'){
    location.href = 'personal.html';
} 

//Botones de cabecera
///// INICIAR SESION /////
document.getElementById("iniciar").onclick = () => {
    status = 0;
    if(status == 0){
        document.getElementById("dCrear").classList.add("gost");
        document.getElementById("dIniciar").classList.remove("gost");

        document.getElementById("crear").classList.add("unselect");
        document.getElementById("iniciar").classList.remove("unselect");
    }
}

///// CREAR CUENTA /////
document.getElementById("crear").onclick = () => {
    status = 1;
    if(status == 1){
        document.getElementById("dIniciar").classList.add("gost");
        document.getElementById("dCrear").classList.remove("gost");

        document.getElementById("iniciar").classList.add("unselect");
        document.getElementById("crear").classList.remove("unselect");
    }
}

//Boton para iniciar sesion
document.getElementById("initS").onclick = () => {
    var email = document.getElementById("email").value;
    var pass = document.getElementById("pass").value;
    if(email !== '' && pass !== ''){
        var userData = JSON.stringify({
            email: email,
            password: pass
        });

        const xhr = new XMLHttpRequest();

        xhr.open("POST", "http://localhost:9000/api/users/login", true);
        xhr.onreadystatechange = function (){
            if(this.readyState === 4 && this.status === 200){
                const token = JSON.parse(this.response);
                document.cookie = `token=${token.token}`;
                location.reload();
            } else {

                document.getElementById("message").className = "messageView"; 

                const action = JSON.parse(this.response);
                if(action.passError)
                    document.getElementById("error").innerText = "Contraseña Incorrecta";
                else document.getElementById("error").innerText = "El usuario es incorrecto o no existe";
            }
        };
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.send(userData);        
    } else alert("Todos los campos son requeridos");

    // document.cookie = `token= ${Math.random().toString(36).substr(2)}`;
}

// Arreglo para guardar a las mascotas
var mascotas = [];

///// CHECKBOX PERRO /////
var cbPerro = document.getElementById("perro");
cbPerro.addEventListener("change", () => {
    if(cbPerro.checked)
        mascotas.push({'mascota': 'perro'});
    else 
        mascotas = mascotas.filter((masc) => {
            return masc.mascota !== 'perro';
        });

    console.log(mascotas);
}, false);

///// CHECKBOX GATO /////
var cbGato = document.getElementById("gato");
cbGato.addEventListener("change", () => {
    if(cbGato.checked)
        mascotas.push({'mascota': 'gato'});
    else mascotas = mascotas.filter((masc) => {
        return masc.mascota !== 'gato';
    });

    console.log(mascotas);
}, false);

///// CHECKBOX ROEDOR /////
var cbRoedor = document.getElementById("roedor");
cbRoedor.addEventListener("change", () => {
    if(cbRoedor.checked)
        mascotas.push({'mascota': 'roedor'});
    else mascotas = mascotas.filter((masc) => {
        return masc.mascota !== 'roedor';
    });

    console.log(mascotas);
}, false);

//Boton para crear usuario
document.getElementById("regist").onclick = () => {
    var nombre = document.getElementById("nombreR").value;
    var email = document.getElementById("emailR").value
    var pass = document.getElementById("passR").value;
    if(nombre !== '' && email !== '' && pass !== '' && mascotas.length > 0){
        if(pass === document.getElementById("passRR").value) {
        
            console.log("Pass correct");
            const xhr = new XMLHttpRequest();
    
            var  data = JSON.stringify({
                identificador: generateRandomString(10),
                typeUser: "client",
                userName: nombre,
                password: pass,
                email: email,
                mascota: mascotas
            })
    
            xhr.open("POST", "http://localhost:9000/api/users", true);
            xhr.onreadystatechange = function (){
                if(this.readyState === 4 && this.status === 200){
                    alert("Usuario creado correctamente");
                    location.reload();
                }
            };
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.send(data);
            console.log(data);
        }
        else alert("Las contraseñas no coinciden");
    } else alert("Todos los campos son requeridos");
}

//Fucion para crear el identificador de usuario aleatorio (N caracteres)
const  generateRandomString = (num) => {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1= '';
    const charactersLength = characters.length;
    for ( let i = 0; i < num; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result1;
}

