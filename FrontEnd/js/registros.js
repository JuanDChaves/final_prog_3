import api from './app.js';

const html = document.documentElement;
const allData = {};

document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("goBackBtn").addEventListener("click", goBack);
    document.getElementById("goToIndexBtn").addEventListener("click", goToIndex);
    document.getElementById("themeToggle").addEventListener("click", toggleTheme);
    document.getElementById("exportBtn").addEventListener("click", exportExcel);
    document.getElementById("filterLogsBtn").addEventListener("click", loadAdminLogs);

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme)

    try {
      const response = await api.getCurrentAdmin();
      document.getElementById('adminName').textContent = `Admin: ${response.data.username}`;
    } catch {
      window.location.href = 'login.html'; 
    }

    document.getElementById('prevLogsPage').addEventListener('click', () => {
      if (logsCurrentPage > 1) {
        logsCurrentPage--;
        renderLogsPage();
      }
    });

    document.getElementById('nextLogsPage').addEventListener('click', () => {
      const totalPages = Math.ceil(
        allData.logsPorFecha.length / logsPerPage
      );

      if (logsCurrentPage < totalPages) {
        logsCurrentPage++;
        renderLogsPage();
      }
    });

    await loadAll();
  });

window.showTab = showTab;

function showTab(id, btn) {
  document.querySelectorAll('.tab-content-panel').forEach(tab => tab.classList.add('d-none'));
  document.getElementById(id).classList.remove('d-none');
  document.querySelectorAll('#registrosTab .nav-link').forEach(button => button.classList.remove('active'));
  btn.classList.add('active');
}

async function loadAll() {
  await Promise.all([
    loadAllSales(),
    loadProductsMasVendidos(),
    loadProductsMasCaros(),
    loadProductsMejorRecibidos(),
    loadProductQuantityMasFrecuente(),
    loadSalesMasCaras(),
    loadAdminLogs(),
    loadMostActiveAdmins()
  ]);
}

let salesCurrentPage = 1;
const SALES_PER_PAGE = 10;
let allSales = [];

async function loadAllSales() {
  try {
    const response = await api.getAllSales();
    allSales = response.data;
    allData.allSales = allSales;
    renderSales();
  } catch (e) {
    console.log(e)
    document.getElementById('todasVentasList').innerHTML = errorMsg();
  }
}

function renderSales() {
  const totalPages = Math.ceil(allSales.length / SALES_PER_PAGE);
  const start = (salesCurrentPage - 1) * SALES_PER_PAGE;
  const pageItems = allSales.slice(start, start + SALES_PER_PAGE);

  document.getElementById('todasVentasList').innerHTML = renderTable(
    ['#', 'ID Venta', 'Total', 'Estado', 'Fecha'],
    pageItems.map((item, index) => [
      start + index + 1,
      item.id,
      `$${item.total_price}`,
      item.status,
      formatDate(item.createdAt)
    ])
  );

  const pagination = document.getElementById('ventasPagination');
  pagination.innerHTML = '';
  if (totalPages <= 1) return;

  pagination.innerHTML = `
    <li class="page-item ${salesCurrentPage === 1 ? 'disabled' : ''}">
      <button class="page-link" onclick="salesGoToPage(${salesCurrentPage - 1})">‹</button>
    </li>
    ${Array.from({ length: totalPages }, (_, i) => `
      <li class="page-item ${i + 1 === salesCurrentPage ? 'active' : ''}">
        <button class="page-link" onclick="salesGoToPage(${i + 1})">${i + 1}</button>
      </li>
    `).join('')}
    <li class="page-item ${salesCurrentPage === totalPages ? 'disabled' : ''}">
      <button class="page-link" onclick="salesGoToPage(${salesCurrentPage + 1})">›</button>
    </li>
  `;
}

window.salesGoToPage = salesGoToPage;

function salesGoToPage(page) {
  const totalPages = Math.ceil(allSales.length / SALES_PER_PAGE);
  if (page < 1 || page > totalPages) return;
  salesCurrentPage = page;
  renderSales();
}

async function loadProductsMasVendidos() {
  try {
    const response = await api.getMostPurchasedProducts();
    const data = response.data;
    allData.mostPurchased = data;
    document.getElementById('masCompradosList').innerHTML = renderTable (
      ['#', 'Producto', 'Tipo', 'Total Vendido'],
      data.map((item, index) => [
        index + 1, 
        item.Product.name,
        item.Product.type,
        item.total_sold
      ])
    );
  } catch {
    document.getElementById('masCompradosList').innerHTML = errorMsg();
  }
}

async function loadProductsMasCaros() {
  try {
    const response = await api.getMostExpensiveProducts();
    const data = response.data;
    allData.masCarosProducts = data;
    document.getElementById('masCarosProductsList').innerHTML = renderTable(
      ['#', 'Producto', 'Tipo', 'Precio'],
      data.map((item, index) => [
        index + 1,
        item.name,
        item.type,
        `$${item.price}`
      ])
    );
  } catch {
    document.getElementById('masCarosProductsList').innerHTML = errorMsg();
  }
}

async function loadProductQuantityMasFrecuente() {
  try {
    const response = await api.getMostFrequentProductQuantity();
    const data = response.data;
    allData.masFrecuentes = data;
    document.getElementById('masFrecuentesList').innerHTML = renderTable(
      ['#', 'Cantidad', 'Veces pedida'],
      data.map((item, index) => [
        index + 1,
        item.quantity,
        item.frequency
      ])
    );
  } catch {
    document.getElementById('masFrecuentesList').innerHTML = errorMsg();
  }
}

async function loadProductsMejorRecibidos() {
  try {
    const response = await api.getMostLikedProducts();
    const data = response.data;
    allData.masGustados = data;
    document.getElementById('masGustadosList').innerHTML = renderTable(
      ['#', 'Producto', 'Tipo', 'Puntaje promedio'],
      data.map((item, index) => [
        index + 1,
        item.Product.name,
        item.Product.type,
        parseFloat(item.avg_score).toFixed(1)
      ])
    );
  } catch (e) {
    console.log(e)
    document.getElementById('masGustadosList').innerHTML = errorMsg();
  }
}

async function loadSalesMasCaras() {
  try {
    const response = await api.getMostExpensiveSales();
    const data = response.data;
    allData.masCarasSales = data;
    document.getElementById('masCarasSalesList').innerHTML = renderTable(
      ['#', 'ID Venta', 'Total', 'Estado', 'Fecha'],
      data.map((item, index) => [
        index + 1,
        item.id,
        `$${item.total_price}`,
        item.status,
        formatDate(item.createdAt)
      ])
    );
  } catch {
    document.getElementById('masCarasSalesList').innerHTML = errorMsg();
  }
}

let logsCurrentPage = 1;
const logsPerPage = 10;

async function loadAdminLogs() {
  const from = document.getElementById('dateFrom').value;
  const to = document.getElementById('dateTo').value;

  try {
    const response = await api.getLogsByRange(from, to);
    const data = response.data;
    allData.logsPorFecha = data;

    logsCurrentPage = 1;

    renderLogsPage();

  } catch {
    document.getElementById('logsPorFechaList').innerHTML = errorMsg();
  }
}

function renderLogsPage() {
  const data = allData.logsPorFecha || [];

  const start = (logsCurrentPage - 1) * logsPerPage;
  const end = start + logsPerPage;

  const pageData = data.slice(start, end);

  document.getElementById('logsPorFechaList').innerHTML = renderTable(
    ['#', 'Admin', 'Fecha'],
    pageData.map((log, index) => [
      start + index + 1,
      log.Admin.username,
      formatDate(log.createdAt)
    ])
  );
}

function renderTable (headers, rows) {
  if(!rows || rows.length === 0) return '<p class="text-muted">Sin datos disponibles.</p>';
  return `
    <div class="table-responsive">
      <table class="table table-hover table-sm align-middle">
        <thead class="table-primary">
          <tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${rows.map(row => `
            <tr>${row.map(cell => `<td>${cell ?? '-'}</td>`).join('')}</tr> 
          `).join('')}
        </tbody>
      </table>
    </div>`;
}

async function filterLogs() {
  const from = document.getElementById('dateFrom').value;
  const to = document.getElementById('dateTo').value;
  if (!from || !to) return;
  try {
    const response = await api.getLogsByDateRange(from, to);
    const data = response.data;
    allData.logsPorFecha = data;
    document.getElementById('logsPorFechaList').innerHTML = renderTable(
      ['#', 'Admin', 'Acción', 'Fecha'],
      data.map((l, i) => [i + 1, l.admin, l.action, formatDate(l.createdAt)])
    );
  } catch { document.getElementById('logsPorFechaList').innerHTML = errorMsg(); }
}

async function loadMostActiveAdmins() {
  try {
    const response = await api.getMostActiveAdmins();

    document.getElementById('adminsLogsList').innerHTML = renderTable(
      ['#', 'Admin', 'Registros'],
      response.data.map((admin, index) => [
        index + 1,
        admin.Admin.username,
        admin.total_logs
      ])
    );

  } catch (e) {
    console.log(e)
    document.getElementById('adminsLogsList').innerHTML = errorMsg();
  }
}

function exportExcel() {
  const wb = XLSX.utils.book_new();

  const sheets = [
    { key: 'masComprados',    name: 'Más Comprados',    headers: ['#', 'Producto', 'Tipo', 'Total vendido'] },
    { key: 'masCarasSales',   name: 'Ventas Más Caras', headers: ['#', 'ID Venta', 'Total', 'Estado', 'Fecha'] },
    { key: 'adminsLogs',      name: 'Admins Activos',   headers: ['#', 'Admin', 'Email', 'Total logs'] },
    { key: 'masCarosProducts',name: 'Productos Caros',  headers: ['#', 'Producto', 'Tipo', 'Precio'] },
    { key: 'masGustados',     name: 'Más Gustados',     headers: ['#', 'Producto', 'Tipo', 'Likes'] },
    { key: 'masFrecuentes',   name: 'Más Frecuentes',   headers: ['#', 'Producto', 'Tipo', 'Veces comprado'] },
    { key: 'logsPorFecha',    name: 'Logs por Fecha',   headers: ['#', 'Admin', 'Acción', 'Fecha'] },
  ];

  sheets.forEach(({ key, name, headers }) => {
    const data = allData[key];
    if (!data || data.length === 0) return;
    const ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.sheet_add_aoa(ws, [headers], { origin: 'A1' });
    XLSX.utils.book_append_sheet(wb, ws, name);
  });

  XLSX.writeFile(wb, 'registros_tienda.xlsx');
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('es-AR', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  });
}

function errorMsg() {
  return '<p class="text-danger small">Error al cargar los datos.</p>';
}

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