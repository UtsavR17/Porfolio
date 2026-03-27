/* ============================================
   ERROR REFERENCE — Data & Rendering
   ============================================ */

const ERRORS = [
  // Syntax Errors
  { message: 'Unexpected token ";"', severity: 'high', category: 'Syntax', cause: 'Missing expression before semicolon, often from an empty statement or typo.', solution: 'Check for missing variable names, values or extra semicolons.', fix: '// ❌ Wrong\ninfo ;\n\n// ✅ Correct\ninfo "Hello";' },
  { message: 'Missing ";" at end of statement', severity: 'high', category: 'Syntax', cause: 'Deluge requires semicolons at the end of every statement.', solution: 'Add a semicolon at the end of the line.', fix: '// ❌ Wrong\nname = "Alice"\n\n// ✅ Correct\nname = "Alice";' },
  { message: 'Unterminated string literal', severity: 'high', category: 'Syntax', cause: 'A string was opened with a quote but never closed.', solution: 'Make sure every opening quote has a matching closing quote.', fix: '// ❌ Wrong\nname = "Alice;\n\n// ✅ Correct\nname = "Alice";' },
  { message: 'Unexpected "}"', severity: 'medium', category: 'Syntax', cause: 'Extra closing brace without a matching opening brace.', solution: 'Check that every { has a matching } and vice versa.', fix: '// Count your braces!\nif (x > 0)\n{\n  info x;\n}  // ← this closes the if block' },
  { message: 'Cannot use reserved keyword as variable name', severity: 'medium', category: 'Syntax', cause: 'You used a Deluge reserved word (like "list", "map", "if", "for") as a variable name.', solution: 'Rename the variable to avoid reserved words.', fix: '// ❌ Wrong\nlist = List();\n\n// ✅ Correct\nmyList = List();' },

  // Runtime Errors
  { message: 'Null pointer exception', severity: 'high', category: 'Runtime', cause: 'Trying to call a method or access a property on a null value.', solution: 'Use ifNull() to provide defaults, or check for null before accessing.', fix: '// ❌ Risky\nname = record.get("Name");\ninfo name.toUpperCase();\n\n// ✅ Safe\nname = ifNull(record.get("Name"), "Unknown");\ninfo name.toUpperCase();' },
  { message: 'Index out of range', severity: 'high', category: 'Runtime', cause: 'Accessing a list index that doesn\'t exist (e.g., index 5 in a 3-item list).', solution: 'Check list.size() before accessing by index.', fix: '// ❌ Risky\nitem = myList.get(10);\n\n// ✅ Safe\nif (myList.size() > 10)\n{\n  item = myList.get(10);\n}' },
  { message: 'Type mismatch: cannot convert String to Number', severity: 'medium', category: 'Runtime', cause: 'Trying to use a string value where a number is expected, or vice versa.', solution: 'Use toNumber() or toString() to convert types.', fix: '// ❌ Wrong\nage = "25";\nresult = age + 5;  // String concatenation!\n\n// ✅ Correct\nage = "25".toNumber();\nresult = age + 5;  // 30' },
  { message: 'Division by zero', severity: 'medium', category: 'Runtime', cause: 'Attempting to divide by zero.', solution: 'Check the divisor before performing division.', fix: '// ❌ Risky\nresult = total / count;\n\n// ✅ Safe\nif (count != 0)\n{\n  result = total / count;\n}\nelse\n{\n  result = 0;\n}' },
  { message: 'Key not found in map', severity: 'low', category: 'Runtime', cause: 'Calling map.get("key") with a key that doesn\'t exist in the map.', solution: 'Use map.containsKey("key") to check before accessing.', fix: '// ❌ Risky\nvalue = myMap.get("missing_key");\n\n// ✅ Safe\nif (myMap.containsKey("email"))\n{\n  value = myMap.get("email");\n}' },

  // API Errors
  { message: 'API rate limit exceeded', severity: 'high', category: 'API', cause: 'Too many API calls in a short time. Zoho enforces rate limits per minute/day.', solution: 'Implement delays, batch operations, or use bulk APIs.', fix: '// Use bulk API instead of individual calls\n// ❌ Slow: loop + individual calls\nfor each id in ids\n{\n  zoho.crm.getRecordById("Leads", id);\n}\n\n// ✅ Better: use searchRecords\nresults = zoho.crm.searchRecords("Leads",\n  "(id:in:" + ids.toString() + ")");' },
  { message: 'INVALID_TOKEN / Authentication failed', severity: 'high', category: 'API', cause: 'OAuth token is expired, invalid, or missing required scopes.', solution: 'Refresh the connection token or update API credentials.', fix: '// Check your connection in Zoho\n// Settings > Connections > Refresh token\n\n// Or regenerate via API:\nresponse = invokeurl\n[\n  url: "https://accounts.zoho.com/oauth/v2/token"\n  type: POST\n  body: "grant_type=refresh_token&..."\n];' },
  { message: 'HTTP 404: Resource not found', severity: 'medium', category: 'API', cause: 'The API endpoint URL is wrong or the record/resource doesn\'t exist.', solution: 'Verify the URL, module name, and record ID.', fix: '// ❌ Wrong module name\nzoho.crm.getRecords("Lead");  // Should be "Leads"\n\n// ✅ Correct\nzoho.crm.getRecords("Leads");' },
  { message: 'HTTP 500: Internal server error', severity: 'high', category: 'API', cause: 'The external API server encountered an error.', solution: 'Wrap in try/catch and implement retry logic.', fix: 'retries = 0;\nsuccess = false;\n\nwhile (retries < 3 && !success)\n{\n  try\n  {\n    resp = invokeurl[...];\n    success = true;\n  }\n  catch (e)\n  {\n    retries = retries + 1;\n    info "Retry " + retries;\n  }\n}' },
  { message: 'MANDATORY_NOT_FOUND: required field missing', severity: 'medium', category: 'API', cause: 'A required field was not included in the create/update request.', solution: 'Include all mandatory fields in your data map.', fix: '// ❌ Missing required field\ndata = Map();\ndata.put("Email", "test@test.com");\nzoho.crm.createRecord("Leads", data);\n\n// ✅ Include mandatory "Last_Name"\ndata = Map();\ndata.put("Last_Name", "Smith");\ndata.put("Email", "test@test.com");\nzoho.crm.createRecord("Leads", data);' },

  // Permission Errors
  { message: 'Permission denied: insufficient privileges', severity: 'high', category: 'Permission', cause: 'The user or connection doesn\'t have permission to access the module or perform the action.', solution: 'Check user roles, profiles, and connection scopes.', fix: '// Check connection scopes:\n// ZohoCRM.modules.ALL\n// ZohoCRM.settings.ALL\n\n// Verify in:\n// Setup > Connections > Edit > Scopes' },
  { message: 'Cannot modify a read-only field', severity: 'low', category: 'Permission', cause: 'Attempting to update a field that is system-generated or read-only.', solution: 'Check CRM field settings to see which fields are editable.', fix: '// Read-only fields (cannot update):\n// - id, Created_Time, Modified_Time\n// - Formula fields, Auto-number fields\n\n// Only update writable fields:\ndata = Map();\ndata.put("Last_Name", "Updated");  // ✅ writable\n// data.put("id", "123");  // ❌ read-only' },

  // Catalyst Errors
  { message: 'ZCQL Syntax Error: unexpected token', severity: 'high', category: 'Catalyst', cause: 'Invalid ZCQL query syntax — wrong keyword or missing clause.', solution: 'Check ZCQL syntax: it\'s similar to SQL but has some differences.', fix: '// ❌ Wrong (SQL syntax)\nSELECT * FROM Users LIMIT 10 OFFSET 5;\n\n// ✅ Correct (ZCQL syntax)\nSELECT * FROM Users LIMIT 5, 10;\n// ZCQL uses LIMIT start, count' },
  { message: 'Table not found: "TableName"', severity: 'medium', category: 'Catalyst', cause: 'The table name in the ZCQL query doesn\'t match any table in the Data Store.', solution: 'Verify the table name in Catalyst Console > Data Store.', fix: '// Table names are case-sensitive!\n// ❌ Wrong\nSELECT * FROM users;\n\n// ✅ Correct\nSELECT * FROM Users;' },
  { message: 'Catalyst function timeout (30s exceeded)', severity: 'high', category: 'Catalyst', cause: 'The serverless function took longer than the allowed execution time.', solution: 'Optimize queries, reduce data processing, or use async patterns.', fix: '// Optimize: use pagination\nconst PAGE_SIZE = 100;\nlet offset = 0;\nlet hasMore = true;\n\nwhile (hasMore) {\n  const q = \\`SELECT * FROM BigTable LIMIT ${offset}, ${PAGE_SIZE}\\`;\n  const rows = await zcql.executeZCQLQuery(q);\n  // process rows...\n  hasMore = rows.length === PAGE_SIZE;\n  offset += PAGE_SIZE;\n}' },
  { message: 'Creator: Function execution limit reached', severity: 'medium', category: 'Catalyst', cause: 'The Deluge function exceeded the allowed execution count or time for your plan.', solution: 'Optimize scripts, reduce unnecessary API calls, or upgrade your plan.', fix: '// Optimize: batch operations\n// ❌ N+1 queries\nfor each id in idList\n{\n  record = zoho.crm.getRecordById("Leads", id);\n}\n\n// ✅ Single query\ncriteria = "(id:in:" + idList.toString() + ")";\nrecords = zoho.crm.searchRecords("Leads", criteria);' },
];

const ERROR_CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'Syntax', label: 'Syntax' },
  { key: 'Runtime', label: 'Runtime' },
  { key: 'API', label: 'API' },
  { key: 'Permission', label: 'Permission' },
  { key: 'Catalyst', label: 'Catalyst' },
];

let activeErrorFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderErrorFilters();
  renderErrors();
  document.getElementById('error-search').addEventListener('input', renderErrors);
});

function renderErrorFilters() {
  const container = document.getElementById('error-filters');
  ERROR_CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-tab' + (cat.key === 'all' ? ' active' : '');
    const count = cat.key === 'all' ? ERRORS.length : ERRORS.filter(e => e.category === cat.key).length;
    btn.innerHTML = `${cat.label} <span class="count-badge">${count}</span>`;
    btn.onclick = () => {
      activeErrorFilter = cat.key;
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      renderErrors();
    };
    container.appendChild(btn);
  });
}

function renderErrors() {
  const query = document.getElementById('error-search').value.toLowerCase();
  const list = document.getElementById('error-list');
  list.innerHTML = '';

  const filtered = ERRORS.filter(err => {
    const matchesFilter = activeErrorFilter === 'all' || err.category === activeErrorFilter;
    const matchesSearch = !query ||
      err.message.toLowerCase().includes(query) ||
      err.cause.toLowerCase().includes(query) ||
      err.solution.toLowerCase().includes(query) ||
      err.category.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    list.innerHTML = '<div style="text-align:center;padding:48px;color:var(--text-muted);">No matching errors found.</div>';
    return;
  }

  filtered.forEach(err => {
    const card = document.createElement('div');
    card.className = 'error-card fade-in';
    card.innerHTML = `
      <div class="error-header">
        <span class="error-severity severity-${err.severity}">${err.severity}</span>
        <span class="error-message">${escapeHtml(err.message)}</span>
        <span class="error-category tag-${err.category.toLowerCase()}">${err.category}</span>
      </div>
      <div class="error-cause">${err.cause}</div>
      <div class="error-solution">
        <div class="error-solution-title">✅ Solution</div>
        <p>${err.solution}</p>
      </div>
      <div class="error-fix">${escapeHtml(err.fix)}</div>
    `;
    list.appendChild(card);
  });
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
