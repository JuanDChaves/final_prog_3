import api from './app.js';

const html = document.documentElement;

document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("goBackBtn").addEventListener("click", goBack);
    document.getElementById("goToIndexBtn").addEventListener("click", goToIndex);
    document.getElementById("adminLoginBtn").addEventListener("click", goToLogin);
    document.getElementById("themeToggle").addEventListener("click", toggleTheme);

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme)

    const id = localStorage.getItem('selectedProductId');

    if(!id) {
      window.location.href = 'productos.html';
      return;
    }

    const data = await api.getProduct(id)
    console.log(data.data)
  });

function goBack(e) {
  e.preventDefault();
  console.log("to to productos")
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

function toggleTheme() {
  const current = html.getAttribute('data-bs-theme');
  applyTheme(current === 'light' ? 'dark' : 'light');
}

function applyTheme(theme) { 
  html.setAttribute('data-bs-theme', theme);
  localStorage.setItem('theme', theme);
  document.getElementById('themeToggle').textContent = theme === 'light' ? '🌙' : '☀️';
}