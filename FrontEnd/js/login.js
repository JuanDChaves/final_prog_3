import api from './app.js';

const html = document.documentElement;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginBtn").addEventListener("click", login);
    document.getElementById("goToIndexBtn").addEventListener("click", goToIndex);
    document.getElementById("autoCompleteBtn").addEventListener("click", autoComplete);
    document.getElementById("themeToggle").addEventListener("click", toggleTheme)

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme)
});

let username = "";
let password = ""

async function login(e) {
  e.preventDefault();

  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorBox = document.getElementById("loginError");

  // Clear previous errors
  [usernameInput, passwordInput].forEach(el => el.classList.remove('is-invalid'));
  errorBox.classList.add('d-none');
  errorBox.textContent = '';

  const username = usernameInput.value;
  const password = passwordInput.value;

  try {
    const response = await api.login(username, password);
    console.log(response.data);
    window.location.href = "dashboard.html";

  } catch (e) {
    const message = e.response?.data?.error || 'Error inesperado';

    switch (e.response?.status) {
      case 400: // Ya hay una sesión activa
        errorBox.textContent = message;
        errorBox.classList.remove('d-none');
        break;

      case 404: // Usuario no encontrado
        usernameInput.classList.add('is-invalid');
        document.getElementById('usernameError').textContent = message;
        break;

      case 401: // Contraseña incorrecta
        passwordInput.classList.add('is-invalid');
        document.getElementById('passwordError').textContent = message;
        break;

      default: // 500 or network error
        errorBox.textContent = message;
        errorBox.classList.remove('d-none');
    }
  }
}

function goToIndex(e) {
  e.preventDefault();
  console.log("go to index")
  window.location.href = "index.html"
}

function autoComplete(e) {
  e.preventDefault();
  document.getElementById("username").value = "juan";
  document.getElementById("password").value = "mypass";
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

/*
{
  "username": "juan",
  "email": "juan@mail.com",
  "password": "mypass"
},
{
  "username": "david",
  "email": "david@mail.com",
  "password": "mypass"
},
{
  "username": "ivette",
  "email": "ivette@mail.com",
  "password": "mypass"
},
{
  "username": "liliana",
  "email": "liliana@mail.com",
  "password": "mypass"
},
{
  "username": "carlos",
  "email": "carlos@mail.com",
  "password": "mypass"
}
*/