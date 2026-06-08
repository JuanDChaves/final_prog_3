import api from './app.js';

const html = document.documentElement;
let products = [];

document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("surveyBtn").addEventListener("click", goToSurvey);
    document.getElementById("goBackBtn").addEventListener("click", goBack);
    document.getElementById("goToIndexBtn").addEventListener("click", goToIndex);
    document.getElementById("adminLoginBtn").addEventListener("click", goToLogin);
    document.getElementById("themeToggle").addEventListener("click", toggleTheme)

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme)

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    if (cart.length > 0) {
      const response = await api.getProducts();
      products = response.data;
    }

    renderTicket(cart);
  });

function renderTicket(cart) {
  const nombre = localStorage.getItem('nombre') || 'Invitado';
  document.getElementById('ticketCustomer').textContent = nombre;

  const now = new Date();
  document.getElementById('ticketDate').textContent = now.toLocaleDateString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  let total = 0;
  const tbody = document.getElementById('ticketItems');

  if (cart.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center text-muted">No hay productos en el carrito</td></tr>`;
    return;
  }

  tbody.innerHTML = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return '';
    const subtotal = product.price * item.quantity;
    total += subtotal;
    return `
      <tr>
        <td>${product.name}</td>
        <td class="text-center">${item.quantity}</td>
        <td class="text-end">$${product.price.toFixed(2)}</td>
        <td class="text-end">$${subtotal.toFixed(2)}</td>
      </tr>`;
  }).join('');

  document.getElementById('ticketTotal').textContent = `$${total.toFixed(2)}`;
}

function goBack(e) {
  e.preventDefault();
  console.log("go to cart")
  window.location.href = "carrito.html"
}

function goToSurvey(e) {
  e.preventDefault();
  console.log("go to survey")
  window.location.href = "encuesta.html"
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