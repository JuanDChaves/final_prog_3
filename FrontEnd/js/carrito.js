document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ticketBtn").addEventListener("click", goToTicket);
    document.getElementById("goBackBtn").addEventListener("click", goBack);
    document.getElementById("goToIndexBtn").addEventListener("click", goToIndex);
    document.getElementById("adminLoginBtn").addEventListener("click", goToLogin);
    //localStorage.clear(); // Limpiamos el local storage de cualquier interaccion anterior
});

function goToTicket(e) {
  e.preventDefault();
  console.log("go to ticket")
  window.location.href = "ticket.html"
}

function goBack(e) {
  e.preventDefault();
  console.log("go to product")
  window.location.href = "productos.html"
}

function goToLogin(e) {
  e.preventDefault();
  window.location.href = "login.html";
}

function goToIndex(e) {
  e.preventDefault();
  window.location.href = "index.html";
}