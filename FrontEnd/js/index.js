
const html = document.documentElement;
const divErrorMessage = document.createElement("div");

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ingresarBtn").addEventListener("click", ingresar);
    document.getElementById("adminLoginBtn").addEventListener("click", goToAdminLogin);
    document.getElementById("themeToggle").addEventListener("click", toggleTheme)
    localStorage.clear();

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
});

function ingresar (e) {
    e.preventDefault();
    if(!ValidarInput()) return;
    const input = document.getElementById("username");
    try{
        localStorage.setItem("nombre", input.value.trim());
        input.value = "";
        window.location.href = "productos.html";
    } catch(error){
        console.log("show modal");
        alert("Error...")
    }
}

function ValidarInput(){
    const input = document.getElementById('username');
    const nombre = input.value.trim();

    input.classList.remove("is-invalid");
    divErrorMessage.textContent = "";

    if (!nombre){
        input.classList.add("is-invalid");
        divErrorMessage.className = "invalid-feedback";
        divErrorMessage.textContent = "Para continuar debes cargar tu nombre";
        input.insertAdjacentElement("afterend", divErrorMessage);
        return false;
    }
    if (nombre.length < 3 || nombre.length > 20) {
        input.classList.add("is-invalid");
        divErrorMessage.className = "invalid-feedback";
        divErrorMessage.textContent = "El nombre debe tener entre 3 y 20 caracteres";
        input.insertAdjacentElement("afterend", divErrorMessage);
        return false;
    }
    if (/\d/.test(nombre)){
        // /\d/.test - para validar que no contenga numeros
        input.classList.add("is-invalid");
        divErrorMessage.className = "invalid-feedback";
        divErrorMessage.textContent = "El nombre no debe contener números";
        input.insertAdjacentElement("afterend", divErrorMessage);
        return false;
    }
    return true;
}

function goToAdminLogin (e) {
    window.location.href = "login.html";
}

function toggleTheme() {
  const current = html.getAttribute('data-bs-theme');
  applyTheme(current === 'light' ? 'dark' : 'light');
}

function applyTheme(theme) { 
  html.setAttribute('data-bs-theme', theme);
  localStorage.setItem('theme', theme);
  document.getElementById('themeToggle').textContent = theme === 'light' ? '🌙' : '☀️';
}