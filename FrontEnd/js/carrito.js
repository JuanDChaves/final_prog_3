import api from './app.js';

const html = document.documentElement;
let products = [];
let cart = [];
let total_price;

document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("ticketBtn").addEventListener("click", goToTicket);
    document.getElementById("goBackBtn").addEventListener("click", goBack);
    document.getElementById("goToIndexBtn").addEventListener("click", goToIndex);
    document.getElementById("adminLoginBtn").addEventListener("click", goToLogin);
    document.getElementById("themeToggle").addEventListener("click", toggleTheme)

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme)

    cart = JSON.parse(localStorage.getItem('cart') || '[]');

    if(cart.length > 0) {
      const response = await api.getProducts();
      products = response.data;
    }

    render();
  });

window.changeCartQty = changeCartQty;

function changeCartQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if(!item) return;

  item.quantity += delta;

  if(item.quantity < 1) {
    cart = cart.filter(item => item.id !== id);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  render();
}

window.removeFromCart = removeFromCart;

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  render();
}

function render() {
  const cartList = document.getElementById('cartList');

  if(cart.length === 0) {
    cartList.innerHTML = `
      <div class="text-center text-muted py-5">
        <p class="fs-5">Tu carrito está vacío</p>
      </div>
    `;
    document.getElementById('cartTotal').textContent = '$0.00';
    return;
  }

  let total = 0;

  cartList.innerHTML = cart.map(item => {
    const product = products.find(product => product.id === item.id);
    if (!product) return '';
    const subtotal = product.price * item.quantity;
    total += subtotal;
    total_price = total.toFixed(2);

    return `
      <div class="card shadow-sm border">
        <div class="card-body py-2 px-3">
          <div class="row align-items-center g-2">

            <div class="col-auto">
              <img src="${product.image}" alt="${product.name}" width="56" height="56" class="rounded object-fit-cover">
            </div>

            <div class="col">
              <span class="fw-medium">${product.name}</span>
            </div>

            <div class="col-auto d-flex align-items-center gap-2">
              <button class="btn btn-outline-secondary btn-sm" onclick="changeCartQty(${item.id}, -1)">−</button>
              <span class="fw-semibold" style="min-width:24px; text-align:center">${item.quantity}</span>
              <button class="btn btn-outline-secondary btn-sm" onclick="changeCartQty(${item.id}, 1)">+</button>
            </div>

            <div class="col-auto fw-bold text-primary" style="min-width:80px; text-align:right">
              $${subtotal.toFixed(2)}
            </div>

            <div class="col-auto">
              <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart(${item.id})">🗑️</button>
            </div>

          </div>
        </div>
      </div>`;
  }).join('');

  document.getElementById('cartTotal').textContent = `$${total.toFixed(2)}`;
}

window.createNewSale = createNewSale;
window.createNewSaleItem = createNewSaleItem;

async function createNewSale() {
  const sale = {
    total_price:  total_price,
    status:  'completed',
  }
  const response = await api.createSale(sale)
  const saleId = response.data.id
  await createNewSaleItem(saleId);
}

async function createNewSaleItem(saleId) {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  console.log("en sale item", cart)

  for(const item of cart) {
    const cartProduct = await api.getProduct(item.id);
    const saleItem = {
      id_sale: saleId,
      id_product: cartProduct.data.id,
      quantity: item.quantity,
      unit_price: cartProduct.data.price 
    };
    await api.createSaleItem(saleItem);
  }
}

function goToTicket(e) {
  e.preventDefault();
  showConfirm(
    '¿Confirmar compra?',
    '¿Estás seguro que querés finalizar la compra?',
    'Confirmar',
    'primary',
    async () =>  {
      await createNewSale(),
      window.location.href = "ticket.html"
    }
 );
}

function showConfirm(title, message, btnLabel, btnType, onConfirm) {
  document.getElementById('confirmModalTitle').textContent = title;
  document.getElementById('confirmModalBody').textContent = message;

  const confirmButton = document.getElementById('confirmModalBtn');
  confirmButton.className = `btn btn-${btnType}`;
  confirmButton.textContent = btnLabel;
  confirmButton.onclick = () => {
    bootstrap.Modal.getOrCreateInstance(document.getElementById('confirmModal')).hide();
    onConfirm();
  };
  bootstrap.Modal.getOrCreateInstance(document.getElementById('confirmModal')).show();
}

function goBack(e) {
  e.preventDefault();
  console.log("go to product")
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