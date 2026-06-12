import api from './app.js';

const html = document.documentElement;

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("goBackBtn").addEventListener("click", goBack);
  document.getElementById("goToIndexBtn").addEventListener("click", goToIndex);
  document.getElementById("themeToggle").addEventListener("click", toggleTheme)

  try {
    const response = await api.getCurrentAdmin();
    document.getElementById('adminName').textContent = `Admin: ${response.data.username}`;
  } catch {
    //window.location.href = 'login.html'; 
  }

  const savedTheme = localStorage.getItem('theme') || 'light';
  applyTheme(savedTheme);

  await loadSurveys();
});

let surveys = [];
let currentPage = 1;
const surveysPerPage = 10;

async function loadSurveys() {
  try {
    const response = await api.getSurveys();

    surveys = response.data;
    currentPage = 1;

    renderSurveys();

  } catch (error) {
    document.getElementById('surveysContainer').innerHTML = `
      <div class="alert alert-danger">
        Error al cargar encuestas
      </div>
    `;
  }
}

function renderSurveys() {

  const start = (currentPage - 1) * surveysPerPage;
  const end = start + surveysPerPage;

  const pageData = surveys.slice(start, end);

  document.getElementById('surveysContainer').innerHTML = `
    <table class="table table-striped table-hover">
      <thead>
        <tr>
          <th>#</th>
          <th>Email</th>
          <th>Puntaje</th>
          <th>Recomienda</th>
          <th>Comentario</th>
        </tr>
      </thead>
      <tbody>
        ${pageData.map((survey, index) => `
          <tr>
            <td>${start + index + 1}</td>
            <td>${survey.email}</td>
            <td>${survey.appscore ?? '-'}</td>
            <td>
              ${
                survey.recommend === 1 || survey.recommend === '1'
                  ? 'Sí'
                  : survey.recommend === 0 || survey.recommend === '0'
                  ? 'No'
                  : '-'
              }
            </td>
            <td>${survey.comments}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  renderPagination();
}

function renderPagination() {

  const totalPages = Math.ceil(
    surveys.length / surveysPerPage
  );

  let html = '';

  html += `
    <button
      class="btn btn-outline-primary btn-sm"
      ${currentPage === 1 ? 'disabled' : ''}
      onclick="changePage(${currentPage - 1})">
      Anterior
    </button>
  `;

  for (let i = 1; i <= totalPages; i++) {

    html += `
      <button
        class="btn btn-sm ${
          i === currentPage
            ? 'btn-primary'
            : 'btn-outline-primary'
        }"
        onclick="changePage(${i})">
        ${i}
      </button>
    `;
  }

  html += `
    <button
      class="btn btn-outline-primary btn-sm"
      ${currentPage === totalPages ? 'disabled' : ''}
      onclick="changePage(${currentPage + 1})">
      Siguiente
    </button>
  `;

  document.getElementById('surveysPagination').innerHTML = html;
}

window.changePage = function(page) {
  currentPage = page;
  renderSurveys();
};

function goBack(e) {
  e.preventDefault();
  console.log("to to dashboard")
  window.location.href = "dashboard.html"
}

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

function toggleTheme() {
  const current = html.getAttribute('data-bs-theme');
  applyTheme(current === 'light' ? 'dark' : 'light');
}

function applyTheme(theme) { 
  html.setAttribute('data-bs-theme', theme);
  localStorage.setItem('theme', theme);
  document.getElementById('themeToggle').textContent = theme === 'light' ? '🌙' : '☀️';
}