document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cartBtn").addEventListener("click", goToCart);
    document.getElementById("productBtn").addEventListener("click", goToProduct);
    document.getElementById("indexBtn").addEventListener("click", goToIndex);
    localStorage.clear(); // Limpiamos el local storage de cualquier interaccion anterior
});

function goToCart(e) {
  console.log("go to cart")
  window.location.href = "carrito.html"
}

function goToProduct(e) {
  console.log("go to product")
  window.location.href = "detalle.html"
}

function goToIndex(e) {
  console.log("go to index")
  window.location.href = "index.html"
}
// Load and display all products
const loadProducts = async () => {
    console.log("esto se ejecuta?")
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