import api from './app.js';

const html = document.documentElement;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("goBackBtn").addEventListener("click", goBack);
    document.getElementById("cancelBtn").addEventListener("click", goBack);
    document.getElementById("goToIndexBtn").addEventListener("click", goToIndex);
    document.getElementById("themeToggle").addEventListener("click", toggleTheme);
    document.getElementById("submitBtn").addEventListener("click", submitProduct);
    document.getElementById("imageInput").addEventListener("change", previewImage);

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme)
  });

function previewImage() {
  const file = document.getElementById('imageInput').files[0];
  if (!file) return;

  const objectUrl = URL.createObjectURL(file);
  document.getElementById('imagePreview').src = objectUrl;
  document.getElementById('previewContainer').style.display = 'block';

  const serverUrl = `http://localhost:3000/images/${file.name}`;
  document.getElementById('imageInput').dataset.url = serverUrl;
}

function validate() {
  let valid = true;

  const name = document.getElementById('name');
  const type = document.getElementById('type');
  const price = document.getElementById('price');
  const imageInput = document.getElementById('imageInput');

  [name, type, price, imageInput].forEach(el => el.classList.remove('is-invalid'));

  if (!name.value.trim()) {
    name.classList.add('is-invalid');
    document.getElementById('nameError').textContent = 'El nombre es obligatorio';
    valid = false;
  }

  if (!type.value) {
    type.classList.add('is-invalid');
    document.getElementById('typeError').textContent = 'Seleccioná un tipo';
    valid = false;
  }

  if (!price.value || parseFloat(price.value) < 0) {
    price.classList.add('is-invalid');
    document.getElementById('priceError').textContent = 'Ingresá un precio válido';
    valid = false;
  }

  if (!imageInput.files[0]) {
    imageInput.classList.add('is-invalid');
    document.getElementById('imageError').textContent = 'Seleccioná una imagen';
    valid = false;
  }

  return valid;
}

async function submitProduct() {
  if (!validate()) return;

  const file = document.getElementById('imageInput').files[0];
  
  const product = {
    name:        document.getElementById('name').value.trim(),
    type:        document.getElementById('type').value,
    active:      document.getElementById('active').checked,
    price:       parseFloat(document.getElementById('price').value),
    description: document.getElementById('description').value.trim(),
    height:      parseFloat(document.getElementById('height').value),
    width:       parseFloat(document.getElementById('width').value),
    weight:      parseFloat(document.getElementById('weight').value),
    image:       document.getElementById('imageInput').dataset.url
  };

  showConfirm(
    '¿Guardar producto?',
    `¿Confirmar la creación de "${product.name}"?`,
    'Guardar',
    'primary',
    async () => {
      try {
        console.log(product);
        await api.createProduct(product);
        showAlert('success', 'Producto creado', `"${product.name}" fue guardado correctamente.`);
        setTimeout(() => window.location.href = 'dashboard.html', 3000);
      } catch (error) {
        showAlert('error', 'Error', 'No se pudo guardar el producto.');
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

function showAlert(type, title, message) {
  const colors = { success: 'bg-success text-white', error: 'bg-danger text-white', warning: 'bg-warning' };
  const modal = `
    <div class="modal fade" id="tempAlert" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header ${colors[type]}">
            <h5 class="modal-title">${title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">${message}</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
          </div>
        </div>
      </div>
    </div>`;
  document.body.insertAdjacentHTML('beforeend', modal);
  const el = document.getElementById('tempAlert');
  el.addEventListener('hidden.bs.modal', () => el.remove());
  bootstrap.Modal.getOrCreateInstance(el).show();
}

function goBack(e) {
  e.preventDefault();
  console.log("to to dashboard")
  window.location.href = "dashboard.html"
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