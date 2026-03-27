/* ============================================
   DELUGE PRACTICE — Tutorials Engine
   ============================================ */

// ── Tutorial Data ──────────────────────────────────────────
const TUTORIALS = [
  {
    category: "Getting Started",
    icon: "🚀",
    lessons: [
      {
        id: "hello-world",
        title: "Hello World",
        badge: "Lesson 1",
        description: "Write your first Deluge script. Deluge uses <code>info</code> to print output, similar to <code>console.log</code> in JavaScript or <code>print</code> in Python.",
        instructions: [
          {
            heading: "📝 Task",
            text: 'Use the <code>info</code> statement to print <code>"Hello, Zoho!"</code> to the output.'
          }
        ],
        example: 'info "Hello, World!";',
        hint: "The info statement prints text to the output. Don't forget the semicolon!",
        starterCode: '// Write your first Deluge script\n\n',
        solution: 'info "Hello, Zoho!";',
        validate: (code) => code.includes('info') && code.includes('Hello, Zoho!')
      },
      {
        id: "variables",
        title: "Variables & Data Types",
        badge: "Lesson 2",
        description: "Learn how to declare variables in Deluge. Variables are dynamically typed — you don't need to specify a type.",
        instructions: [
          {
            heading: "📝 Task",
            text: 'Create a variable called <code>name</code> with your name, a variable <code>age</code> with a number, and print both using <code>info</code>.'
          }
        ],
        example: 'myVar = "Hello";\nmyNum = 42;\ninfo myVar;\ninfo myNum;',
        hint: "Deluge variables don't need var, let, or const. Just assign directly: variableName = value;",
        starterCode: '// Declare variables and print them\nname = "";\nage = 0;\n\n// Print the variables below\n',
        solution: 'name = "John";\nage = 25;\ninfo name;\ninfo age;',
        validate: (code) => code.includes('name') && code.includes('age') && (code.match(/info/g) || []).length >= 2
      },
      {
        id: "comments",
        title: "Comments",
        badge: "Lesson 3",
        description: "Add comments to document your code. Deluge supports single-line comments with <code>//</code> and multi-line with <code>/* */</code>.",
        instructions: [
          {
            heading: "📝 Task",
            text: 'Add a single-line comment describing what the code does, and add a multi-line comment block at the top.'
          }
        ],
        example: '// This is a single-line comment\n\n/*\n  This is a\n  multi-line comment\n*/\n\ninfo "Comments are useful!";',
        hint: "Use // for single-line and /* */ for multi-line comments, just like Java or JavaScript.",
        starterCode: '// Add your comments here\n\ninfo "Learning Deluge!";\n',
        solution: '/*\n  My first Deluge script\n  with comments\n*/\n\n// Print a message\ninfo "Learning Deluge!";',
        validate: (code) => code.includes('//') && code.includes('/*') && code.includes('*/')
      }
    ]
  },
  {
    category: "Data Structures",
    icon: "📦",
    lessons: [
      {
        id: "strings",
        title: "String Operations",
        badge: "Lesson 4",
        description: "Strings in Deluge support many built-in functions like <code>length()</code>, <code>toUpperCase()</code>, <code>contains()</code>, and string concatenation with <code>+</code>.",
        instructions: [
          {
            heading: "📝 Task",
            text: 'Create a string variable <code>greeting</code> with value <code>"hello deluge"</code>. Convert it to uppercase, get its length, and print both.'
          }
        ],
        example: 'text = "Hello World";\ninfo text.length();\ninfo text.toUpperCase();\ninfo text.contains("World");',
        hint: "Use .toUpperCase() to convert and .length() to get the length. Chain them on the variable.",
        starterCode: '// String operations\ngreeting = "hello deluge";\n\n// Convert to uppercase and store in a variable\n\n// Get the length\n\n// Print both\n',
        solution: 'greeting = "hello deluge";\nupper = greeting.toUpperCase();\nlen = greeting.length();\ninfo upper;\ninfo len;',
        validate: (code) => code.includes('toUpperCase') && code.includes('length') && code.includes('info')
      },
      {
        id: "lists",
        title: "Lists",
        badge: "Lesson 5",
        description: "Lists (arrays) in Deluge hold ordered collections. Create them with <code>List()</code> or <code>{}</code> notation. Use <code>add()</code>, <code>remove()</code>, <code>get()</code>, and <code>size()</code>.",
        instructions: [
          {
            heading: "📝 Task",
            text: 'Create a list of 3 fruits, add a 4th fruit using <code>.add()</code>, then print the list size and the list itself.'
          }
        ],
        example: 'myList = List();\nmyList.add("Apple");\nmyList.add("Banana");\ninfo myList;\ninfo myList.size();',
        hint: "You can also create lists with: myList = {\"item1\", \"item2\"}; then use .add() to append.",
        starterCode: '// Create a list of fruits\nfruits = List();\n\n// Add 3 fruits\n\n// Add a 4th fruit\n\n// Print size and list\n',
        solution: 'fruits = List();\nfruits.add("Apple");\nfruits.add("Banana");\nfruits.add("Cherry");\nfruits.add("Date");\ninfo fruits.size();\ninfo fruits;',
        validate: (code) => (code.match(/\.add\(/g) || []).length >= 4 && code.includes('size()')
      },
      {
        id: "maps",
        title: "Maps (Key-Value Pairs)",
        badge: "Lesson 6",
        description: "Maps store key-value pairs. Create them with <code>Map()</code> and access values using <code>.get()</code> or bracket notation. Use <code>.put()</code> to add entries.",
        instructions: [
          {
            heading: "📝 Task",
            text: 'Create a map representing a contact with keys <code>name</code>, <code>email</code>, and <code>phone</code>. Print the contact\'s name.'
          }
        ],
        example: 'person = Map();\nperson.put("name", "Alice");\nperson.put("age", 30);\ninfo person.get("name");',
        hint: "Use Map() to create, .put(key, value) to add entries, and .get(key) to retrieve values.",
        starterCode: '// Create a contact map\ncontact = Map();\n\n// Add name, email, and phone\n\n// Print the name\n',
        solution: 'contact = Map();\ncontact.put("name", "John Doe");\ncontact.put("email", "john@example.com");\ncontact.put("phone", "555-0123");\ninfo contact.get("name");',
        validate: (code) => (code.match(/\.put\(/g) || []).length >= 3 && code.includes('.get(')
      }
    ]
  },
  {
    category: "Control Flow",
    icon: "🔀",
    lessons: [
      {
        id: "if-else",
        title: "If / Else Conditions",
        badge: "Lesson 7",
        description: "Deluge uses <code>if</code> / <code>else if</code> / <code>else</code> for conditional logic. Conditions are wrapped in parentheses.",
        instructions: [
          {
            heading: "📝 Task",
            text: 'Create a variable <code>score</code> set to <code>85</code>. Write an if/else block: if score >= 90 print "A", else if >= 80 print "B", else print "C".'
          }
        ],
        example: 'x = 10;\nif (x > 5)\n{\n  info "Greater than 5";\n}\nelse\n{\n  info "5 or less";\n}',
        hint: "Use curly braces {} for code blocks. Deluge conditions look like: if (condition) { ... } else { ... }",
        starterCode: '// Grade calculator\nscore = 85;\n\n// Write your if/else conditions below\n',
        solution: 'score = 85;\nif (score >= 90)\n{\n  info "A";\n}\nelse if (score >= 80)\n{\n  info "B";\n}\nelse\n{\n  info "C";\n}',
        validate: (code) => code.includes('if') && code.includes('else') && code.includes('score')
      },
      {
        id: "for-loop",
        title: "For Each Loops",
        badge: "Lesson 8",
        description: "Deluge uses <code>for each</code> to iterate over lists. The syntax is: <code>for each item in listVariable</code>.",
        instructions: [
          {
            heading: "📝 Task",
            text: 'Create a list of 4 colors. Use a <code>for each</code> loop to print each color.'
          }
        ],
        example: 'numbers = {1, 2, 3, 4, 5};\nfor each num in numbers\n{\n  info num;\n}',
        hint: "Syntax: for each variableName in listName { ... } — the variable takes each list item per iteration.",
        starterCode: '// Create a list of colors\ncolors = List();\n\n// Add 4 colors\n\n// Loop through and print each\n',
        solution: 'colors = List();\ncolors.add("Red");\ncolors.add("Blue");\ncolors.add("Green");\ncolors.add("Yellow");\nfor each color in colors\n{\n  info color;\n}',
        validate: (code) => code.includes('for each') && code.includes('in') && code.includes('info')
      }
    ]
  },
  {
    category: "Functions",
    icon: "⚡",
    lessons: [
      {
        id: "custom-functions",
        title: "Custom Functions",
        badge: "Lesson 9",
        description: "Define reusable blocks of code with custom functions. Deluge functions are typically created in Zoho's script editor but we'll practice the pattern here.",
        instructions: [
          {
            heading: "📝 Task",
            text: 'Write a function-style block that takes two numbers, adds them, and prints the result using variables <code>a</code>, <code>b</code>, and <code>result</code>.'
          }
        ],
        example: '// Function-style pattern\na = 10;\nb = 20;\nresult = a + b;\ninfo result;\nreturn result;',
        hint: "In Deluge, functions in Zoho Creator/CRM use input variables. Practice: set a and b, compute result = a + b, info and return it.",
        starterCode: '// Add two numbers\na = 5;\nb = 10;\n\n// Calculate the result\n\n// Print and return\n',
        solution: 'a = 5;\nb = 10;\nresult = a + b;\ninfo result;\nreturn result;',
        validate: (code) => code.includes('result') && (code.includes('+') || code.includes('add')) && code.includes('return')
      },
      {
        id: "built-in-functions",
        title: "Built-in Functions",
        badge: "Lesson 10",
        description: "Deluge has many built-in functions: <code>now</code>, <code>zoho.currentdate</code>, <code>toNumber()</code>, <code>toString()</code>, <code>ifNull()</code>, and more.",
        instructions: [
          {
            heading: "📝 Task",
            text: 'Use <code>now</code> to get the current datetime, <code>ifNull()</code> to provide a default value for a null variable, and <code>toString()</code> to convert a number.'
          }
        ],
        example: 'currentTime = now;\ninfo currentTime;\n\nval = ifNull(nullVar, "Default Value");\ninfo val;\n\nnumStr = toString(42);\ninfo numStr;',
        hint: "now returns the current date/time. ifNull(value, default) returns default if value is null. toString() converts to string.",
        starterCode: '// Practice built-in functions\n\n// Get current date/time\n\n// Use ifNull for a safe default\n\n// Convert number to string\n',
        solution: 'currentTime = now;\ninfo currentTime;\n\nsafeName = ifNull(userName, "Guest");\ninfo safeName;\n\nageStr = toString(25);\ninfo "Age: " + ageStr;',
        validate: (code) => code.includes('now') && code.includes('ifNull') && code.includes('toString')
      }
    ]
  },
  {
    category: "Zoho CRM Operations",
    icon: "🏢",
    lessons: [
      {
        id: "fetch-records",
        title: "Fetching Records",
        badge: "Lesson 11",
        description: "Use <code>zoho.crm.getRecords()</code> and <code>zoho.crm.getRecordById()</code> to retrieve data from Zoho CRM modules like Leads, Contacts, and Deals.",
        instructions: [
          {
            heading: "📝 Task",
            text: 'Write the Deluge code to fetch records from the "Contacts" module and fetch a specific contact by ID <code>123456</code>. Print the response.'
          }
        ],
        example: 'response = zoho.crm.getRecords("Leads");\ninfo response;\n\nsingleLead = zoho.crm.getRecordById("Leads", 789012);\ninfo singleLead;',
        hint: 'Use zoho.crm.getRecords("ModuleName") and zoho.crm.getRecordById("ModuleName", recordId).',
        starterCode: '// Fetch all contacts\n\n// Fetch a specific contact by ID\n\n// Print the results\n',
        solution: 'contacts = zoho.crm.getRecords("Contacts");\ninfo contacts;\n\ncontact = zoho.crm.getRecordById("Contacts", 123456);\ninfo contact;',
        validate: (code) => code.includes('zoho.crm.getRecord') && code.includes('Contacts')
      },
      {
        id: "create-record",
        title: "Creating Records",
        badge: "Lesson 12",
        description: "Use <code>zoho.crm.createRecord()</code> to insert new records. Pass the module name and a map of field values.",
        instructions: [
          {
            heading: "📝 Task",
            text: 'Create a new Lead in Zoho CRM with fields: <code>Last_Name</code>, <code>Email</code>, and <code>Company</code>.'
          }
        ],
        example: 'dataMap = Map();\ndataMap.put("Last_Name", "Smith");\ndataMap.put("Email", "smith@example.com");\n\nresponse = zoho.crm.createRecord("Leads", dataMap);\ninfo response;',
        hint: "Create a Map with field names as keys, then pass it to zoho.crm.createRecord() along with the module name.",
        starterCode: '// Create a new Lead\nleadData = Map();\n\n// Add field values\n\n// Create the record\n\n// Print the response\n',
        solution: 'leadData = Map();\nleadData.put("Last_Name", "Johnson");\nleadData.put("Email", "johnson@example.com");\nleadData.put("Company", "Acme Corp");\n\nresponse = zoho.crm.createRecord("Leads", leadData);\ninfo response;',
        validate: (code) => code.includes('zoho.crm.createRecord') && code.includes('.put(')
      },
      {
        id: "update-record",
        title: "Updating Records",
        badge: "Lesson 13",
        description: "Use <code>zoho.crm.updateRecord()</code> to modify existing records. You need the module name, record ID, and a map of updated fields.",
        instructions: [
          {
            heading: "📝 Task",
            text: 'Update a Contact record (ID: <code>456789</code>) to change the <code>Phone</code> and <code>Email</code> fields.'
          }
        ],
        example: 'updateMap = Map();\nupdateMap.put("Phone", "555-9999");\n\nresponse = zoho.crm.updateRecord("Contacts", 111222, updateMap);\ninfo response;',
        hint: "Similar to createRecord, but you also pass the record ID as the second argument.",
        starterCode: '// Update a contact record\nupdateData = Map();\n\n// Set new field values\n\n// Update the record (ID: 456789)\n\n// Print the response\n',
        solution: 'updateData = Map();\nupdateData.put("Phone", "555-1234");\nupdateData.put("Email", "updated@example.com");\n\nresponse = zoho.crm.updateRecord("Contacts", 456789, updateData);\ninfo response;',
        validate: (code) => code.includes('zoho.crm.updateRecord') && code.includes('456789')
      }
    ]
  },
  {
    category: "API Integration",
    icon: "🌐",
    lessons: [
      {
        id: "api-calls",
        title: "HTTP API Calls",
        badge: "Lesson 14",
        description: "Deluge can make HTTP requests using <code>invokeurl</code>. Specify the URL, method (GET/POST), headers, and body.",
        instructions: [
          {
            heading: "📝 Task",
            text: 'Make a GET request to <code>https://api.example.com/users</code> with a header <code>Authorization: Bearer token123</code>. Print the response.'
          }
        ],
        example: 'response = invokeurl\n[\n  url: "https://api.example.com/data"\n  type: GET\n];\ninfo response;',
        hint: "invokeurl uses a special bracket syntax. Add headers: with a map of header key-value pairs.",
        starterCode: '// Make an API call\n\n// Set up headers\n\n// Make the GET request\n\n// Print the response\n',
        solution: 'headerMap = Map();\nheaderMap.put("Authorization", "Bearer token123");\n\nresponse = invokeurl\n[\n  url: "https://api.example.com/users"\n  type: GET\n  headers: headerMap\n];\ninfo response;',
        validate: (code) => code.includes('invokeurl') && code.includes('url:') && code.includes('type:')
      },
      {
        id: "send-email",
        title: "Sending Emails",
        badge: "Lesson 15",
        description: "Use <code>sendmail</code> to send emails from Deluge. Specify the recipient, subject, and message body.",
        instructions: [
          {
            heading: "📝 Task",
            text: 'Send an email to <code>user@example.com</code> with subject <code>"Welcome"</code> and a greeting in the body.'
          }
        ],
        example: 'sendmail\n[\n  from: zoho.adminuserid\n  to: "test@example.com"\n  subject: "Test Email"\n  message: "This is a test email from Deluge!"\n];',
        hint: "sendmail uses bracket syntax similar to invokeurl. Required fields: from, to, subject, message.",
        starterCode: '// Send a welcome email\n\n',
        solution: 'sendmail\n[\n  from: zoho.adminuserid\n  to: "user@example.com"\n  subject: "Welcome"\n  message: "Welcome to our platform! We are glad to have you."\n];',
        validate: (code) => code.includes('sendmail') && code.includes('to:') && code.includes('subject:')
      }
    ]
  }
];

// ── State ──────────────────────────────────────────────────
let currentLesson = null;
let editor = null;
let completedLessons = JSON.parse(localStorage.getItem('deluge-completed') || '[]');

// ── Initialize ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initEditor();
  renderSidebar();
  loadLesson(TUTORIALS[0].lessons[0]);
  bindEvents();
});

// ── CodeMirror Setup ───────────────────────────────────────
function initEditor() {
  editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
    mode: 'text/x-java',
    theme: 'material-darker',
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 2,
    tabSize: 2,
    indentWithTabs: false,
    lineWrapping: true,
    extraKeys: {
      'Ctrl-Enter': () => runCode(),
      'Cmd-Enter': () => runCode()
    }
  });
}

// ── Sidebar ────────────────────────────────────────────────
function renderSidebar() {
  const container = document.getElementById('sidebar-content');
  container.innerHTML = '';

  TUTORIALS.forEach((cat, catIdx) => {
    const group = document.createElement('div');
    group.className = 'sidebar-group';

    const label = document.createElement('div');
    label.className = 'sidebar-group-label' + (catIdx === 0 ? ' expanded' : '');
    label.innerHTML = `
      <span class="arrow">▶</span>
      <span class="group-icon">${cat.icon}</span>
      ${cat.category}
    `;
    label.onclick = () => {
      label.classList.toggle('expanded');
      const items = group.querySelector('.sidebar-items');
      items.classList.toggle('expanded');
    };

    const items = document.createElement('ul');
    items.className = 'sidebar-items' + (catIdx === 0 ? ' expanded' : '');

    cat.lessons.forEach((lesson, idx) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.className = completedLessons.includes(lesson.id) ? 'completed' : '';
      a.innerHTML = `
        <span class="lesson-number">${String(idx + 1).padStart(2, '0')}</span>
        ${lesson.title}
        <span class="check">✓</span>
      `;
      a.onclick = (e) => {
        e.preventDefault();
        loadLesson(lesson);
        // Update active state
        document.querySelectorAll('.sidebar-items a').forEach(el => el.classList.remove('active'));
        a.classList.add('active');
      };
      li.appendChild(a);
      items.appendChild(li);
    });

    group.appendChild(label);
    group.appendChild(items);
    container.appendChild(group);
  });

  // Activate first lesson link
  const firstLink = container.querySelector('.sidebar-items a');
  if (firstLink) firstLink.classList.add('active');
}

// ── Load Lesson ────────────────────────────────────────────
function loadLesson(lesson) {
  currentLesson = lesson;

  // Update header
  document.getElementById('lesson-title').innerHTML = `
    <span class="lesson-badge">${lesson.badge}</span>
    ${lesson.title}
  `;
  document.getElementById('lesson-description').innerHTML = lesson.description;

  // Build content
  const content = document.getElementById('lesson-content');
  content.innerHTML = '';

  // Instructions
  lesson.instructions.forEach(instr => {
    const block = document.createElement('div');
    block.className = 'instruction-block fade-in';
    block.innerHTML = `
      <h3>${instr.heading}</h3>
      <p>${instr.text}</p>
    `;
    content.appendChild(block);
  });

  // Example code
  if (lesson.example) {
    const pre = document.createElement('pre');
    pre.className = 'example-code fade-in';
    pre.textContent = lesson.example;
    content.appendChild(pre);
  }

  // Hint
  if (lesson.hint) {
    const hint = document.createElement('div');
    hint.className = 'hint-box fade-in';
    hint.innerHTML = `
      <div class="hint-title">💡 Hint</div>
      <p>${lesson.hint}</p>
    `;
    content.appendChild(hint);
  }

  // Set editor code
  editor.setValue(lesson.starterCode);
  editor.focus();

  // Clear output
  clearOutput();
}

// ── Run Code (Simulated) ──────────────────────────────────
function runCode() {
  const code = editor.getValue();
  clearOutput();

  const statusEl = document.getElementById('output-status');
  const outputEl = document.getElementById('output-content');

  addOutputLine('info', `⏳ Running script...`);

  setTimeout(() => {
    try {
      const results = simulateDeluge(code);
      results.forEach(r => addOutputLine(r.type, r.text));

      statusEl.textContent = '✓ Executed successfully';
      statusEl.className = 'output-status success';
    } catch (err) {
      addOutputLine('error', `❌ Error: ${err.message}`);
      statusEl.textContent = '✗ Execution failed';
      statusEl.className = 'output-status error';
    }
  }, 400);
}

// ── Simulate Deluge Execution ─────────────────────────────
function simulateDeluge(code) {
  const lines = code.split('\n');
  const output = [];
  const vars = {};

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // Skip empty lines and comments
    if (!line || line.startsWith('//') || line.startsWith('/*') || line.startsWith('*')) continue;

    // Handle info statements
    const infoMatch = line.match(/^info\s+(.+);?\s*$/);
    if (infoMatch) {
      let expr = infoMatch[1].replace(/;$/, '').trim();
      let val = evaluateExpression(expr, vars);
      output.push({ type: 'success', text: `>> ${val}` });
      continue;
    }

    // Handle variable assignment
    const assignMatch = line.match(/^(\w+)\s*=\s*(.+);?\s*$/);
    if (assignMatch && !line.startsWith('if') && !line.startsWith('for') && !line.startsWith('else')) {
      const varName = assignMatch[1];
      let expr = assignMatch[2].replace(/;$/, '').trim();
      vars[varName] = evaluateExpression(expr, vars);
      continue;
    }

    // Handle return statements
    const returnMatch = line.match(/^return\s+(.+);?\s*$/);
    if (returnMatch) {
      let expr = returnMatch[1].replace(/;$/, '').trim();
      let val = evaluateExpression(expr, vars);
      output.push({ type: 'info', text: `⟵ Returned: ${val}` });
      continue;
    }

    // Handle method calls (add, put, etc.)
    const methodMatch = line.match(/^(\w+)\.(add|put|remove)\((.+)\);?\s*$/);
    if (methodMatch) {
      const varName = methodMatch[1];
      const method = methodMatch[2];
      if (!vars[varName]) {
        if (method === 'put') vars[varName] = {};
        else vars[varName] = [];
      }
      const args = methodMatch[3].replace(/;$/, '').trim();

      if (method === 'add') {
        if (Array.isArray(vars[varName])) {
          vars[varName].push(cleanStringValue(args));
        }
      } else if (method === 'put') {
        const parts = args.split(',').map(s => s.trim());
        if (parts.length >= 2) {
          const key = cleanStringValue(parts[0]);
          const val = cleanStringValue(parts[1]);
          if (typeof vars[varName] === 'object') {
            vars[varName][key] = val;
          }
        }
      }
      continue;
    }

    // Handle List() / Map() creation
    const createMatch = line.match(/^(\w+)\s*=\s*(List|Map)\(\)\s*;?\s*$/);
    if (createMatch) {
      const varName = createMatch[1];
      vars[varName] = createMatch[2] === 'List' ? [] : {};
      continue;
    }

    // Handle zoho.crm calls (simulated)
    if (line.includes('zoho.crm.')) {
      const crmMatch = line.match(/(\w+)\s*=\s*zoho\.crm\.(\w+)\((.+)\);?\s*$/);
      if (crmMatch) {
        const varName = crmMatch[1];
        const method = crmMatch[2];
        vars[varName] = `{simulated ${method} response}`;
        output.push({ type: 'info', text: `📡 API Call: zoho.crm.${method}() — simulated` });
      }
      continue;
    }

    // Handle invokeurl (simulated)
    if (line.includes('invokeurl')) {
      output.push({ type: 'info', text: '🌐 HTTP Request — simulated' });
      continue;
    }

    // Handle sendmail (simulated)
    if (line.includes('sendmail')) {
      output.push({ type: 'info', text: '📧 Email sent — simulated' });
      continue;
    }

    // Handle now
    if (line.match(/(\w+)\s*=\s*now\s*;?\s*$/)) {
      const nMatch = line.match(/(\w+)\s*=\s*now/);
      if (nMatch) vars[nMatch[1]] = new Date().toISOString();
      continue;
    }
  }

  if (output.length === 0) {
    output.push({ type: 'info', text: 'Script executed with no output. Use "info" to print values.' });
  }

  return output;
}

function evaluateExpression(expr, vars) {
  // String concatenation
  if (expr.includes('+')) {
    const parts = expr.split('+').map(p => p.trim());
    return parts.map(p => {
      if (p.startsWith('"') && p.endsWith('"')) return p.slice(1, -1);
      if (vars[p] !== undefined) {
        if (Array.isArray(vars[p])) return JSON.stringify(vars[p]);
        if (typeof vars[p] === 'object') return JSON.stringify(vars[p]);
        return String(vars[p]);
      }
      if (!isNaN(p)) return p;
      return p;
    }).join('');
  }

  // String literal
  if (expr.startsWith('"') && expr.endsWith('"')) return expr.slice(1, -1);

  // Method calls on variables
  const methodCall = expr.match(/^(\w+)\.(toUpperCase|toLowerCase|length|size|get|toString)\(([^)]*)\)$/);
  if (methodCall) {
    const varName = methodCall[1];
    const method = methodCall[2];
    const arg = methodCall[3] ? cleanStringValue(methodCall[3]) : null;
    const val = vars[varName];

    if (method === 'toUpperCase' && typeof val === 'string') return val.toUpperCase();
    if (method === 'toLowerCase' && typeof val === 'string') return val.toLowerCase();
    if (method === 'length' && typeof val === 'string') return val.length;
    if (method === 'size' && Array.isArray(val)) return val.length;
    if (method === 'get' && typeof val === 'object' && !Array.isArray(val)) return val[arg] || 'null';
    if (method === 'toString') return String(val);
    return `${varName}.${method}()`;
  }

  // Built-in functions
  const ifNullMatch = expr.match(/^ifNull\((\w+),\s*(.+)\)$/);
  if (ifNullMatch) {
    const checkVar = ifNullMatch[1];
    const defaultVal = cleanStringValue(ifNullMatch[2].trim());
    return vars[checkVar] !== undefined ? vars[checkVar] : defaultVal;
  }

  const toStringMatch = expr.match(/^toString\((.+)\)$/);
  if (toStringMatch) {
    return String(cleanStringValue(toStringMatch[1]));
  }

  // Variable reference
  if (vars[expr] !== undefined) {
    if (Array.isArray(vars[expr])) return JSON.stringify(vars[expr]);
    if (typeof vars[expr] === 'object') return JSON.stringify(vars[expr]);
    return vars[expr];
  }

  // Number
  if (!isNaN(expr)) return Number(expr);

  // Arithmetic
  const arithMatch = expr.match(/^(.+)\s*([\-\*\/])\s*(.+)$/);
  if (arithMatch) {
    const left = evaluateExpression(arithMatch[1].trim(), vars);
    const right = evaluateExpression(arithMatch[3].trim(), vars);
    const op = arithMatch[2];
    if (op === '-') return Number(left) - Number(right);
    if (op === '*') return Number(left) * Number(right);
    if (op === '/') return Number(left) / Number(right);
  }

  return expr;
}

function cleanStringValue(s) {
  s = s.trim().replace(/;$/, '');
  if (s.startsWith('"') && s.endsWith('"')) return s.slice(1, -1);
  if (!isNaN(s)) return Number(s);
  return s;
}

// ── Check Solution ────────────────────────────────────────
function checkSolution() {
  if (!currentLesson) return;

  const code = editor.getValue();
  const passed = currentLesson.validate(code);

  if (passed) {
    // Mark completed
    if (!completedLessons.includes(currentLesson.id)) {
      completedLessons.push(currentLesson.id);
      localStorage.setItem('deluge-completed', JSON.stringify(completedLessons));
      renderSidebar();
      // Re-activate current lesson link
      highlightCurrentLesson();
    }
    showToast('success', '✅ Great job! Solution is correct!');

    // Also run the code to show output
    runCode();
  } else {
    showToast('error', '❌ Not quite right. Review the instructions and try again.');
  }
}

function highlightCurrentLesson() {
  if (!currentLesson) return;
  document.querySelectorAll('.sidebar-items a').forEach(a => {
    a.classList.remove('active');
    if (a.textContent.includes(currentLesson.title)) {
      a.classList.add('active');
    }
  });
}

// ── Output Helpers ────────────────────────────────────────
function clearOutput() {
  document.getElementById('output-content').innerHTML = '';
  const statusEl = document.getElementById('output-status');
  statusEl.textContent = '';
  statusEl.className = 'output-status';
}

function addOutputLine(type, text) {
  const outputEl = document.getElementById('output-content');
  const line = document.createElement('div');
  line.className = `output-line ${type}`;
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
  line.innerHTML = `<span class="timestamp">[${ts}]</span>${text}`;
  outputEl.appendChild(line);
  outputEl.scrollTop = outputEl.scrollHeight;
}

// ── Toast Notifications ──────────────────────────────────
function showToast(type, message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── Events ────────────────────────────────────────────────
function bindEvents() {
  document.getElementById('btn-run').addEventListener('click', runCode);
  document.getElementById('btn-check').addEventListener('click', checkSolution);
  document.getElementById('btn-reset').addEventListener('click', () => {
    if (currentLesson) {
      editor.setValue(currentLesson.starterCode);
      clearOutput();
      showToast('info', '↺ Code reset to starter template');
    }
  });

  // Keyboard shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runCode();
    }
  });
}
