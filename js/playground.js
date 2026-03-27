/* ============================================
   PLAYGROUND — Multi-language code sandbox
   ============================================ */

(function () {
    'use strict';

    /* ── Language Config ── */
    const LANGS = {
        deluge: {
            label: 'DELUGE',
            file: 'script.dg',
            mode: 'text/x-java',          // closest built-in mode for C-like Deluge
            dotColor: 'var(--accent-purple)',
            placeholder: `// Deluge Practice Playground\n// Write your Deluge code here and click Run\n\nname = \"World\";\ninfo name;\ninfo \"Hello, \" + name + \"!\";`,
        },
        javascript: {
            label: 'JAVASCRIPT',
            file: 'script.js',
            mode: 'javascript',
            dotColor: 'var(--accent-yellow)',
            placeholder: `// JavaScript Playground\n// Write your JS code here and click Run\n\nconst greet = (name) => {\n  console.log(\"Hello, \" + name + \"!\");\n};\n\ngreet(\"World\");\nconsole.log(\"2 + 2 =\", 2 + 2);`,
        },
        python: {
            label: 'PYTHON',
            file: 'script.py',
            mode: 'python',
            dotColor: 'var(--accent-blue)',
            placeholder: `# Python Playground\n# Write your Python code here and click Run\n# (Simulated — common builtins supported)\n\nname = \"World\"\nprint(f\"Hello, {name}!\")\nprint(\"2 + 2 =\", 2 + 2)`,
        },
        html: {
            label: 'HTML',
            file: 'page.html',
            mode: 'htmlmixed',
            dotColor: 'var(--accent-orange)',
            placeholder: `<!-- HTML Playground -->\n<!-- Write HTML / CSS / JS and click Run to preview -->\n\n<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body {\n      font-family: sans-serif;\n      display: flex;\n      align-items: center;\n      justify-content: center;\n      min-height: 100vh;\n      margin: 0;\n      background: linear-gradient(135deg, #0d1117, #161b22);\n      color: #e6edf3;\n    }\n    h1 { background: linear-gradient(135deg, #388bfd, #a371f7);\n         -webkit-background-clip: text;\n         -webkit-text-fill-color: transparent; }\n  </style>\n</head>\n<body>\n  <h1>Hello, Playground!</h1>\n</body>\n</html>`,
        },
    };

    /* ── Quick Templates ── */
    const TEMPLATES = {
        deluge: [
            { name: '📝 Hello World', code: `info \"Hello, World!\";` },
            { name: '🔁 For Loop', code: `for each i in {1, 2, 3, 4, 5}\n{\n  info \"Item: \" + i;\n}` },
            { name: '🗺️ Map Operations', code: `myMap = Map();\nmyMap.put(\"name\", \"John\");\nmyMap.put(\"age\", 30);\ninfo myMap;\ninfo myMap.get(\"name\");` },
            { name: '📋 List Operations', code: `myList = List();\nmyList.add(\"Apple\");\nmyList.add(\"Banana\");\nmyList.add(\"Cherry\");\ninfo myList;\ninfo \"Count: \" + myList.size();` },
            { name: '🔀 If-Else', code: `score = 85;\nif (score >= 90)\n{\n  info \"Grade: A\";\n}\nelse if (score >= 80)\n{\n  info \"Grade: B\";\n}\nelse\n{\n  info \"Grade: C\";\n}` },
            { name: '🔤 String Functions', code: `text = \"Hello, Deluge World!\";\ninfo text.toUpperCase();\ninfo text.toLowerCase();\ninfo text.length();\ninfo text.contains(\"Deluge\");\ninfo text.replaceAll(\"World\", \"Playground\");` },
        ],
        javascript: [
            { name: '📝 Hello World', code: `console.log("Hello, World!");` },
            { name: '🔁 Array Methods', code: `const nums = [1, 2, 3, 4, 5];\nconst doubled = nums.map(n => n * 2);\nconsole.log("Doubled:", doubled);\n\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log("Evens:", evens);\n\nconst sum = nums.reduce((a, b) => a + b, 0);\nconsole.log("Sum:", sum);` },
            { name: '📦 Object Destructuring', code: `const user = { name: "Alice", age: 28, role: "Developer" };\nconst { name, ...rest } = user;\nconsole.log("Name:", name);\nconsole.log("Rest:", rest);` },
            { name: '⏱️ Async/Await', code: `async function fetchData() {\n  console.log("Fetching...");\n  await new Promise(r => setTimeout(r, 1000));\n  console.log("Data received!");\n  return { id: 1, value: "Hello" };\n}\n\nfetchData().then(data => console.log("Result:", data));` },
            { name: '🏗️ Class Example', code: `class Animal {\n  constructor(name, sound) {\n    this.name = name;\n    this.sound = sound;\n  }\n  speak() {\n    console.log(this.name + " says " + this.sound);\n  }\n}\n\nconst dog = new Animal("Dog", "Woof!");\ndog.speak();` },
        ],
        python: [
            { name: '📝 Hello World', code: `print("Hello, World!")` },
            { name: '🔁 List Comprehension', code: `nums = [1, 2, 3, 4, 5]\nsquares = [n ** 2 for n in nums]\nprint("Squares:", squares)\n\nevens = [n for n in nums if n % 2 == 0]\nprint("Evens:", evens)` },
            { name: '📖 Dictionary', code: `student = {\n    "name": "Alice",\n    "age": 22,\n    "grades": [90, 85, 92]\n}\nfor key, val in student.items():\n    print(f"{key}: {val}")\n\nprint("Average:", sum(student["grades"]) / len(student["grades"]))` },
            { name: '🏗️ Class Example', code: `class Calculator:\n    def __init__(self):\n        self.history = []\n    \n    def add(self, a, b):\n        result = a + b\n        self.history.append(f"{a} + {b} = {result}")\n        return result\n\ncalc = Calculator()\nprint(calc.add(10, 5))\nprint(calc.add(3, 7))\nprint("History:", calc.history)` },
        ],
        html: [
            { name: '📝 Basic Page', code: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { font-family: sans-serif; padding: 20px;\n           background: #0d1117; color: #e6edf3; }\n    h1 { color: #58a6ff; }\n  </style>\n</head>\n<body>\n  <h1>My Page</h1>\n  <p>Hello from the playground!</p>\n</body>\n</html>` },
            { name: '🎨 CSS Animation', code: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    body { display: flex; align-items: center; justify-content: center;\n           min-height: 100vh; margin: 0; background: #0d1117; }\n    .box { width: 80px; height: 80px; border-radius: 16px;\n           background: linear-gradient(135deg, #388bfd, #a371f7);\n           animation: spin 2s ease-in-out infinite; }\n    @keyframes spin {\n      0% { transform: rotate(0deg) scale(1); }\n      50% { transform: rotate(180deg) scale(1.3); border-radius: 50%; }\n      100% { transform: rotate(360deg) scale(1); }\n    }\n  </style>\n</head>\n<body><div class="box"></div></body>\n</html>` },
            { name: '📋 Form', code: `<!DOCTYPE html>\n<html>\n<head>\n  <style>\n    * { box-sizing: border-box; }\n    body { font-family: sans-serif; display: flex; align-items: center;\n           justify-content: center; min-height: 100vh;\n           margin: 0; background: #0d1117; color: #e6edf3; }\n    .card { background: #161b22; padding: 32px; border-radius: 12px;\n            border: 1px solid #30363d; width: 360px; }\n    h2 { margin: 0 0 20px; color: #58a6ff; }\n    label { display: block; font-size: 13px;\n            color: #8b949e; margin-bottom: 4px; }\n    input { width: 100%; padding: 8px 12px; margin-bottom: 16px;\n            background: #0d1117; border: 1px solid #30363d;\n            border-radius: 6px; color: #e6edf3; font-size: 14px; }\n    button { width: 100%; padding: 10px;\n             background: linear-gradient(135deg, #388bfd, #a371f7);\n             border: none; border-radius: 6px; color: #fff;\n             font-size: 14px; cursor: pointer; }\n  </style>\n</head>\n<body>\n  <div class="card">\n    <h2>Contact Us</h2>\n    <label>Name</label><input placeholder="Your name">\n    <label>Email</label><input type="email" placeholder="you@email.com">\n    <button onclick="alert('Submitted!')">Submit</button>\n  </div>\n</body>\n</html>` },
        ],
    };

    /* ── State ── */
    let currentLang = 'deluge';
    let editor = null;
    const savedScripts = JSON.parse(localStorage.getItem('pg_saved') || '[]');

    /* ── DOM Refs ── */
    const $ = (s) => document.querySelector(s);
    const $$ = (s) => document.querySelectorAll(s);

    const filenameEl = $('#pg-filename');
    const langBadgeEl = $('#pg-lang-badge');
    const outputConsole = $('#pg-output-console');
    const outputStatus = $('#pg-output-status');
    const htmlPreview = $('#pg-html-preview');
    const templateListEl = $('#template-list');
    const savedListEl = $('#saved-list');
    const savedCountEl = $('#saved-count');

    /* ── Init CodeMirror ── */
    function initEditor() {
        editor = CodeMirror.fromTextArea(document.getElementById('playground-editor'), {
            theme: 'material-darker',
            mode: LANGS[currentLang].mode,
            lineNumbers: true,
            matchBrackets: true,
            autoCloseBrackets: true,
            tabSize: 4,
            indentUnit: 4,
            indentWithTabs: false,
            lineWrapping: true,
            extraKeys: {
                'Ctrl-Enter': runCode,
                'Cmd-Enter': runCode,
                'Ctrl-L': clearOutput,
                'Ctrl-S': saveScript,
                'Cmd-S': saveScript,
            },
        });
        editor.setValue(LANGS[currentLang].placeholder);
        editor.setSize('100%', '100%');
    }

    /* ── Language Switching ── */
    function switchLang(lang) {
        currentLang = lang;
        const cfg = LANGS[lang];

        // Update active button
        $$('.pg-lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));

        // Update editor mode
        editor.setOption('mode', cfg.mode);
        editor.setValue(cfg.placeholder);

        // Update UI
        filenameEl.textContent = cfg.file;
        langBadgeEl.textContent = cfg.label;
        $('.file-tab .dot').style.background = cfg.dotColor;

        // Toggle HTML preview
        if (lang === 'html') {
            htmlPreview.style.display = 'block';
            outputConsole.style.display = 'none';
        } else {
            htmlPreview.style.display = 'none';
            outputConsole.style.display = 'block';
        }

        clearOutput();
        renderTemplates();
    }

    /* ── Template Rendering ── */
    function renderTemplates() {
        const tpls = TEMPLATES[currentLang] || [];
        templateListEl.innerHTML = tpls.map((t, i) =>
            `<button class="pg-template-btn" data-idx="${i}">${t.name}</button>`
        ).join('');

        templateListEl.querySelectorAll('.pg-template-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.dataset.idx);
                editor.setValue(tpls[idx].code);
                showToast('Template loaded', 'info');
            });
        });
    }

    /* ── Code Execution ── */
    function runCode() {
        const code = editor.getValue().trim();
        if (!code) { appendOutput('Nothing to run.', 'info'); return; }

        clearOutput();
        const start = performance.now();

        try {
            if (currentLang === 'javascript') runJavaScript(code);
            else if (currentLang === 'python') runPython(code);
            else if (currentLang === 'html') runHTML(code);
            else if (currentLang === 'deluge') runDeluge(code);
        } catch (err) {
            appendOutput('Error: ' + err.message, 'error');
        }

        const elapsed = (performance.now() - start).toFixed(1);
        outputStatus.textContent = `Done in ${elapsed}ms`;
        outputStatus.className = 'output-status success';
    }

    /* ── JS Runner ── */
    function runJavaScript(code) {
        // Capture console output
        const logs = [];
        const fakeConsole = {
            log: (...args) => logs.push({ type: 'info', msg: args.map(formatVal).join(' ') }),
            error: (...args) => logs.push({ type: 'error', msg: args.map(formatVal).join(' ') }),
            warn: (...args) => logs.push({ type: 'warn', msg: args.map(formatVal).join(' ') }),
            info: (...args) => logs.push({ type: 'info', msg: args.map(formatVal).join(' ') }),
            table: (data) => logs.push({ type: 'info', msg: JSON.stringify(data, null, 2) }),
            clear: () => { },
        };

        try {
            const fn = new Function('console', code);
            fn(fakeConsole);
        } catch (e) {
            logs.push({ type: 'error', msg: e.toString() });
        }

        if (logs.length === 0) {
            appendOutput('(no output)', 'info');
        } else {
            logs.forEach(l => appendOutput(l.msg, l.type === 'error' ? 'error' : l.type === 'warn' ? 'warn' : 'success'));
        }
    }

    /* ── Python Simulator ── */
    function runPython(code) {
        const output = [];
        const scope = {};

        // Simple Python interpreter simulation
        const lines = code.split('\n');
        let i = 0;

        function evalExpr(expr) {
            expr = expr.trim();
            // Handle f-strings
            expr = expr.replace(/f"([^"]*)"/g, (_, inner) => {
                const resolved = inner.replace(/\{([^}]+)\}/g, (__, key) => {
                    try { return evalExpr(key.trim()); } catch { return `{${key}}`; }
                });
                return `"${resolved}"`;
            });
            expr = expr.replace(/f'([^']*)'/g, (_, inner) => {
                const resolved = inner.replace(/\{([^}]+)\}/g, (__, key) => {
                    try { return evalExpr(key.trim()); } catch { return `{${key}}`; }
                });
                return `"${resolved}"`;
            });

            // Replace Python-isms with JS equivalents
            let jsExpr = expr
                .replace(/\bTrue\b/g, 'true')
                .replace(/\bFalse\b/g, 'false')
                .replace(/\bNone\b/g, 'null')
                .replace(/\blen\(([^)]+)\)/g, '($1).length')
                .replace(/\bstr\(([^)]+)\)/g, 'String($1)')
                .replace(/\bint\(([^)]+)\)/g, 'parseInt($1)')
                .replace(/\bfloat\(([^)]+)\)/g, 'parseFloat($1)')
                .replace(/\babs\(([^)]+)\)/g, 'Math.abs($1)')
                .replace(/\bmax\(([^)]+)\)/g, 'Math.max($1)')
                .replace(/\bmin\(([^)]+)\)/g, 'Math.min($1)')
                .replace(/\bsum\(([^)]+)\)/g, '($1).reduce((a,b)=>a+b,0)')
                .replace(/\brange\(([^)]+)\)/g, '[...Array($1).keys()]')
                .replace(/\*\*/g, '**');

            // Evaluate with scope variables
            const scopeKeys = Object.keys(scope);
            const scopeVals = scopeKeys.map(k => scope[k]);
            try {
                return new Function(...scopeKeys, `return (${jsExpr})`).apply(null, scopeVals);
            } catch {
                return new Function(...scopeKeys, `${jsExpr}`).apply(null, scopeVals);
            }
        }

        function processLines(lines, indent) {
            while (i < lines.length) {
                const raw = lines[i];
                const trimmed = raw.trim();
                const currentIndent = raw.length - raw.trimStart().length;

                if (currentIndent < indent && trimmed) return;
                if (!trimmed || trimmed.startsWith('#')) { i++; continue; }

                // print()
                const printMatch = trimmed.match(/^print\((.+)\)$/);
                if (printMatch) {
                    try {
                        const args = [];
                        let argStr = printMatch[1];
                        // Simple split on commas (handles basic cases)
                        let depth = 0, current = '', inStr = false, strChar = '';
                        for (let c = 0; c < argStr.length; c++) {
                            const ch = argStr[c];
                            if (inStr) {
                                current += ch;
                                if (ch === strChar) inStr = false;
                            } else if (ch === '"' || ch === "'") {
                                inStr = true; strChar = ch; current += ch;
                            } else if (ch === '(' || ch === '[' || ch === '{') {
                                depth++; current += ch;
                            } else if (ch === ')' || ch === ']' || ch === '}') {
                                depth--; current += ch;
                            } else if (ch === ',' && depth === 0) {
                                args.push(current.trim()); current = '';
                            } else {
                                current += ch;
                            }
                        }
                        if (current.trim()) args.push(current.trim());
                        const vals = args.map(a => {
                            const v = evalExpr(a);
                            return typeof v === 'string' ? v : formatVal(v);
                        });
                        output.push(vals.join(' '));
                    } catch (e) {
                        output.push(`Error: ${e.message}`);
                    }
                    i++; continue;
                }

                // Variable assignment
                const assignMatch = trimmed.match(/^(\w+)\s*=\s*(.+)$/);
                if (assignMatch && !trimmed.startsWith('if ') && !trimmed.startsWith('for ') && !trimmed.startsWith('while ') && !trimmed.startsWith('def ') && !trimmed.startsWith('class ')) {
                    try {
                        scope[assignMatch[1]] = evalExpr(assignMatch[2]);
                    } catch (e) {
                        output.push(`Error: ${e.message}`);
                    }
                    i++; continue;
                }

                // for loop
                const forMatch = trimmed.match(/^for\s+(\w+)(?:\s*,\s*(\w+))?\s+in\s+(.+):$/);
                if (forMatch) {
                    const varName = forMatch[1];
                    const varName2 = forMatch[2];
                    let iterable;
                    try {
                        const iterExpr = forMatch[3].trim();
                        const itemsMatch = iterExpr.match(/^(.+)\.items\(\)$/);
                        if (itemsMatch) {
                            const dictVal = evalExpr(itemsMatch[1]);
                            iterable = Object.entries(dictVal);
                        } else {
                            iterable = evalExpr(iterExpr);
                        }
                    } catch (e) { output.push(`Error: ${e.message}`); i++; continue; }

                    const bodyStart = i + 1;
                    // Find all body lines
                    const bodyLines = [];
                    let bi = bodyStart;
                    while (bi < lines.length) {
                        const bl = lines[bi];
                        if (bl.trim() === '' || (bl.length - bl.trimStart().length) > currentIndent) {
                            bodyLines.push(bl);
                            bi++;
                        } else break;
                    }

                    for (const item of iterable) {
                        if (varName2 && Array.isArray(item)) {
                            scope[varName] = item[0];
                            scope[varName2] = item[1];
                        } else {
                            scope[varName] = item;
                        }
                        const savedI = i;
                        i = bodyStart;
                        processLines(lines, currentIndent + 4);
                        i = savedI;
                    }
                    i = bi;
                    continue;
                }

                // if/elif/else
                const ifMatch = trimmed.match(/^if\s+(.+):$/);
                if (ifMatch) {
                    let cond;
                    try { cond = evalExpr(ifMatch[1]); } catch (e) { output.push(`Error: ${e.message}`); i++; continue; }
                    i++;
                    if (cond) {
                        processLines(lines, currentIndent + 4);
                        // Skip elif/else blocks
                        while (i < lines.length && (lines[i].trim().startsWith('elif ') || lines[i].trim().startsWith('else:'))) {
                            i++;
                            while (i < lines.length && (lines[i].trim() === '' || (lines[i].length - lines[i].trimStart().length) > currentIndent)) i++;
                        }
                    } else {
                        // Skip if body
                        while (i < lines.length && (lines[i].trim() === '' || (lines[i].length - lines[i].trimStart().length) > currentIndent)) i++;
                        // Check elif/else
                        if (i < lines.length && lines[i].trim().startsWith('elif ')) {
                            lines[i] = lines[i].replace('elif ', 'if ');
                            continue; // re-process as if
                        } else if (i < lines.length && lines[i].trim() === 'else:') {
                            i++;
                            processLines(lines, currentIndent + 4);
                        }
                    }
                    continue;
                }

                // def (simple function)
                const defMatch = trimmed.match(/^def\s+(\w+)\(([^)]*)\):$/);
                if (defMatch) {
                    const fnName = defMatch[1];
                    const params = defMatch[2].split(',').map(p => p.trim()).filter(Boolean);
                    const bodyLines = [];
                    i++;
                    while (i < lines.length && (lines[i].trim() === '' || (lines[i].length - lines[i].trimStart().length) > currentIndent)) {
                        bodyLines.push(lines[i]);
                        i++;
                    }
                    scope[fnName] = function (...args) {
                        params.forEach((p, idx) => scope[p] = args[idx]);
                        const savedI = i;
                        i = 0;
                        processLines(bodyLines, currentIndent + 4);
                        i = savedI;
                    };
                    continue;
                }

                // class (very basic support)
                const classMatch = trimmed.match(/^class\s+(\w+):?$/);
                if (classMatch) {
                    i++;
                    // skip class body for now
                    while (i < lines.length && (lines[i].trim() === '' || (lines[i].length - lines[i].trimStart().length) > currentIndent)) i++;
                    output.push(`[class ${classMatch[1]} defined]`);
                    continue;
                }

                // Fallback: try as expression
                try {
                    const result = evalExpr(trimmed);
                    if (result !== undefined) {
                        // Don't auto-print expressions unless they're function calls
                    }
                } catch { }
                i++;
            }
        }

        processLines(lines, 0);

        if (output.length === 0) {
            appendOutput('(no output)', 'info');
        } else {
            output.forEach(o => appendOutput(o, 'success'));
        }
    }

    /* ── HTML Runner ── */
    function runHTML(code) {
        htmlPreview.srcdoc = code;
        appendOutput('HTML preview updated.', 'success');
    }

    /* ── Deluge Simulator ── */
    function runDeluge(code) {
        const output = [];
        const scope = {};
        const lines = code.split('\n');
        let i = 0;

        function evalDelugeExpr(expr) {
            expr = expr.trim();
            // Remove trailing semicolons
            if (expr.endsWith(';')) expr = expr.slice(0, -1).trim();

            // String concatenation
            // Handle method calls
            let jsExpr = expr;

            // Replace Deluge builtins
            jsExpr = jsExpr
                .replace(/\.toUpperCase(?:\(\))?/g, '.toUpperCase()')
                .replace(/\.toLowerCase(?:\(\))?/g, '.toLowerCase()')
                .replace(/\.length(?:\(\))?/g, '.length')
                .replace(/\.size(?:\(\))?/g, '.length')
                .replace(/\.contains\("([^"]+)"\)/g, '.includes("$1")')
                .replace(/\.contains\('([^']+)'\)/g, ".includes('$1')")
                .replace(/\.replaceAll\(/g, '.replaceAll(')
                .replace(/\.trim\(\)/g, '.trim()')
                .replace(/\.startsWith\(/g, '.startsWith(')
                .replace(/\.endsWith\(/g, '.endsWith(')
                .replace(/\.indexOf\(/g, '.indexOf(')
                .replace(/\.substring\(/g, '.substring(')
                .replace(/\.getSuffix\("([^"]+)"\)/g, '.split("$1").pop()')
                .replace(/\.getPrefix\("([^"]+)"\)/g, '.split("$1")[0]')
                .replace(/\.toList\(\)/g, '.split(",")')
                .replace(/\btoString\(([^)]+)\)/g, 'String($1)')
                .replace(/\btoNumber\(([^)]+)\)/g, 'Number($1)');

            // Map() and List() constructor
            jsExpr = jsExpr.replace(/\bMap\(\)/g, '({})');
            jsExpr = jsExpr.replace(/\bList\(\)/g, '([])');

            // .put("key", val) → ["key"] = val  — we'll handle this separately
            // .get("key") → ["key"]
            jsExpr = jsExpr.replace(/\.get\("([^"]+)"\)/g, '["$1"]');
            jsExpr = jsExpr.replace(/\.get\('([^']+)'\)/g, "['$1']");

            const scopeKeys = Object.keys(scope);
            const scopeVals = scopeKeys.map(k => scope[k]);
            try {
                return new Function(...scopeKeys, `return (${jsExpr})`).apply(null, scopeVals);
            } catch {
                return new Function(...scopeKeys, `${jsExpr}`).apply(null, scopeVals);
            }
        }

        function processDelugeLines() {
            while (i < lines.length) {
                const raw = lines[i];
                const trimmed = raw.trim();

                if (!trimmed || trimmed.startsWith('//')) { i++; continue; }

                // Remove trailing semicolons for matching
                const stmt = trimmed.endsWith(';') ? trimmed.slice(0, -1).trim() : trimmed;

                // info statement
                const infoMatch = stmt.match(/^info\s+(.+)$/);
                if (infoMatch) {
                    try {
                        const val = evalDelugeExpr(infoMatch[1]);
                        output.push(formatVal(val));
                    } catch (e) {
                        output.push(`Error: ${e.message}`);
                    }
                    i++; continue;
                }

                // alert statement
                const alertMatch = stmt.match(/^alert\s+(.+)$/);
                if (alertMatch) {
                    try {
                        const val = evalDelugeExpr(alertMatch[1]);
                        output.push(`⚠ Alert: ${formatVal(val)}`);
                    } catch (e) {
                        output.push(`Error: ${e.message}`);
                    }
                    i++; continue;
                }

                // .put() method
                const putMatch = stmt.match(/^(\w+)\.put\((.+),\s*(.+)\)$/);
                if (putMatch) {
                    try {
                        const key = evalDelugeExpr(putMatch[2]);
                        const val = evalDelugeExpr(putMatch[3]);
                        if (scope[putMatch[1]] && typeof scope[putMatch[1]] === 'object') {
                            scope[putMatch[1]][key] = val;
                        }
                    } catch (e) {
                        output.push(`Error: ${e.message}`);
                    }
                    i++; continue;
                }

                // .add() method for lists
                const addMatch = stmt.match(/^(\w+)\.add\((.+)\)$/);
                if (addMatch) {
                    try {
                        const val = evalDelugeExpr(addMatch[2]);
                        if (Array.isArray(scope[addMatch[1]])) {
                            scope[addMatch[1]].push(val);
                        }
                    } catch (e) {
                        output.push(`Error: ${e.message}`);
                    }
                    i++; continue;
                }

                // Variable assignment
                const assignMatch = stmt.match(/^(\w+)\s*=\s*(.+)$/);
                if (assignMatch && !stmt.startsWith('if') && !stmt.startsWith('for')) {
                    try {
                        // Handle list literal {1, 2, 3}
                        let valExpr = assignMatch[2];
                        const listMatch = valExpr.match(/^\{(.+)\}$/);
                        if (listMatch) {
                            scope[assignMatch[1]] = listMatch[1].split(',').map(v => evalDelugeExpr(v.trim()));
                        } else {
                            scope[assignMatch[1]] = evalDelugeExpr(valExpr);
                        }
                    } catch (e) {
                        output.push(`Error: ${e.message}`);
                    }
                    i++; continue;
                }

                // for each loop
                const forMatch = stmt.match(/^for\s+each\s+(\w+)\s+in\s+(.+)$/);
                if (forMatch) {
                    let iterable;
                    try { iterable = evalDelugeExpr(forMatch[2]); } catch (e) { output.push(`Error: ${e.message}`); i++; continue; }
                    i++;
                    // Find body (between { })
                    while (i < lines.length && lines[i].trim() === '{') { i++; break; }
                    if (i > lines.length) continue;
                    const bodyStart = i;
                    let depth = 1;
                    let bodyEnd = bodyStart;
                    while (bodyEnd < lines.length && depth > 0) {
                        if (lines[bodyEnd].trim() === '{') depth++;
                        if (lines[bodyEnd].trim() === '}') depth--;
                        if (depth > 0) bodyEnd++;
                    }

                    const bodyLines = lines.slice(bodyStart, bodyEnd);
                    for (const item of iterable) {
                        scope[forMatch[1]] = item;
                        const savedI = i;
                        const savedLines = [...lines];
                        i = 0;
                        const tmpLines = [...bodyLines];
                        // process inline
                        tmpLines.forEach(ln => {
                            const t = ln.trim();
                            if (!t || t === '{' || t === '}') return;
                            const s = t.endsWith(';') ? t.slice(0, -1).trim() : t;
                            const im = s.match(/^info\s+(.+)$/);
                            if (im) {
                                try { output.push(formatVal(evalDelugeExpr(im[1]))); }
                                catch (e) { output.push(`Error: ${e.message}`); }
                                return;
                            }
                            const am = s.match(/^(\w+)\s*=\s*(.+)$/);
                            if (am) {
                                try { scope[am[1]] = evalDelugeExpr(am[2]); }
                                catch (e) { output.push(`Error: ${e.message}`); }
                            }
                        });
                        i = savedI;
                    }
                    i = bodyEnd + 1;
                    continue;
                }

                // if / else if / else
                const ifMatch = stmt.match(/^if\s*\((.+)\)$/);
                if (ifMatch) {
                    let cond;
                    try { cond = evalDelugeExpr(ifMatch[1]); } catch { cond = false; }
                    i++;
                    // Find opening brace
                    while (i < lines.length && lines[i].trim() === '{') { i++; break; }
                    const blockStart = i;
                    let blockDepth = 1;
                    while (i < lines.length && blockDepth > 0) {
                        if (lines[i].trim() === '{') blockDepth++;
                        if (lines[i].trim() === '}') blockDepth--;
                        if (blockDepth > 0) i++;
                    }
                    const blockEnd = i;
                    i++; // skip closing }

                    if (cond) {
                        const bodyLines = lines.slice(blockStart, blockEnd);
                        bodyLines.forEach(ln => {
                            const t = ln.trim();
                            if (!t || t === '{' || t === '}') return;
                            const s = t.endsWith(';') ? t.slice(0, -1).trim() : t;
                            const im = s.match(/^info\s+(.+)$/);
                            if (im) {
                                try { output.push(formatVal(evalDelugeExpr(im[1]))); }
                                catch (e) { output.push(`Error: ${e.message}`); }
                                return;
                            }
                            const am = s.match(/^(\w+)\s*=\s*(.+)$/);
                            if (am) {
                                try { scope[am[1]] = evalDelugeExpr(am[2]); }
                                catch (e) { output.push(`Error: ${e.message}`); }
                            }
                        });
                        // Skip else blocks
                        while (i < lines.length) {
                            const next = lines[i]?.trim();
                            if (next?.startsWith('else if') || next === 'else') {
                                i++;
                                while (i < lines.length && lines[i].trim() === '{') { i++; break; }
                                let d = 1;
                                while (i < lines.length && d > 0) {
                                    if (lines[i].trim() === '{') d++;
                                    if (lines[i].trim() === '}') d--;
                                    if (d > 0) i++;
                                }
                                i++;
                            } else break;
                        }
                    } else {
                        // Check for else if / else
                        if (i < lines.length) {
                            const next = lines[i]?.trim();
                            if (next?.startsWith('else if')) {
                                // Transform to if and reprocess
                                lines[i] = lines[i].replace('else if', 'if');
                                continue;
                            } else if (next === 'else') {
                                i++;
                                while (i < lines.length && lines[i].trim() === '{') { i++; break; }
                                const elseStart = i;
                                let d2 = 1;
                                while (i < lines.length && d2 > 0) {
                                    if (lines[i].trim() === '{') d2++;
                                    if (lines[i].trim() === '}') d2--;
                                    if (d2 > 0) i++;
                                }
                                const elseBody = lines.slice(elseStart, i);
                                elseBody.forEach(ln => {
                                    const t = ln.trim();
                                    if (!t || t === '{' || t === '}') return;
                                    const s = t.endsWith(';') ? t.slice(0, -1).trim() : t;
                                    const im = s.match(/^info\s+(.+)$/);
                                    if (im) {
                                        try { output.push(formatVal(evalDelugeExpr(im[1]))); }
                                        catch (e) { output.push(`Error: ${e.message}`); }
                                        return;
                                    }
                                    const am = s.match(/^(\w+)\s*=\s*(.+)$/);
                                    if (am) {
                                        try { scope[am[1]] = evalDelugeExpr(am[2]); }
                                        catch (e) { output.push(`Error: ${e.message}`); }
                                    }
                                });
                                i++;
                            }
                        }
                    }
                    continue;
                }

                // Skip braces
                if (trimmed === '{' || trimmed === '}') { i++; continue; }

                i++;
            }
        }

        processDelugeLines();

        if (output.length === 0) {
            appendOutput('(no output)', 'info');
        } else {
            output.forEach(o => appendOutput(o, 'success'));
        }
    }

    /* ── Output Helpers ── */
    function appendOutput(msg, type = 'info') {
        const line = document.createElement('div');
        line.className = 'output-line ' + type;
        const ts = new Date().toLocaleTimeString('en-US', { hour12: false });
        line.innerHTML = `<span class="timestamp">[${ts}]</span> ${escapeHtml(String(msg))}`;
        outputConsole.appendChild(line);
        outputConsole.scrollTop = outputConsole.scrollHeight;
    }

    function clearOutput() {
        outputConsole.innerHTML = '';
        outputStatus.textContent = '';
        outputStatus.className = 'output-status';
    }

    function formatVal(v) {
        if (v === null || v === undefined) return String(v);
        if (typeof v === 'object') return JSON.stringify(v, null, 2);
        return String(v);
    }

    function escapeHtml(s) {
        const d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    /* ── Save / Load ── */
    function saveScript() {
        const code = editor.getValue().trim();
        if (!code) return showToast('Nothing to save', 'error');
        const name = prompt('Script name:', `${LANGS[currentLang].label.toLowerCase()}_${Date.now()}`);
        if (!name) return;
        savedScripts.push({ name, lang: currentLang, code, date: new Date().toISOString() });
        localStorage.setItem('pg_saved', JSON.stringify(savedScripts));
        renderSaved();
        showToast('Script saved!', 'success');
    }

    function renderSaved() {
        savedCountEl.textContent = savedScripts.length;
        if (savedScripts.length === 0) {
            savedListEl.innerHTML = '<div class="pg-empty-saved">No saved scripts yet</div>';
            return;
        }
        savedListEl.innerHTML = savedScripts.map((s, idx) =>
            `<div class="pg-saved-item" data-idx="${idx}">
                <div class="pg-saved-name">${escapeHtml(s.name)}</div>
                <div class="pg-saved-meta">${s.lang} · ${new Date(s.date).toLocaleDateString()}</div>
                <button class="pg-saved-delete" data-idx="${idx}" title="Delete">×</button>
            </div>`
        ).join('');

        savedListEl.querySelectorAll('.pg-saved-item').forEach(el => {
            el.addEventListener('click', (e) => {
                if (e.target.classList.contains('pg-saved-delete')) return;
                const s = savedScripts[el.dataset.idx];
                switchLang(s.lang);
                editor.setValue(s.code);
                showToast('Script loaded', 'info');
            });
        });

        savedListEl.querySelectorAll('.pg-saved-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                savedScripts.splice(parseInt(btn.dataset.idx), 1);
                localStorage.setItem('pg_saved', JSON.stringify(savedScripts));
                renderSaved();
                showToast('Script deleted', 'info');
            });
        });
    }

    /* ── Toast ── */
    function showToast(msg, type = 'info') {
        const ct = document.getElementById('toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        const icons = { success: '✅', error: '❌', info: 'ℹ️' };
        toast.innerHTML = `<span class="toast-icon">${icons[type] || 'ℹ️'}</span> ${msg}`;
        ct.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 2500);
    }

    /* ── Event Binding ── */
    function init() {
        initEditor();
        renderTemplates();
        renderSaved();

        // Language buttons
        $$('.pg-lang-btn').forEach(btn => {
            btn.addEventListener('click', () => switchLang(btn.dataset.lang));
        });

        // Action buttons
        $('#btn-pg-run').addEventListener('click', runCode);
        $('#btn-pg-clear').addEventListener('click', () => {
            editor.setValue('');
            clearOutput();
        });
        $('#btn-pg-save').addEventListener('click', saveScript);
        $('#btn-pg-clear-output').addEventListener('click', clearOutput);
    }

    // Boot
    document.addEventListener('DOMContentLoaded', init);
})();
