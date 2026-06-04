document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("goToCartBtn").addEventListener("click", goToCart);
    document.getElementById("goToProductBtn").addEventListener("click", goToProduct);
    document.getElementById("goToIndexBtn").addEventListener("click", goToIndex);
    document.getElementById("adminLoginBtn").addEventListener("click", goToLogin);
    //localStorage.clear(); // Limpiamos el local storage de cualquier interaccion anterior
});

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
// Load and display all products
const loadProducts = async () => {
  const products = await api.getProducts();
  const container = document.getElementById('products-list');

  container.innerHTML = products.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}" width="100"/>
      <h3>${p.name}</h3>
      <p>Type: ${p.type}</p>
      <p>Price: $${p.price}</p>
      <p>Active: ${p.active ? 'Yes' : 'No'}</p>
      <button onclick="handleDelete(${p.id})">Delete</button>
    </div>
  `).join('');
};

// Create a product
const handleCreate = async () => {
  const data = {
    name:   document.getElementById('name').value,
    type:   document.getElementById('type').value,
    price:  document.getElementById('price').value,
    image:  document.getElementById('image').value,
    active: true
  };

  await api.createProduct(data);
  loadProducts(); // refresh the list
};

// Delete a product
const handleDelete = async (id) => {
  await api.deleteProduct(id);
  loadProducts(); // refresh the list
};

// Run on page load
loadProducts();