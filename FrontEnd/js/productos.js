const html = document.documentElement;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("goToCartBtn").addEventListener("click", goToCart);
    document.getElementById("goToProductBtn").addEventListener("click", goToProduct);
    document.getElementById("goToIndexBtn").addEventListener("click", goToIndex);
    document.getElementById("adminLoginBtn").addEventListener("click", goToLogin);
    document.getElementById("themeToggle").addEventListener("click", toggleTheme)

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme)
    });

import api from './app.js'

function goToCart(e) {
  e.preventDefault();
  console.log("go to cart")
  window.location.href = "carrito.html"
}

function goToProduct(e) {
  e.preventDefault();
  console.log("go to product")
  window.location.href = "detalle.html"
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

const PRODUCTS_PER_PAGE = 3;
let currentPage = 1;
let currentFilter = 'all';
const products = await api.getProducts();

// Replace with your real products from the API
const products2 = [
  { id: 1, name: 'Guitarra Eléctrica',  type: 'electronics', price: 499.99, isActive: true,  image: 'https://placehold.co/300x200/0d6efd/white?text=🎸' },
  { id: 2, name: 'Teclado MIDI',        type: 'electronics', price: 239.99, isActive: true,  image: 'https://placehold.co/300x200/0d6efd/white?text=🎹' },
  { id: 3, name: 'Batería Acústica',    type: 'electronics', price: 899.99, isActive: true,  image: 'https://placehold.co/300x200/0d6efd/white?text=🥁' },
  { id: 4, name: 'Violín Clásico',      type: 'clothing',    price: 349.99, isActive: true,  image: 'https://placehold.co/300x200/6610f2/white?text=🎻' },
  { id: 5, name: 'Trompeta de Jazz',    type: 'clothing',    price: 419.99, isActive: false, image: 'https://placehold.co/300x200/6610f2/white?text=🎺' },
  { id: 6, name: 'Flauta Traversa',     type: 'clothing',    price: 189.99, isActive: true,  image: 'https://placehold.co/300x200/6610f2/white?text=🪈' },
  { id: 7, name: 'Bajo Eléctrico',      type: 'electronics', price: 379.99, isActive: true,  image: 'https://placehold.co/300x200/0d6efd/white?text=🎸' },
];

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
  return currentFilter === 'all' ? products : products.filter(p => p.type === currentFilter);
}

function render() {
  const filtered = getFiltered();
  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const pageItems = filtered.slice(start, start + PRODUCTS_PER_PAGE);

  // Cards
  document.getElementById('productGrid').innerHTML = pageItems.map(p => `
    <div class="col-12 col-md-4">
      <div class="card h-100 shadow-sm border">
        <img src="${p.image}" class="card-img-top" alt="${p.name}" style="height:160px; object-fit:cover;">
        <div class="card-body d-flex flex-column">
          <h6 class="fw-semibold mb-1">${p.name}</h6>
          <span class="badge ${p.isActive ? 'bg-success' : 'bg-danger'} mb-2" style="width:fit-content">
            ${p.isActive ? 'Disponible' : 'Sin stock'}
          </span>
          <p class="fw-bold text-primary mb-3">$${p.price.toFixed(2)}</p>
          <div class="mt-auto d-flex align-items-center gap-2">
            <div class="input-group input-group-sm" style="width: 110px;">
              <button class="btn btn-outline-secondary" type="button" onclick="changeQty(${p.id}, -1)">−</button>
              <input type="number" class="form-control text-center" id="qty-${p.id}" value="1" min="1" max="99">
              <button class="btn btn-outline-secondary" type="button" onclick="changeQty(${p.id}, 1)">+</button>
            </div>
            <button class="btn btn-primary btn-sm flex-grow-1" onclick="addToCart(${p.id})" ${!p.isActive ? 'disabled' : ''}>
              Agregar
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  // Pagination
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
  console.log(`Agregar al carrito: ${product.name} x${qty}`);
  // 👉 wire to your cart logic here
}

render();