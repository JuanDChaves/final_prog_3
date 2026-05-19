document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("productosBtn").addEventListener("click", goToProductos);
    document.getElementById("indexBtn").addEventListener("click", goToIndex);
    localStorage.clear(); // Limpiamos el local storage de cualquier interaccion anterior
});

function goToProductos(e) {
  e.preventDefault();
  console.log("to to productos")
  window.location.href = "productos.html"
}
function goToIndex(e) {
  e.preventDefault();
  console.log("go to index")
  window.location.href = "index.html"
}