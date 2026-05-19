document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("surveyBtn").addEventListener("click", goToSurvey);
    document.getElementById("cartBtn").addEventListener("click", goToCart);
    document.getElementById("goToIndexBtn").addEventListener("click", goToIndex);
    localStorage.clear(); // Limpiamos el local storage de cualquier interaccion anterior
});

function goToCart(e) {
  e.preventDefault();
  console.log("go to cart")
  window.location.href = "carrito.html"
}
function goToSurvey(e) {
  e.preventDefault();
  console.log("go to survey")
  window.location.href = "encuesta.html"
}

function goToIndex(e) {
  e.preventDefault();
  console.log("go to index")
  window.location.href = "index.html"
}