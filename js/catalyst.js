/* ============================================
   CATALYST LAB — ZCQL Tester + Data Store
   ============================================ */

// ── Mock Data Store ────────────────────────────────────────
const MOCK_TABLES = {
  Users: {
    columns: ['ROWID', 'Name', 'Email', 'Role', 'Status', 'Created_At'],
    rows: [
      [1, 'Alice Johnson', 'alice@company.com', 'Admin', 'active', '2025-06-15'],
      [2, 'Bob Smith', 'bob@company.com', 'Developer', 'active', '2025-07-20'],
      [3, 'Charlie Brown', 'charlie@company.com', 'Designer', 'active', '2025-08-10'],
      [4, 'Diana Prince', 'diana@company.com', 'Manager', 'active', '2025-09-01'],
      [5, 'Eve Wilson', 'eve@company.com', 'Developer', 'inactive', '2025-03-22'],
      [6, 'Frank Lee', 'frank@company.com', 'Developer', 'active', '2025-10-05'],
      [7, 'Grace Kim', 'grace@company.com', 'Designer', 'active', '2025-11-12'],
      [8, 'Henry Davis', 'henry@company.com', 'Manager', 'inactive', '2025-01-30'],
      [9, 'Ivy Chen', 'ivy@company.com', 'Admin', 'active', '2026-01-14'],
      [10, 'Jack Turner', 'jack@company.com', 'Developer', 'active', '2026-02-28'],
    ]
  },
  Products: {
    columns: ['ROWID', 'Name', 'Price', 'Category', 'Stock', 'Created_At'],
    rows: [
      [1, 'Widget Pro', 29.99, 'Electronics', 150, '2025-05-10'],
      [2, 'Gadget Mini', 49.99, 'Electronics', 85, '2025-06-22'],
      [3, 'Super Cable', 9.99, 'Accessories', 500, '2025-07-01'],
      [4, 'Power Bank XL', 39.99, 'Electronics', 200, '2025-08-15'],
      [5, 'USB Hub 7-Port', 24.99, 'Accessories', 320, '2025-09-03'],
      [6, 'Keyboard Mech', 79.99, 'Electronics', 60, '2025-10-18'],
      [7, 'Mouse Wireless', 34.99, 'Electronics', 175, '2025-11-25'],
      [8, 'Monitor Stand', 44.99, 'Furniture', 90, '2025-12-10'],
      [9, 'Desk Lamp LED', 19.99, 'Furniture', 250, '2026-01-05'],
      [10, 'Webcam HD', 59.99, 'Electronics', 110, '2026-02-14'],
      [11, 'Headphones BT', 69.99, 'Electronics', 95, '2026-03-01'],
      [12, 'Phone Case', 14.99, 'Accessories', 400, '2026-03-15'],
    ]
  },
  Orders: {
    columns: ['ROWID', 'Customer_Name', 'Product', 'Quantity', 'Total', 'Status', 'Order_Date'],
    rows: [
      [1, 'Alice Johnson', 'Widget Pro', 2, 59.98, 'Completed', '2026-01-10'],
      [2, 'Bob Smith', 'Gadget Mini', 1, 49.99, 'Completed', '2026-01-15'],
      [3, 'Charlie Brown', 'Super Cable', 5, 49.95, 'Shipped', '2026-02-01'],
      [4, 'Diana Prince', 'Power Bank XL', 3, 119.97, 'Processing', '2026-02-14'],
      [5, 'Eve Wilson', 'Keyboard Mech', 1, 79.99, 'Completed', '2026-02-20'],
      [6, 'Frank Lee', 'Mouse Wireless', 2, 69.98, 'Shipped', '2026-03-01'],
      [7, 'Grace Kim', 'Monitor Stand', 1, 44.99, 'Processing', '2026-03-05'],
      [8, 'Henry Davis', 'Widget Pro', 4, 119.96, 'Cancelled', '2026-03-10'],
      [9, 'Ivy Chen', 'Webcam HD', 1, 59.99, 'Completed', '2026-03-18'],
      [10, 'Jack Turner', 'Headphones BT', 2, 139.98, 'Processing', '2026-03-25'],
    ]
  }
};

// ── Tab Starter Code ──────────────────────────────────────
const TAB_CODE = {
  zcql: `-- ZCQL Query Tester
-- Try these queries against the mock Data Store:
-- Tables: Users, Products, Orders

SELECT Name, Email, Role
FROM Users
WHERE Status = 'active'
ORDER BY Name ASC;`,
  datastore: `-- Data Store Operations
-- INSERT, UPDATE, DELETE operations

-- Insert a new user
INSERT INTO Users (Name, Email, Role, Status, Created_At)
VALUES ('New User', 'new@company.com', 'Developer', 'active', '2026-03-27');

-- Update a user
-- UPDATE Users SET Role = 'Admin' WHERE ROWID = 5;

-- Delete a record
-- DELETE FROM Orders WHERE Status = 'Cancelled';`,
  functions: `// Catalyst Serverless Function (Node.js)
// This simulates a Catalyst Advanced I/O function

const catalyst = require("zcatalyst-sdk-node");

module.exports = async (req, res) => {
  const app = catalyst.initialize(req);
  const zcql = app.zcql();

  // Query active users
  const query = "SELECT * FROM Users WHERE Status = 'active'";
  const result = await zcql.executeZCQLQuery(query);

  const users = result.map(row => ({
    name: row.Users.Name,
    email: row.Users.Email,
    role: row.Users.Role
  }));

  res.status(200).json({
    success: true,
    count: users.length,
    users
  });
};`
};

// ── State ──────────────────────────────────────────────────
let editor = null;
let activeTab = 'zcql';

// ── Initialize ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initEditor();
  bindTabs();
  bindActions();
});

function initEditor() {
  editor = CodeMirror.fromTextArea(document.getElementById('catalyst-editor'), {
    mode: 'text/x-sql',
    theme: 'material-darker',
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 2,
    tabSize: 2,
    lineWrapping: true,
  });
  editor.setValue(TAB_CODE.zcql);
}

function bindTabs() {
  document.querySelectorAll('.catalyst-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.catalyst-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeTab = tab.dataset.tab;

      editor.setValue(TAB_CODE[activeTab] || '');
      const filenames = { zcql: 'query.zcql', datastore: 'operations.zcql', functions: 'function.js' };
      document.getElementById('catalyst-filename').textContent = filenames[activeTab] || 'query.zcql';

      const modes = { zcql: 'text/x-sql', datastore: 'text/x-sql', functions: 'text/x-java' };
      editor.setOption('mode', modes[activeTab] || 'text/x-sql');

      // Clear results
      document.getElementById('results-container').innerHTML = '<div style="text-align:center;padding:48px;color:var(--text-muted);">Write a query and click Execute.</div>';
      document.getElementById('results-stats').textContent = '';
    });
  });
}

function bindActions() {
  document.getElementById('btn-catalyst-run').addEventListener('click', executeQuery);
  document.getElementById('btn-catalyst-clear').addEventListener('click', () => {
    editor.setValue(TAB_CODE[activeTab] || '');
    document.getElementById('results-container').innerHTML = '<div style="text-align:center;padding:48px;color:var(--text-muted);">Write a query and click Execute.</div>';
    document.getElementById('results-stats').textContent = '';
  });
}

// ── Execute ZCQL ──────────────────────────────────────────
function executeQuery() {
  const code = editor.getValue().trim();
  const container = document.getElementById('results-container');
  const stats = document.getElementById('results-stats');

  if (activeTab === 'functions') {
    // Simulate function execution
    container.innerHTML = '';
    const pre = document.createElement('pre');
    pre.style.cssText = 'font-family:var(--font-mono);font-size:0.82rem;color:var(--text-primary);padding:16px;white-space:pre-wrap;';
    pre.textContent = JSON.stringify({
      success: true,
      count: MOCK_TABLES.Users.rows.filter(r => r[4] === 'active').length,
      users: MOCK_TABLES.Users.rows.filter(r => r[4] === 'active').map(r => ({
        name: r[1], email: r[2], role: r[3]
      }))
    }, null, 2);
    container.appendChild(pre);
    stats.textContent = `Function executed in 42ms`;
    showToast('success', 'Function executed (simulated)');
    return;
  }

  // Extract SQL-like queries (skip comments)
  const queries = code.split(';').map(q => q.trim()).filter(q => q && !q.startsWith('--'));
  if (queries.length === 0) {
    showToast('error', 'No query to execute');
    return;
  }

  const query = queries[0]; // Execute first query
  const startTime = performance.now();

  try {
    const result = simulateZCQL(query);
    const elapsed = (performance.now() - startTime).toFixed(1);

    if (result.type === 'select') {
      renderTable(container, result.columns, result.rows);
      stats.textContent = `${result.rows.length} rows returned in ${elapsed}ms`;
    } else if (result.type === 'count') {
      renderTable(container, result.columns, result.rows);
      stats.textContent = `Aggregation result in ${elapsed}ms`;
    } else {
      container.innerHTML = `<div style="text-align:center;padding:48px;color:var(--accent-green);">✅ ${result.message}</div>`;
      stats.textContent = `Executed in ${elapsed}ms`;
    }

    showToast('success', 'Query executed successfully');
  } catch (e) {
    container.innerHTML = `<div style="padding:24px;"><div style="color:var(--accent-red);font-family:var(--font-mono);font-size:0.85rem;">❌ ${e.message}</div></div>`;
    stats.textContent = 'Query failed';
    showToast('error', 'Query error');
  }
}

// ── ZCQL Simulator ────────────────────────────────────────
function simulateZCQL(query) {
  const upper = query.toUpperCase().trim();

  // SELECT
  if (upper.startsWith('SELECT')) {
    return handleSelect(query);
  }

  // INSERT
  if (upper.startsWith('INSERT')) {
    const tableMatch = query.match(/INSERT\s+INTO\s+(\w+)/i);
    const tableName = tableMatch ? tableMatch[1] : 'Unknown';
    if (!MOCK_TABLES[tableName]) throw new Error(`Table not found: "${tableName}"`);
    return { type: 'mutation', message: `1 row inserted into ${tableName}` };
  }

  // UPDATE
  if (upper.startsWith('UPDATE')) {
    const tableMatch = query.match(/UPDATE\s+(\w+)/i);
    const tableName = tableMatch ? tableMatch[1] : 'Unknown';
    if (!MOCK_TABLES[tableName]) throw new Error(`Table not found: "${tableName}"`);
    return { type: 'mutation', message: `Rows updated in ${tableName}` };
  }

  // DELETE
  if (upper.startsWith('DELETE')) {
    const tableMatch = query.match(/DELETE\s+FROM\s+(\w+)/i);
    const tableName = tableMatch ? tableMatch[1] : 'Unknown';
    if (!MOCK_TABLES[tableName]) throw new Error(`Table not found: "${tableName}"`);
    return { type: 'mutation', message: `Rows deleted from ${tableName}` };
  }

  throw new Error('Unsupported query type. Use SELECT, INSERT, UPDATE, or DELETE.');
}

function handleSelect(query) {
  // Parse FROM table
  const fromMatch = query.match(/FROM\s+(\w+)/i);
  if (!fromMatch) throw new Error('Missing FROM clause');
  const tableName = fromMatch[1];
  const table = MOCK_TABLES[tableName];
  if (!table) throw new Error(`Table not found: "${tableName}". Available: ${Object.keys(MOCK_TABLES).join(', ')}`);

  // Parse columns
  const selectMatch = query.match(/SELECT\s+(.+?)\s+FROM/i);
  const colExpr = selectMatch ? selectMatch[1].trim() : '*';

  // Check for COUNT/aggregation
  if (colExpr.toUpperCase().includes('COUNT(')) {
    return handleAggregation(query, table, tableName);
  }

  let selectedCols;
  let colIndices;
  if (colExpr === '*') {
    selectedCols = [...table.columns];
    colIndices = table.columns.map((_, i) => i);
  } else {
    selectedCols = colExpr.split(',').map(c => c.trim());
    colIndices = selectedCols.map(c => {
      const idx = table.columns.indexOf(c);
      if (idx === -1) throw new Error(`Column "${c}" not found in ${tableName}. Available: ${table.columns.join(', ')}`);
      return idx;
    });
  }

  // Start with all rows
  let rows = table.rows.map(r => colIndices.map(i => r[i]));
  let allRows = table.rows;

  // Parse WHERE
  const whereMatch = query.match(/WHERE\s+(.+?)(?:\s+ORDER|\s+LIMIT|\s+GROUP|\s*$)/i);
  if (whereMatch) {
    const cond = whereMatch[1].trim();
    const condMatch = cond.match(/(\w+)\s*(=|!=|<>|<|>|<=|>=|LIKE)\s*'([^']*)'|(\w+)\s*(=|!=|<>|<|>|<=|>=)\s*(\d+)/i);
    if (condMatch) {
      const field = condMatch[1] || condMatch[4];
      const op = (condMatch[2] || condMatch[5]).toUpperCase();
      const val = condMatch[3] !== undefined ? condMatch[3] : Number(condMatch[6]);
      const fieldIdx = table.columns.indexOf(field);
      if (fieldIdx === -1) throw new Error(`Column "${field}" not found`);

      allRows = allRows.filter(r => {
        const cellVal = r[fieldIdx];
        switch (op) {
          case '=': return String(cellVal) === String(val);
          case '!=': case '<>': return String(cellVal) !== String(val);
          case '<': return Number(cellVal) < Number(val);
          case '>': return Number(cellVal) > Number(val);
          case '<=': return Number(cellVal) <= Number(val);
          case '>=': return Number(cellVal) >= Number(val);
          case 'LIKE': return String(cellVal).toLowerCase().includes(String(val).toLowerCase().replace(/%/g, ''));
          default: return true;
        }
      });
      rows = allRows.map(r => colIndices.map(i => r[i]));
    }
  }

  // Parse ORDER BY
  const orderMatch = query.match(/ORDER\s+BY\s+(\w+)\s*(ASC|DESC)?/i);
  if (orderMatch) {
    const orderField = orderMatch[1];
    const orderDir = (orderMatch[2] || 'ASC').toUpperCase();
    const orderIdx = table.columns.indexOf(orderField);
    if (orderIdx >= 0) {
      const rowIdxInSelected = colIndices.indexOf(orderIdx);
      const sortField = rowIdxInSelected >= 0 ? rowIdxInSelected : 0;
      rows.sort((a, b) => {
        const va = a[sortField], vb = b[sortField];
        if (typeof va === 'number') return orderDir === 'ASC' ? va - vb : vb - va;
        return orderDir === 'ASC' ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
      });
    }
  }

  // Parse LIMIT
  const limitMatch = query.match(/LIMIT\s+(\d+)(?:\s*,\s*(\d+))?/i);
  if (limitMatch) {
    if (limitMatch[2]) {
      const offset = parseInt(limitMatch[1]);
      const count = parseInt(limitMatch[2]);
      rows = rows.slice(offset, offset + count);
    } else {
      rows = rows.slice(0, parseInt(limitMatch[1]));
    }
  }

  return { type: 'select', columns: selectedCols, rows };
}

function handleAggregation(query, table, tableName) {
  // Simple COUNT with GROUP BY
  const groupMatch = query.match(/GROUP\s+BY\s+(\w+)/i);

  if (groupMatch) {
    const groupField = groupMatch[1];
    const groupIdx = table.columns.indexOf(groupField);
    if (groupIdx === -1) throw new Error(`Column "${groupField}" not found`);

    // Apply WHERE if present
    let filteredRows = [...table.rows];
    const whereMatch = query.match(/WHERE\s+(.+?)(?:\s+GROUP|\s+ORDER|\s+LIMIT|\s*$)/i);
    if (whereMatch) {
      const cond = whereMatch[1].trim();
      const cm = cond.match(/(\w+)\s*=\s*'([^']*)'/i);
      if (cm) {
        const fi = table.columns.indexOf(cm[1]);
        if (fi >= 0) filteredRows = filteredRows.filter(r => String(r[fi]) === cm[2]);
      }
    }

    const groups = {};
    filteredRows.forEach(r => {
      const key = r[groupIdx];
      groups[key] = (groups[key] || 0) + 1;
    });

    const rows = Object.entries(groups).map(([k, v]) => [k, v]);
    return { type: 'count', columns: [groupField, 'Total'], rows };
  }

  // Simple COUNT
  let count = table.rows.length;
  const whereMatch = query.match(/WHERE\s+(.+?)(?:\s+ORDER|\s+LIMIT|\s*$)/i);
  if (whereMatch) {
    const cond = whereMatch[1].trim();
    const cm = cond.match(/(\w+)\s*=\s*'([^']*)'/i);
    if (cm) {
      const fi = table.columns.indexOf(cm[1]);
      if (fi >= 0) count = table.rows.filter(r => String(r[fi]) === cm[2]).length;
    }
  }

  return { type: 'count', columns: ['Count'], rows: [[count]] };
}

// ── Render Results Table ──────────────────────────────────
function renderTable(container, columns, rows) {
  container.innerHTML = '';
  const table = document.createElement('table');
  table.className = 'results-table';

  const thead = document.createElement('thead');
  thead.innerHTML = '<tr>' + columns.map(c => `<th>${c}</th>`).join('') + '</tr>';
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  rows.forEach(row => {
    tbody.innerHTML += '<tr>' + row.map(cell => `<td>${cell !== null && cell !== undefined ? cell : 'NULL'}</td>`).join('') + '</tr>';
  });
  table.appendChild(tbody);
  container.appendChild(table);
}

// ── Toast ─────────────────────────────────────────────────
function showToast(type, msg) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast ' + type;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
