import api from './app.js';

const html = document.documentElement;

document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("goBackBtn").addEventListener("click", goBack);
    document.getElementById("goToIndexBtn").addEventListener("click", goToIndex);
    document.getElementById("adminLoginBtn").addEventListener("click", goToLogin);
    document.getElementById("themeToggle").addEventListener("click", toggleTheme);

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme)

    const id = new URLSearchParams(window.location.search).get('id');

    try {
      const response = await api.getProduct(id)
      renderProduct(response.data)
    } catch (error) {
      console.log("Error al cargar el producto", error)
      window.location.href = 'productos.html';
    }
  });

function renderProduct(product) {
  document.getElementById('productDetail').innerHTML = `
    <div class="card shadow-sm border">
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${product.image}" alt="${product.name}" class="img-fluid rounded-start w-100 h-100" style="object-fit: cover; max-height: 400px;">
        </div>
        <div class="col-md-8">
          <div class="card-body p-4 d-flex flex-column h-100">

            <div class="d-flex align-items-center gap-2 mb-1">
              <h2 class="fw-bold mb-0">${product.name}</h2>
            </div>

            <p class="text-muted text-capitalize mb-3">${product.type}</p>

            <h3 class="fw-bold text-primary mb-3">$${product.price.toFixed(2)}</h3>

            ${product.description ? `<p class="text-muted mb-3">${product.description}</p>` : ''}

            <hr>

            <div class="d-flex gap-4 mb-3">
              ${product.height ? `
              <div class="text-center">
                <p class="text-muted small mb-0">Alto</p>
                <p class="fw-semibold mb-0">${product.height} cm</p>
              </div>` : ''}
              ${product.width ? `
              <div class="text-center">
                <p class="text-muted small mb-0">Ancho</p>
                <p class="fw-semibold mb-0">${product.width} cm</p>
              </div>` : ''}
              ${product.weight ? `
              <div class="text-center">
                <p class="text-muted small mb-0">Peso</p>
                <p class="fw-semibold mb-0">${product.weight} kg</p>
              </div>` : ''}
            </div>

          </div>
        </div>
      </div>
    </div>`;
}

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