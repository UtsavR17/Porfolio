/* ============================================
   CHEAT SHEET — Data & Rendering
   ============================================ */

const CHEAT_DATA = [
  // Syntax Basics
  { title: 'Variable Assignment', tag: 'syntax', tagLabel: 'Syntax', syntax: 'variableName = value;', desc: 'Assign values to variables. No type declaration needed.', example: 'name = "Alice";\nage = 30;\nisActive = true;' },
  { title: 'Info Statement', tag: 'syntax', tagLabel: 'Syntax', syntax: 'info expression;', desc: 'Print output for debugging.', example: 'info "Hello!";\ninfo myVar;\ninfo "Count: " + count;' },
  { title: 'If / Else', tag: 'syntax', tagLabel: 'Syntax', syntax: 'if (condition) { } else { }', desc: 'Conditional branching.', example: 'if (score >= 90)\n{\n  info "A";\n}\nelse if (score >= 80)\n{\n  info "B";\n}\nelse\n{\n  info "C";\n}' },
  { title: 'For Each Loop', tag: 'syntax', tagLabel: 'Syntax', syntax: 'for each item in list { }', desc: 'Iterate over a list.', example: 'names = {"Alice","Bob","Eve"};\nfor each n in names\n{\n  info n;\n}' },
  { title: 'Try / Catch', tag: 'syntax', tagLabel: 'Syntax', syntax: 'try { } catch (e) { }', desc: 'Handle errors gracefully.', example: 'try\n{\n  resp = invokeurl[...];\n}\ncatch (e)\n{\n  info "Error: " + e;\n}' },
  { title: 'Return', tag: 'syntax', tagLabel: 'Syntax', syntax: 'return value;', desc: 'Return a value from a function.', example: 'result = a + b;\nreturn result;' },
  // String Methods
  { title: 'String Length', tag: 'string', tagLabel: 'String', syntax: 'str.length()', desc: 'Returns the number of characters.', example: 'name = "Deluge";\ninfo name.length();  // 6' },
  { title: 'toUpperCase / toLowerCase', tag: 'string', tagLabel: 'String', syntax: 'str.toUpperCase()\nstr.toLowerCase()', desc: 'Convert case.', example: 'info "hello".toUpperCase();  // HELLO\ninfo "WORLD".toLowerCase();  // world' },
  { title: 'Contains', tag: 'string', tagLabel: 'String', syntax: 'str.contains("sub")', desc: 'Check if string contains a substring.', example: 'email = "user@zoho.com";\ninfo email.contains("zoho");  // true' },
  { title: 'Starts/Ends With', tag: 'string', tagLabel: 'String', syntax: 'str.startsWith("pre")\nstr.endsWith("suf")', desc: 'Check prefix or suffix.', example: 'url = "https://zoho.com";\ninfo url.startsWith("https");  // true' },
  { title: 'Replace All', tag: 'string', tagLabel: 'String', syntax: 'str.replaceAll("old","new")', desc: 'Replace all occurrences.', example: 'msg = "hello world";\ninfo msg.replaceAll("world","Zoho");\n// hello Zoho' },
  { title: 'Substring', tag: 'string', tagLabel: 'String', syntax: 'str.subString(start, end)', desc: 'Extract part of a string.', example: 'text = "Deluge Script";\ninfo text.subString(0, 6);  // Deluge' },
  { title: 'Split', tag: 'string', tagLabel: 'String', syntax: 'str.toList("delimiter")', desc: 'Split string into a list.', example: 'csv = "a,b,c,d";\nparts = csv.toList(",");\ninfo parts;  // ["a","b","c","d"]' },
  // List Methods
  { title: 'Create List', tag: 'list', tagLabel: 'List', syntax: 'myList = List();\nmyList = {val1, val2};', desc: 'Create a new list.', example: 'fruits = List();\nfruits.add("Apple");\n// or\nfruits = {"Apple","Banana"};' },
  { title: 'Add / Remove', tag: 'list', tagLabel: 'List', syntax: 'list.add(item)\nlist.remove(item)', desc: 'Add or remove elements.', example: 'colors = List();\ncolors.add("Red");\ncolors.add("Blue");\ncolors.remove("Red");' },
  { title: 'Get / Size', tag: 'list', tagLabel: 'List', syntax: 'list.get(index)\nlist.size()', desc: 'Access by index, get count.', example: 'items = {"A","B","C"};\ninfo items.get(0);  // A\ninfo items.size();  // 3' },
  { title: 'Contains (List)', tag: 'list', tagLabel: 'List', syntax: 'list.contains(item)', desc: 'Check if list has an item.', example: 'nums = {1,2,3,4,5};\ninfo nums.contains(3);  // true' },
  { title: 'Sort', tag: 'list', tagLabel: 'List', syntax: 'list.sort(true)  // asc\nlist.sort(false) // desc', desc: 'Sort a list.', example: 'nums = {3,1,4,1,5};\nnums.sort(true);\ninfo nums;  // [1,1,3,4,5]' },
  // Map Methods
  { title: 'Create Map', tag: 'map', tagLabel: 'Map', syntax: 'myMap = Map();\nmyMap.put("key", "value");', desc: 'Create and populate a map.', example: 'person = Map();\nperson.put("name","Alice");\nperson.put("age",30);' },
  { title: 'Get / Remove', tag: 'map', tagLabel: 'Map', syntax: 'map.get("key")\nmap.remove("key")', desc: 'Access or remove entries.', example: 'info person.get("name");  // Alice\nperson.remove("age");' },
  { title: 'Keys / Values', tag: 'map', tagLabel: 'Map', syntax: 'map.keys()\nmap.values()', desc: 'Get all keys or values.', example: 'allKeys = person.keys();\nfor each k in allKeys\n{\n  info k + ": " + person.get(k);\n}' },
  // Date Functions
  { title: 'Current Date/Time', tag: 'date', tagLabel: 'Date', syntax: 'now\nzoho.currentdate\nzoho.currenttime', desc: 'Get current date and time.', example: 'today = zoho.currentdate;\ncurrentTime = now;\ninfo today;\ninfo currentTime;' },
  { title: 'Date Formatting', tag: 'date', tagLabel: 'Date', syntax: 'date.toString("dd-MM-yyyy")', desc: 'Format a date to string.', example: 'today = zoho.currentdate;\nformatted = today.toString("dd/MM/yyyy");\ninfo formatted;  // 27/03/2026' },
  { title: 'Add / Subtract Days', tag: 'date', tagLabel: 'Date', syntax: 'date.addDay(n)\ndate.subDay(n)', desc: 'Date arithmetic.', example: 'today = zoho.currentdate;\nnextWeek = today.addDay(7);\nyesterday = today.subDay(1);' },
  { title: 'Day Between', tag: 'date', tagLabel: 'Date', syntax: 'daysBetween(date1, date2)', desc: 'Calculate days between two dates.', example: 'start = "01-Jan-2026";\nend = "31-Mar-2026";\ninfo daysBetween(start, end);  // 89' },
  // CRM API
  { title: 'Get Records', tag: 'crm', tagLabel: 'CRM', syntax: 'zoho.crm.getRecords("Module")', desc: 'Fetch records from a CRM module.', example: 'leads = zoho.crm.getRecords("Leads");\nfor each lead in leads\n{\n  info lead.get("Last_Name");\n}' },
  { title: 'Get Record By ID', tag: 'crm', tagLabel: 'CRM', syntax: 'zoho.crm.getRecordById("Module", id)', desc: 'Fetch a single record.', example: 'contact = zoho.crm.getRecordById("Contacts", 12345);\ninfo contact.get("Email");' },
  { title: 'Create Record', tag: 'crm', tagLabel: 'CRM', syntax: 'zoho.crm.createRecord("Module", dataMap)', desc: 'Insert a new record.', example: 'data = Map();\ndata.put("Last_Name","Smith");\ndata.put("Email","smith@zoho.com");\nresp = zoho.crm.createRecord("Leads",data);' },
  { title: 'Update Record', tag: 'crm', tagLabel: 'CRM', syntax: 'zoho.crm.updateRecord("Module", id, map)', desc: 'Update an existing record.', example: 'upd = Map();\nupd.put("Phone","555-1234");\nzoho.crm.updateRecord("Contacts",12345,upd);' },
  { title: 'Search Records', tag: 'crm', tagLabel: 'CRM', syntax: 'zoho.crm.searchRecords("Module","criteria")', desc: 'Search with criteria.', example: 'results = zoho.crm.searchRecords("Leads",\n  "(Lead_Status:equals:Hot)");\ninfo results.size();' },
  { title: 'invokeurl (API Call)', tag: 'crm', tagLabel: 'API', syntax: 'invokeurl [ url: type: headers: body: ]', desc: 'Make external HTTP requests.', example: 'resp = invokeurl\n[\n  url: "https://api.example.com"\n  type: GET\n  headers: {"Auth":"Bearer tok"}\n];\ninfo resp;' },
  // Creator
  { title: 'input. fields', tag: 'creator', tagLabel: 'Creator', syntax: 'input.Field_Name', desc: 'Access form field values in workflows.', example: '// On Submit workflow\nname = input.Name;\nemail = input.Email;\ninfo name + " — " + email;' },
  { title: 'Add Record (Creator)', tag: 'creator', tagLabel: 'Creator', syntax: 'insert into Form [Field = val]', desc: 'Insert a record into a form.', example: 'insert into Contacts\n[\n  Name = "Alice"\n  Email = "alice@zoho.com"\n  Added_Time = zoho.currentdate\n];' },
  { title: 'Fetch Records (Creator)', tag: 'creator', tagLabel: 'Creator', syntax: 'Form [criteria]', desc: 'Query records from a form.', example: 'orders = Orders[Status == "Open"];\nfor each o in orders\n{\n  info o.Order_ID;\n}' },
  // Catalyst
  { title: 'ZCQL SELECT', tag: 'catalyst', tagLabel: 'Catalyst', syntax: 'SELECT * FROM TableName WHERE ...', desc: 'Query Catalyst Data Store tables.', example: 'SELECT Name, Email\nFROM Users\nWHERE Status = \'active\'\nORDER BY Name ASC\nLIMIT 10' },
  { title: 'ZCQL INSERT', tag: 'catalyst', tagLabel: 'Catalyst', syntax: 'INSERT INTO Table (cols) VALUES (vals)', desc: 'Insert rows into Data Store.', example: 'INSERT INTO Products\n(Name, Price, Category)\nVALUES\n(\'Widget\', 29.99, \'Tools\')' },
  { title: 'Catalyst Cache', tag: 'catalyst', tagLabel: 'Catalyst', syntax: 'zcql.executeQuery(query)', desc: 'Execute ZCQL from serverless functions.', example: '// Node.js Catalyst function\nconst zcql = catalyst.zcql();\nconst q = "SELECT * FROM Users";\nconst rows = await zcql.executeZCQLQuery(q);' },
  // MCP
  { title: 'MCP Tool Definition', tag: 'mcp', tagLabel: 'MCP', syntax: '{ name, description, inputSchema }', desc: 'Define an MCP tool for AI agents.', example: '{\n  "name": "get_lead",\n  "description": "Fetch a CRM lead",\n  "inputSchema": {\n    "type": "object",\n    "properties": {\n      "lead_id": { "type": "string" }\n    }\n  }\n}' },
  { title: 'MCP Resource', tag: 'mcp', tagLabel: 'MCP', syntax: '{ uri, name, mimeType }', desc: 'Expose data as an MCP resource.', example: '{\n  "uri": "zoho://crm/leads",\n  "name": "CRM Leads",\n  "mimeType": "application/json"\n}' },
];

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'syntax', label: 'Syntax' },
  { key: 'string', label: 'Strings' },
  { key: 'list', label: 'Lists' },
  { key: 'map', label: 'Maps' },
  { key: 'date', label: 'Dates' },
  { key: 'crm', label: 'CRM / API' },
  { key: 'creator', label: 'Creator' },
  { key: 'catalyst', label: 'Catalyst' },
  { key: 'mcp', label: 'MCP' },
];

let activeFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderFilters();
  renderCards();
  document.getElementById('cheat-search').addEventListener('input', renderCards);
});

function renderFilters() {
  const container = document.getElementById('cheat-filters');
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-tab' + (cat.key === 'all' ? ' active' : '');
    const count = cat.key === 'all' ? CHEAT_DATA.length : CHEAT_DATA.filter(c => c.tag === cat.key).length;
    btn.innerHTML = `${cat.label} <span class="count-badge">${count}</span>`;
    btn.onclick = () => {
      activeFilter = cat.key;
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      renderCards();
    };
    container.appendChild(btn);
  });
}

function renderCards() {
  const query = document.getElementById('cheat-search').value.toLowerCase();
  const grid = document.getElementById('cheat-grid');
  grid.innerHTML = '';

  const filtered = CHEAT_DATA.filter(card => {
    const matchesFilter = activeFilter === 'all' || card.tag === activeFilter;
    const matchesSearch = !query ||
      card.title.toLowerCase().includes(query) ||
      card.desc.toLowerCase().includes(query) ||
      card.syntax.toLowerCase().includes(query) ||
      card.example.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:48px;color:var(--text-muted);">No matching cheat sheet entries found.</div>';
    return;
  }

  filtered.forEach(card => {
    const el = document.createElement('div');
    el.className = 'cheat-card fade-in';
    el.innerHTML = `
      <div class="card-header">
        <span class="card-title">${card.title}</span>
        <span class="card-tag tag-${card.tag}">${card.tagLabel}</span>
      </div>
      <div class="card-syntax">${escapeHtml(card.syntax)}</div>
      <div class="card-desc">${card.desc}</div>
      <div class="card-example"><button class="copy-btn" onclick="copyCode(this, \`${escapeForAttr(card.example)}\`)">Copy</button>${escapeHtml(card.example)}</div>
    `;
    grid.appendChild(el);
  });
}

function copyCode(btn, code) {
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = '✓ Copied';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 2000);
  });
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function escapeForAttr(str) {
  return str.replace(/\\/g,'\\\\').replace(/`/g,'\\`').replace(/\$/g,'\\$');
}
