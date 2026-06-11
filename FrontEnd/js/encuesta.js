import api from './app.js';

const html = document.documentElement;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("goBackBtn").addEventListener("click", goBack);
    document.getElementById("goToIndexBtn").addEventListener("click", goToIndex);
    document.getElementById("adminLoginBtn").addEventListener("click", goToLogin);
    document.getElementById("themeToggle").addEventListener("click", toggleTheme)
    document.getElementById("submitBtn").addEventListener("click", submitSurvey);
    document.getElementById("skipSurveyBtn").addEventListener("click", skipSurvey);
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
}

function validate() {
  let valid = true;
  const email = document.getElementById('email');
  email.classList.remove('is-invalid');

  if (!email.value.trim()) {
    email.classList.add('is-invalid');
    document.getElementById('emailError').textContent = 'El correo es obligatorio';
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    email.classList.add('is-invalid');
    document.getElementById('emailError').textContent = 'Ingresá un correo válido';
    valid = false;
  }

  return valid;
}

function submitSurvey() {
  if (!validate()) return;

  const survey = {
    email: document.getElementById('email').value.trim(),
    comments: document.getElementById('comments').value.trim(),
    recommend: document.getElementById('recomendaria').checked,
    appscore: parseInt(document.getElementById('puntaje').value),
    image: document.getElementById('imageInput').files[0]?.name || null,
  };

  console.log('Encuesta enviada:', survey);
  api.createSurvey(survey);
  showAlert('success', 'Encuesta enviada', '¡Gracias por tu opinión!');
  //setTimeout(() => window.location.href = 'index.html', 2000);
}

function showAlert(type, title, message) {
  const colors = { success: 'bg-success text-white', error: 'bg-danger text-white', warning: 'bg-warning' };
  document.getElementById('alertModalHeader').className = `modal-header ${colors[type]}`;
  document.getElementById('alertModalTitle').textContent = title;
  document.getElementById('alertModalBody').textContent = message;
  bootstrap.Modal.getOrCreateInstance(document.getElementById('alertModal')).show();
}

function goBack(e) {
  e.preventDefault();
  window.location.href = "ticket.html"
}

function goToLogin(e) {
  e.preventDefault();
  window.location.href = "login.html";
}

function skipSurvey(e) {
  e.preventDefault();
  showAlert('success', 'Vuelve pronto', '¡Gracias por tu compra!');
  setTimeout(() => window.location.href = 'index.html', 2000);
}

function goToIndex(e) {
  e.preventDefault();
  window.location.href = "index.html";
  p
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