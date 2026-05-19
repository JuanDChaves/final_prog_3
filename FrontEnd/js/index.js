document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ingresarBtn").addEventListener("click", ingresar);
    document.getElementById("adminLoginBtn").addEventListener("click", goToAdminLogin);
    localStorage.clear(); // Limpiamos el local storage de cualquier interaccion anterior
});

function ingresar (e) {
    e.preventDefault();
    const input = document.getElementById("username");
    //if(!ValidarInput()) return;
    try{
        localStorage.setItem("nombre", input.value.trim());
        console.log(input.value.trim())
        input.value = "";
        window.location.href = "productos.html";
    } catch(error){
        alert("Error...")
    }
}

function goToAdminLogin (e) {
    console.log("go to login admin")
    window.location.href = "login.html";
}

function ValidarInput(){
    const input = document.getElementById('userName');
    const nombre = input.value.trim();
    let valid = true;

    if (!nombre){
        input.classList.add("is-invalid");
        divMensajeDeError.className = "invalid-feedback";
        divMensajeDeError.textContent = "Para continuar debe cargar su nombre";
        input.insertAdjacentElement("afterend", divMensajeDeError);
        valid = false;
    }
    if (/\d/.test(nombre)){
        // /\d/.test - para validar que no contenga numeros
        input.classList.add("is-invalid");
        divMensajeDeError.className = "invalid-feedback";
        divMensajeDeError.textContent = "El nombre no debe contener numeros";
        input.insertAdjacentElement("afterend", divMensajeDeError);
        valid = false;
    }
    return valid;
}