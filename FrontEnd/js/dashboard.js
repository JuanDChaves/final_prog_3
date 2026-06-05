const html = document.documentElement;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("recordsBtn").addEventListener("click", goToRecords);
    document.getElementById("addProductBtn").addEventListener("click", goToAddProduct);
    document.getElementById("assistanceBtn").addEventListener("click", goToAssistance);
    document.getElementById("indexBtn").addEventListener("click", goToIndex);
    document.getElementById("themeToggle").addEventListener("click", toggleTheme)
    //localStorage.clear(); // Limpiamos el local storage de cualquier interaccion anterior

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme)
});

function goToRecords(e) {
  e.preventDefault();
  console.log("to to records")
  window.location.href = "registros.html"
}

function goToAddProduct(e) {
  e.preventDefault();
  console.log("to to product")
  window.location.href = "alta.html"
}

function goToAssistance(e) {
  e.preventDefault();
  console.log("to to assistance")
  window.location.href = "asistencia.html"
}
function goToIndex(e) {
  e.preventDefault();
  console.log("go to index")
  window.location.href = "index.html"
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