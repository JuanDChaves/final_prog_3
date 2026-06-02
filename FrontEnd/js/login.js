import api from './app.js';

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginBtn").addEventListener("click", login);
    document.getElementById("goToIndexBtn").addEventListener("click", goToIndex);
    document.getElementById("autoCompleteBtn").addEventListener("click", autoComplete);
    //localStorage.clear(); // Limpiamos el local storage de cualquier interaccion anterior
});

let username = "";
let password = ""

async function login(e) {
  e.preventDefault();
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;
  try {
    const response = await api.login(username, password);
    console.log(response.data)
    window.location.href = "dashboard.html"
    username = "";
    password = "";
  } catch(e) {
    console.log("ERRORCITO", e.response?.data)
  }
  console.log("login")
}
function goToIndex(e) {
  e.preventDefault();
  console.log("go to index")
  window.location.href = "index.html"
}

function autoComplete(e) {
  e.preventDefault();
  document.getElementById("username").value = "juan";
  document.getElementById("password").value = "mypass";
}

//{
//  "username": "juan",
//  "email": "juan@mail.com",
//  "password": "mypass"
//}