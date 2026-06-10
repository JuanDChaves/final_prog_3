import api from './app.js'

const html = document.documentElement;
let products = [];
const PRODUCTS_PER_PAGE = 3;
let currentPage = 1;
let currentFilter = 'all';

document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("goToCartBtn").addEventListener("click", goToCart);
    document.getElementById("goToIndexBtn").addEventListener("click", goToIndex);
    document.getElementById("adminLoginBtn").addEventListener("click", goToLogin);
    document.getElementById("themeToggle").addEventListener("click", toggleTheme)

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme)

    await loadProducts();
});

async function loadProducts() {
  try {
    const data = await api.getProducts();
    products = data.data;
    render();
  } catch (e) {
    console.log("Error al cargar productos", error);
  }
}

window.filterProducts = filterProducts;
window.changeQty = changeQty;
window.addToCart = addToCart;
window.goToPage = goToPage;
window.goToProduct = goToProduct;

function filterProducts(type, btn) {
  currentFilter = type;
  currentPage = 1;
  document.querySelectorAll('.d-flex.gap-2.mb-4 .btn').forEach(b => {
    b.classList.remove('btn-primary');
    b.classList.add('btn-outline-primary');
  });
  btn.classList.remove('btn-outline-primary');
  btn.classList.add('btn-primary');
  render();
}

function getFiltered() {
  const activeFiltered = products.filter(p => p.active === true);
  return currentFilter === 'all' ? activeFiltered : activeFiltered.filter(p => p.type === currentFilter);
}

function render() {
  const filtered = getFiltered();
  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const pageItems = filtered.slice(start, start + PRODUCTS_PER_PAGE);

  document.getElementById('productGrid').innerHTML = pageItems.map(p => `
    <div class="col-12 col-md-4">
      <div class="card h-100 shadow-sm border">
        <div class="position-relative">
          <img src="${p.image}" class="card-img-top" alt="${p.name}" style="height:160px; object-fit:cover;">
          <button class="btn btn-light btn-sm position-absolute top-0 end-0 m-2 rounded-circle" 
            onclick="goToProduct(${p.id})" title="Más info" style="width:32px; height:32px; padding:0;">
            ℹ️
          </button>
        </div>
        <div class="card-body d-flex flex-column">
          <h6 class="fw-semibold mb-1">${p.name}</h6>
          <p class="fw-bold text-primary mb-3">$${p.price.toFixed(2)}</p>
          <div class="mt-auto d-flex align-items-center gap-2">
            <div class="input-group input-group-sm" style="width: 110px;">
              <button class="btn btn-outline-secondary" type="button" onclick="changeQty(${p.id}, -1)">−</button>
              <input type="number" class="form-control text-center" id="qty-${p.id}" value="1" min="1" max="99">
              <button class="btn btn-outline-secondary" type="button" onclick="changeQty(${p.id}, 1)">+</button>
            </div>
            <button class="btn btn-primary btn-sm flex-grow-1" onclick="addToCart(${p.id})" ${!p.active ? 'disabled' : ''}>
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
  if (totalPages <= 1) return;

  pagination.innerHTML = `
    <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
      <button class="page-link" onclick="goToPage(${currentPage - 1})">‹</button>
    </li>
    ${Array.from({ length: totalPages }, (_, i) => `
      <li class="page-item ${i + 1 === currentPage ? 'active' : ''}">
        <button class="page-link" onclick="goToPage(${i + 1})">${i + 1}</button>
      </li>
    `).join('')}
    <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
      <button class="page-link" onclick="goToPage(${currentPage + 1})">›</button>
    </li>
  `;
}
function goToCart(e) {
  e.preventDefault();
  console.log("go to cart")
  window.location.href = "carrito.html"
}

function goToProduct(id) {
  localStorage.setItem('selectedProductId', id);
  window.location.href = `detalle.html?id=${id}`;
}

function goToIndex(e) {
  e.preventDefault();
  console.log("go to index")
  window.location.href = "index.html"
}

function goToLogin(e) {
  e.preventDefault();
  window.location.href = "login.html";
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

function goToPage(page) {
  const totalPages = Math.ceil(getFiltered().length / PRODUCTS_PER_PAGE);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  render();
  document.getElementById('productGrid').scrollIntoView({ behavior: 'smooth' });
}

function changeQty(id, delta) {
  const input = document.getElementById(`qty-${id}`);
  const newVal = Math.max(1, Math.min(99, parseInt(input.value) + delta));
  input.value = newVal;
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const qty = parseInt(document.getElementById(`qty-${id}`).value);

  const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
  const existing = cartData.find(item => item.id === id);

  if(existing) {
    existing.quantity += qty;
  } else {
    cartData.push({id: product.id, quantity: qty})
  }

  localStorage.setItem('cart', JSON.stringify(cartData));
  console.log(`Agregar al carrito:`, cartData);
}

render();