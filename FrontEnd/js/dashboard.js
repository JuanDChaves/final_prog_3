import api from './app.js';

const html = document.documentElement;
let products = [];
const PRODUCTS_PER_PAGE = 5;
let currentPage = 1;
let currentFilter = 'all';

document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("recordsBtn").addEventListener("click", goToRecords);
    document.getElementById("addProductBtn").addEventListener("click", goToAddProduct);
    document.getElementById("assistanceBtn").addEventListener("click", goToAssistance);
    document.getElementById("indexBtn").addEventListener("click", goToIndex);
    document.getElementById("themeToggle").addEventListener("click", toggleTheme)

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    try {
      const response = await api.getCurrentAdmin();
      document.getElementById('adminName').textContent = `Admin: ${response.data.username}`;
    } catch {
      window.location.href = 'login.html'; 
    }

    await loadProducts();
});

async function loadProducts() {
  try {
    const response = await api.getProducts();
    products = response.data;
    render();
  } catch (error) {
    console.log("Error al cargar productos", error);
  }
}

window.filterProducts = filterProducts;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.goToPage = goToPage;

function filterProducts(type, btn) {
  currentFilter = type;
  currentPage = 1;
  document.querySelectorAll('.d-flex.gap-2.mb-4 .btn').forEach(button => {
    button.classList.remove('btn-primary');
    button.classList.add('btn-outline-primary');
  });
  btn.classList.remove('btn-outline-primary');
  btn.classList.add('btn-primary');
  render();
}

function getFiltered() {
  return currentFilter === 'all' ? products : products.filter(product => product.type === currentFilter);
}

function render() {
  const filtered = getFiltered();
  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const pageItems = filtered.slice(start, start + PRODUCTS_PER_PAGE);

  document.getElementById('productList').innerHTML = pageItems.map(product => `
    <div class="card shadow-sm border">
      <div class="card-body py-2 px-3">
        <div class="row align-items-center g-2">

          <div class="col-auto">
            <img src="${product.image}" alt="${product.name}" width="56" height="56" class="rounded" style="object-fit:cover;">
          </div>

          <div class="col">
            <span class="fw-medium">${product.name}</span>
            <span class="badge bg-secondary ms-2 text-capitalize small">${product.type}</span>
          </div>

          <div class="col-auto">
            <span class="badge ${product.active ? 'bg-success' : 'bg-danger'}">
              ${product.active ? 'Activo' : 'Inactivo'}
            </span>
          </div>

          <div class="col-auto fw-semibold" style="min-width:80px; text-align:right">
            $${product.price.toFixed(2)}
          </div>

          <div class="col-auto d-flex gap-2">
            <button class="btn btn-outline-primary btn-sm" onclick="editProduct(${product.id})">Modificar</button>
            <button class="btn btn-outline-${product.active ? 'danger' : 'success'} btn-sm" onclick="deleteProduct(${product.id})">${product.active ? 'Desactivar' : 'Activar'}</button>
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

function goToPage(page) {
  const totalPages = Math.ceil(getFiltered().length / PRODUCTS_PER_PAGE);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  render();
  document.getElementById('productList').scrollIntoView({ behavior: 'smooth' });
}

function editProduct(id) {
  localStorage.setItem('editProductId', id);
  window.location.href = 'alta.html';
}

function deleteProduct(id) {
  const product = products.find(p => p.id === id);
  const willActivate = !product.active;

  showConfirm(
    willActivate ? 'Activar producto' : 'Desactivar producto',
    `¿Estás seguro que querés ${willActivate ? 'activar' : 'desactivar'} "${product.name}"?`,
    willActivate ? 'Activar' : 'Desactivar',
    willActivate ? 'success': 'danger',
    async () => {
      try {
        await api.updateProduct(id, { active: willActivate });
        products.active = willActivate;  
        render();
        window.location.href = "dashboard.html";
      } catch (error) {
        console.log("Error al actualizar el producto", error);
      }
    }
  );
}

function showConfirm(title, message, btnLabel, btnType, onConfirm) {
  document.getElementById('confirmModalTitle').textContent = title;
  document.getElementById('confirmModalBody').textContent = message;
  const btn = document.getElementById('confirmModalBtn');
  btn.className = `btn btn-${btnType}`;
  btn.textContent = btnLabel;
  btn.onclick = () => {
    bootstrap.Modal.getOrCreateInstance(document.getElementById('confirmModal')).hide();
    onConfirm();
  };
  bootstrap.Modal.getOrCreateInstance(document.getElementById('confirmModal')).show();
}

function goToAddProduct(e) {
  e.preventDefault();
  window.location.href = "alta.html";
}

function goToRecords(e) {
  e.preventDefault();
  console.log("to to records")
  window.location.href = "registros.html"
}

function goToAssistance(e) {
  e.preventDefault();
  console.log("to to assistance")
  window.location.href = "asistencia.html"
}

window.goToIndex = goToIndex;

async function goToIndex() {
  showConfirm(
    'Cerrar sesión',
    '¿Estás seguro que querés cerrar sesión?',
    'Cerrar sesión',
    'danger',
    async () => {
      try {
        await api.logout();
        window.location.href = "index.html";
      } catch (error) {
        console.log("Error al salir", error);
      }
    }
  )
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