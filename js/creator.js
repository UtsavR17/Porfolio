/* ============================================
   CREATOR STUDIO — Form Builder + Event Scripting
   ============================================ */

// ── Templates ─────────────────────────────────────────────
const TEMPLATES = {
  contact: {
    name: 'Contact Form',
    fields: [
      { type: 'text', label: 'First_Name', placeholder: 'John' },
      { type: 'text', label: 'Last_Name', placeholder: 'Doe' },
      { type: 'email', label: 'Email', placeholder: 'john@example.com' },
      { type: 'phone', label: 'Phone', placeholder: '555-0123' },
      { type: 'dropdown', label: 'Department', options: ['Sales','Engineering','Marketing','HR','Support'] },
    ]
  },
  task: {
    name: 'Task Tracker',
    fields: [
      { type: 'text', label: 'Task_Name', placeholder: 'Build new feature' },
      { type: 'textarea', label: 'Description', placeholder: 'Detailed description...' },
      { type: 'dropdown', label: 'Priority', options: ['High','Medium','Low'] },
      { type: 'dropdown', label: 'Status', options: ['Open','In Progress','Completed','On Hold'] },
      { type: 'date', label: 'Due_Date' },
      { type: 'text', label: 'Assigned_To', placeholder: 'Team member name' },
    ]
  },
  inventory: {
    name: 'Inventory Manager',
    fields: [
      { type: 'text', label: 'Product_Name', placeholder: 'Widget Pro' },
      { type: 'text', label: 'SKU', placeholder: 'WGT-001' },
      { type: 'number', label: 'Quantity', placeholder: '100' },
      { type: 'number', label: 'Price', placeholder: '29.99' },
      { type: 'dropdown', label: 'Category', options: ['Electronics','Clothing','Food','Tools','Other'] },
      { type: 'checkbox', label: 'In_Stock' },
    ]
  }
};

const EVENT_SCRIPTS = {
  on_add: '// On Add — runs when a new record is being added\n// Access field values with: input.Field_Name\n\nname = input.First_Name + " " + input.Last_Name;\ninfo "Adding new record: " + name;\n',
  on_edit: '// On Edit — runs when a record is being edited\n// Access field values with: input.Field_Name\n\ninfo "Editing record...";\n',
  on_validate: '// On Validate — validate before saving\n// Use "cancel submit" and "alert" to prevent saving\n\nemail = input.Email;\nif (!email.contains("@"))\n{\n  cancel submit;\n  alert "Please enter a valid email";\n}\ninfo "Validation passed";\n',
  on_load: '// On Load — runs when the form is loaded\n// Use to set default values\n\ninput.Status = "Open";\ninput.Created_Date = zoho.currentdate;\ninfo "Form loaded with defaults";\n',
  on_submit: '// On Submit — runs after the record is saved\n// Good for sending notifications\n\ninfo "Record submitted successfully!";\nsendmail\n[\n  from: zoho.adminuserid\n  to: input.Email\n  subject: "Record Created"\n  message: "Your record has been created."\n];\n'
};

// ── State ──────────────────────────────────────────────────
let formFields = [];
let activeEvent = 'on_add';
let editor = null;
let fieldCounter = 0;

// ── Initialize ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initEditor();
  bindTemplates();
  bindFieldDrag();
  bindEventTabs();
  bindActions();
  updateEditor();
});

function initEditor() {
  editor = CodeMirror.fromTextArea(document.getElementById('creator-editor'), {
    mode: 'text/x-java',
    theme: 'material-darker',
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    indentUnit: 2,
    tabSize: 2,
    lineWrapping: true,
  });
}

// ── Templates ──────────────────────────────────────────────
function bindTemplates() {
  document.querySelectorAll('.template-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tpl = TEMPLATES[btn.dataset.tpl];
      if (tpl) loadTemplate(tpl);
    });
  });
}

function loadTemplate(tpl) {
  formFields = tpl.fields.map(f => ({ ...f, id: ++fieldCounter }));
  document.getElementById('form-name').textContent = tpl.name;
  renderFormFields();
  showToast('success', `Loaded template: ${tpl.name}`);
}

// ── Field Drag & Drop ──────────────────────────────────────
function bindFieldDrag() {
  const preview = document.getElementById('form-preview');

  document.querySelectorAll('.palette-field').forEach(pf => {
    pf.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('fieldType', pf.dataset.type);
    });
  });

  preview.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  });

  preview.addEventListener('drop', (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('fieldType');
    if (!type) return;

    const labels = {
      text: 'Field_' + (++fieldCounter),
      textarea: 'Description_' + fieldCounter,
      email: 'Email',
      number: 'Number_' + fieldCounter,
      phone: 'Phone',
      date: 'Date_' + fieldCounter,
      dropdown: 'Select_' + fieldCounter,
      checkbox: 'Checkbox_' + fieldCounter,
      url: 'URL_' + fieldCounter,
    };

    formFields.push({
      id: fieldCounter,
      type,
      label: labels[type] || 'Field_' + fieldCounter,
      placeholder: '',
      options: type === 'dropdown' ? ['Option 1', 'Option 2', 'Option 3'] : undefined
    });
    renderFormFields();
    showToast('success', `Added ${type} field`);
  });
}

// ── Render Form Preview ───────────────────────────────────
function renderFormFields() {
  const container = document.getElementById('form-fields');
  container.innerHTML = '';

  if (formFields.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted);">Drag fields from the left or select a template.</div>';
    return;
  }

  formFields.forEach(field => {
    const div = document.createElement('div');
    div.className = 'form-field fade-in';

    let inputHtml = '';
    switch (field.type) {
      case 'text':
      case 'email':
      case 'phone':
      case 'url':
        inputHtml = `<input type="${field.type === 'phone' ? 'tel' : field.type}" placeholder="${field.placeholder || ''}" id="field-${field.id}">`;
        break;
      case 'number':
        inputHtml = `<input type="number" placeholder="${field.placeholder || '0'}" id="field-${field.id}">`;
        break;
      case 'textarea':
        inputHtml = `<textarea placeholder="${field.placeholder || ''}" id="field-${field.id}" rows="3"></textarea>`;
        break;
      case 'date':
        inputHtml = `<input type="date" id="field-${field.id}">`;
        break;
      case 'dropdown':
        inputHtml = `<select id="field-${field.id}">${(field.options || []).map(o => `<option>${o}</option>`).join('')}</select>`;
        break;
      case 'checkbox':
        inputHtml = `<label style="display:flex;align-items:center;gap:8px;cursor:pointer;"><input type="checkbox" id="field-${field.id}" style="width:auto;"> Enable</label>`;
        break;
    }

    div.innerHTML = `
      <label>${field.label} <span class="field-remove" onclick="removeField(${field.id})">✕ remove</span></label>
      ${inputHtml}
    `;
    container.appendChild(div);
  });
}

function removeField(id) {
  formFields = formFields.filter(f => f.id !== id);
  renderFormFields();
}

// ── Event Tabs ────────────────────────────────────────────
function bindEventTabs() {
  document.querySelectorAll('.event-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.event-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeEvent = tab.dataset.event;
      updateEditor();
      document.getElementById('script-filename').textContent = activeEvent + '.dg';
    });
  });
}

function updateEditor() {
  const savedCode = localStorage.getItem('creator-' + activeEvent);
  editor.setValue(savedCode || EVENT_SCRIPTS[activeEvent] || '// Write your script here\n');
}

// ── Actions ───────────────────────────────────────────────
function bindActions() {
  document.getElementById('btn-run-script').addEventListener('click', runCreatorScript);
  document.getElementById('btn-submit-form').addEventListener('click', simulateSubmit);

  // Save editor content on change
  editor.on('change', () => {
    localStorage.setItem('creator-' + activeEvent, editor.getValue());
  });
}

function simulateSubmit() {
  // Gather form data
  const input = {};
  formFields.forEach(field => {
    const el = document.getElementById('field-' + field.id);
    if (el) {
      if (field.type === 'checkbox') {
        input[field.label] = el.checked;
      } else {
        input[field.label] = el.value || field.placeholder || '';
      }
    }
  });

  runCreatorScript(input);
}

function runCreatorScript(inputOverride) {
  const code = editor.getValue();
  const output = document.getElementById('creator-output');
  const status = document.getElementById('creator-output-status');
  output.innerHTML = '';

  // Build mock input object
  const input = inputOverride || {};
  if (!inputOverride) {
    formFields.forEach(field => {
      const el = document.getElementById('field-' + field.id);
      if (el) {
        input[field.label] = el.value || field.placeholder || '';
      }
    });
  }

  addOutputLine(output, 'info', '⏳ Running ' + activeEvent + ' script...');
  addOutputLine(output, 'info', '📝 Form data: ' + JSON.stringify(input));

  setTimeout(() => {
    try {
      // Simple simulation
      const lines = code.split('\n');
      let cancelled = false;

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) continue;

        // info
        const infoMatch = trimmed.match(/^info\s+(.+);?\s*$/);
        if (infoMatch) {
          let expr = infoMatch[1].replace(/;$/, '').trim();
          expr = resolveInputRefs(expr, input);
          addOutputLine(output, 'success', '>> ' + expr);
          continue;
        }

        // cancel submit
        if (trimmed.startsWith('cancel submit')) {
          cancelled = true;
          addOutputLine(output, 'error', '🚫 Submit cancelled');
          continue;
        }

        // alert
        const alertMatch = trimmed.match(/^alert\s+"(.+)";?\s*$/);
        if (alertMatch) {
          addOutputLine(output, 'error', '⚠️ Alert: ' + alertMatch[1]);
          continue;
        }

        // sendmail
        if (trimmed.startsWith('sendmail')) {
          addOutputLine(output, 'info', '📧 Email sent (simulated)');
          continue;
        }

        // input.Field = value
        const inputSet = trimmed.match(/^input\.(\w+)\s*=\s*(.+);?\s*$/);
        if (inputSet) {
          addOutputLine(output, 'info', '✎ Set ' + inputSet[1] + ' = ' + inputSet[2].replace(/;$/, ''));
          continue;
        }
      }

      status.textContent = cancelled ? '✗ Submit cancelled' : '✓ Script completed';
      status.className = 'output-status ' + (cancelled ? 'error' : 'success');
    } catch (e) {
      addOutputLine(output, 'error', '❌ Error: ' + e.message);
      status.textContent = '✗ Error';
      status.className = 'output-status error';
    }
  }, 300);
}

function resolveInputRefs(expr, input) {
  // Replace input.Field_Name references
  expr = expr.replace(/input\.(\w+)/g, (match, field) => {
    return input[field] !== undefined ? input[field] : match;
  });

  // Simple string concatenation
  if (expr.includes('+')) {
    const parts = expr.split('+').map(p => {
      p = p.trim();
      if (p.startsWith('"') && p.endsWith('"')) return p.slice(1, -1);
      return p;
    });
    return parts.join('');
  }

  if (expr.startsWith('"') && expr.endsWith('"')) return expr.slice(1, -1);
  return expr;
}

function addOutputLine(container, type, text) {
  const line = document.createElement('div');
  line.className = 'output-line ' + type;
  const now = new Date();
  const ts = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}`;
  line.innerHTML = `<span class="timestamp">[${ts}]</span>${text}`;
  container.appendChild(line);
  container.scrollTop = container.scrollHeight;
}

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
