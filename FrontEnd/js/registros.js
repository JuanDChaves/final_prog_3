document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("goBackBtn").addEventListener("click", goBack);
    document.getElementById("goToIndexBtn").addEventListener("click", goToIndex);
    localStorage.clear(); // Limpiamos el local storage de cualquier interaccion anterior
});

function goBack(e) {
  e.preventDefault();
  console.log("to to dashboard")
  window.location.href = "dashboard.html"
}
function goToIndex(e) {
  e.preventDefault();
  console.log("go to index")
  window.location.href = "index.html"
}