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
  username = document.getElementById("username").value;
  password = document.getElementById("password").value;
  try {
    const response = await api.login(username, password);
    console.log(response.data)
    window.location.href = "dashboard.html"
    username = "";
    password = "";
  } catch(e) {
    console.log("ERROR", e.response?.data)
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