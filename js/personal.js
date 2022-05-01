if(localStorage.getItem("Authorization") === null) location.href = 'logout.html';

const xhr = new XMLHttpRequest();

xhr.open("GET", "http://localhost:9000/api/users/personal");
xhr.onreadystatechange = function (){
    if(this.readyState === 4 && this.status === 200){
        const data = JSON.parse(this.response);
        document.getElementById("personal").innerText = data.userName;
        localStorage.setItem("userName", data.userName);
    }
}
xhr.setRequestHeader("Authorization", localStorage.getItem("Authorization"));
xhr.send();