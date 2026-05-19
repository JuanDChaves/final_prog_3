document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("ticketBtn").addEventListener("click", goToTicket);
    document.getElementById("goToIndexBtn").addEventListener("click", goToIndex);
    localStorage.clear(); // Limpiamos el local storage de cualquier interaccion anterior
});

function goToTicket(e) {
  e.preventDefault();
  console.log("go to ticket")
  window.location.href = "ticket.html"
}
function goToIndex(e) {
  e.preventDefault();
  console.log("go to index")
  window.location.href = "index.html"
}