document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ticketBtn").addEventListener("click", goToTicket);
    document.getElementById("goBackBtn").addEventListener("click", goToBack);
    localStorage.clear(); // Limpiamos el local storage de cualquier interaccion anterior
});

function goToTicket(e) {
  console.log("go to ticket")
  window.location.href = "ticket.html"
}

function goToBack(e) {
  console.log("go to product")
  window.location.href = "productos.html"
}