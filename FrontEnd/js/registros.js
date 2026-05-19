document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("dashboardBtn").addEventListener("click", goToDashboard);
    document.getElementById("indexBtn").addEventListener("click", goToIndex);
    localStorage.clear(); // Limpiamos el local storage de cualquier interaccion anterior
});

function goToDashboard(e) {
  e.preventDefault();
  console.log("to to dashboard")
  window.location.href = "dashboard.html"
}
function goToIndex(e) {
  e.preventDefault();
  console.log("go to index")
  window.location.href = "index.html"
}