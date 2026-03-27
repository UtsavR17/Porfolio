/* ============================================
   DELUGE PRACTICE — Flow Builder Engine
   Drag & Drop, SVG connections, node management
   ============================================ */

// ── Node Type Definitions ──────────────────────────────────
const NODE_TYPES = {
    trigger: { color: 'var(--accent-green)', bgColor: 'rgba(63, 185, 80, 0.15)', icon: '⚡' },
    condition: { color: 'var(--accent-yellow)', bgColor: 'rgba(210, 153, 34, 0.15)', icon: '◆' },
    action: { color: 'var(--accent-blue)', bgColor: 'rgba(56, 139, 253, 0.15)', icon: '✏️' },
    loop: { color: 'var(--accent-purple)', bgColor: 'rgba(163, 113, 247, 0.15)', icon: '🔄' },
    api: { color: 'var(--accent-orange)', bgColor: 'rgba(240, 136, 62, 0.15)', icon: '🌐' },
    email: { color: 'var(--accent-teal)', bgColor: 'rgba(63, 185, 160, 0.15)', icon: '📧' },
    function: { color: 'var(--accent-red)', bgColor: 'rgba(248, 81, 73, 0.15)', icon: '{ }' }
};

// ── Property Templates ────────────────────────────────────
const PROPERTY_TEMPLATES = {
    trigger: [
        { key: 'module', label: 'Module', type: 'select', options: ['Leads', 'Contacts', 'Deals', 'Accounts', 'Tasks'] },
        { key: 'event', label: 'Event', type: 'select', options: ['Create', 'Update', 'Delete', 'Approve', 'Reject'] },
        { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe this trigger...' }
    ],
    condition: [
        { key: 'field', label: 'Field', type: 'text', placeholder: 'e.g. Lead_Status' },
        { key: 'operator', label: 'Operator', type: 'select', options: ['equals', 'not equals', 'contains', 'starts with', 'greater than', 'less than', 'is empty', 'is not empty'] },
        { key: 'value', label: 'Value', type: 'text', placeholder: 'e.g. Hot' },
        { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe this condition...' }
    ],
    action: [
        { key: 'module', label: 'Module', type: 'select', options: ['Leads', 'Contacts', 'Deals', 'Accounts', 'Tasks'] },
        { key: 'action', label: 'Action', type: 'select', options: ['Create Record', 'Update Record', 'Delete Record', 'Get Record'] },
        { key: 'fields', label: 'Field Mappings', type: 'textarea', placeholder: 'Last_Name = "Smith"\nEmail = "smith@example.com"' },
        { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe this action...' }
    ],
    loop: [
        { key: 'source', label: 'Source', type: 'select', options: ['Records List', 'API Response', 'Custom List'] },
        { key: 'variable', label: 'Iterator Variable', type: 'text', placeholder: 'e.g. record' },
        { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe this loop...' }
    ],
    api: [
        { key: 'url', label: 'URL', type: 'text', placeholder: 'https://api.example.com/...' },
        { key: 'method', label: 'Method', type: 'select', options: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] },
        { key: 'headers', label: 'Headers (JSON)', type: 'textarea', placeholder: '{"Authorization": "Bearer ..."}' },
        { key: 'body', label: 'Request Body', type: 'textarea', placeholder: '{"key": "value"}' }
    ],
    email: [
        { key: 'to', label: 'To', type: 'text', placeholder: 'recipient@example.com' },
        { key: 'subject', label: 'Subject', type: 'text', placeholder: 'Email subject...' },
        { key: 'message', label: 'Message', type: 'textarea', placeholder: 'Email body content...' }
    ],
    function: [
        { key: 'name', label: 'Function Name', type: 'text', placeholder: 'e.g. calculateDiscount' },
        { key: 'code', label: 'Deluge Code', type: 'textarea', placeholder: '// Write your Deluge code here\nresult = a + b;\nreturn result;' },
        { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Describe what this function does...' }
    ]
};

// ── State ──────────────────────────────────────────────────
let nodes = [];
let connections = [];
let selectedNode = null;
let nextNodeId = 1;

// Drag state
let isDraggingFromPalette = false;
let isDraggingNode = false;
let dragNodeData = null;
let dragOffset = { x: 0, y: 0 };
let dragGhost = null;

// Connection drawing state
let isDrawingConnection = false;
let connectionStart = null;
let tempLine = null;

// ── Initialize ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    bindPaletteDrag();
    bindCanvasEvents();
    bindToolbar();
    bindFlowActions();
});

// ── Palette Drag ───────────────────────────────────────────
function bindPaletteDrag() {
    const paletteNodes = document.querySelectorAll('.palette-node');

    paletteNodes.forEach(pn => {
        pn.addEventListener('dragstart', (e) => {
            isDraggingFromPalette = true;
            dragNodeData = {
                type: pn.dataset.type,
                label: pn.dataset.label,
                desc: pn.dataset.desc
            };
            e.dataTransfer.effectAllowed = 'copy';
            // Create a minimal drag image
            const img = new Image();
            img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
            e.dataTransfer.setDragImage(img, 0, 0);

            // Create ghost element
            dragGhost = document.createElement('div');
            dragGhost.className = 'flow-node';
            dragGhost.style.cssText = 'position:fixed; pointer-events:none; z-index:9999; opacity:0.8; transform:scale(0.95);';
            dragGhost.innerHTML = createNodeHTML(dragNodeData.type, dragNodeData.label, 0);
            document.body.appendChild(dragGhost);
        });

        pn.addEventListener('drag', (e) => {
            if (dragGhost && e.clientX && e.clientY) {
                dragGhost.style.left = (e.clientX - 90) + 'px';
                dragGhost.style.top = (e.clientY - 20) + 'px';
            }
        });

        pn.addEventListener('dragend', (e) => {
            isDraggingFromPalette = false;
            if (dragGhost) {
                dragGhost.remove();
                dragGhost = null;
            }
        });
    });
}

// ── Canvas Events ──────────────────────────────────────────
function bindCanvasEvents() {
    const canvas = document.getElementById('canvas-container');

    canvas.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    });

    canvas.addEventListener('drop', (e) => {
        e.preventDefault();
        if (!dragNodeData) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left - 90;
        const y = e.clientY - rect.top - 30;

        createNode(dragNodeData.type, dragNodeData.label, dragNodeData.desc, x, y);
        dragNodeData = null;

        // Hide empty state
        document.getElementById('empty-state').style.display = 'none';
    });

    // Click on canvas background to deselect
    canvas.addEventListener('click', (e) => {
        if (e.target === canvas || e.target.classList.contains('canvas-grid')) {
            deselectAll();
        }
    });

    // Handle connection drawing on SVG
    canvas.addEventListener('mousemove', (e) => {
        if (isDrawingConnection && tempLine) {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            updateTempLine(x, y);
        }
    });

    canvas.addEventListener('mouseup', () => {
        if (isDrawingConnection) {
            cancelConnectionDraw();
        }
    });
}

// ── Create Node ────────────────────────────────────────────
function createNode(type, label, desc, x, y) {
    const id = nextNodeId++;
    const node = {
        id,
        type,
        label,
        desc: desc || '',
        x: Math.max(0, x),
        y: Math.max(0, y),
        properties: {}
    };

    // Initialize default properties
    const template = PROPERTY_TEMPLATES[type] || [];
    template.forEach(prop => {
        node.properties[prop.key] = '';
    });

    nodes.push(node);
    renderNode(node);
    selectNode(id);
    showToast('success', `Added "${label}" node`);
    return node;
}

function renderNode(node) {
    const canvas = document.getElementById('canvas-container');
    const typeConfig = NODE_TYPES[node.type] || NODE_TYPES.action;

    const el = document.createElement('div');
    el.className = `flow-node node-type-${node.type}`;
    el.id = `node-${node.id}`;
    el.style.left = node.x + 'px';
    el.style.top = node.y + 'px';
    el.innerHTML = createNodeHTML(node.type, node.label, node.id);

    // Node dragging
    const header = el.querySelector('.node-header');
    let startX, startY, origX, origY;

    header.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('node-delete')) return;
        e.preventDefault();
        isDraggingNode = true;
        startX = e.clientX;
        startY = e.clientY;
        origX = node.x;
        origY = node.y;
        el.style.zIndex = 10;

        const onMove = (ev) => {
            const dx = ev.clientX - startX;
            const dy = ev.clientY - startY;
            node.x = Math.max(0, origX + dx);
            node.y = Math.max(0, origY + dy);
            el.style.left = node.x + 'px';
            el.style.top = node.y + 'px';
            updateConnections();
        };

        const onUp = () => {
            isDraggingNode = false;
            el.style.zIndex = 2;
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseup', onUp);
        };

        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
    });

    // Select on click
    el.addEventListener('click', (e) => {
        if (e.target.classList.contains('node-delete')) return;
        e.stopPropagation();
        selectNode(node.id);
    });

    // Delete button
    el.querySelector('.node-delete').addEventListener('click', (e) => {
        e.stopPropagation();
        deleteNode(node.id);
    });

    // Port handlers
    const portOut = el.querySelector('.port-out');
    const portIn = el.querySelector('.port-in');

    if (portOut) {
        portOut.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            e.preventDefault();
            startConnectionDraw(node.id, e);
        });
    }

    if (portIn) {
        portIn.addEventListener('mouseup', (e) => {
            e.stopPropagation();
            if (isDrawingConnection && connectionStart !== null) {
                completeConnection(node.id);
            }
        });
        portIn.addEventListener('mouseenter', () => {
            if (isDrawingConnection) {
                portIn.style.transform = 'translateY(-50%) scale(1.5)';
                portIn.style.background = 'var(--accent-blue)';
            }
        });
        portIn.addEventListener('mouseleave', () => {
            portIn.style.transform = 'translateY(-50%)';
            portIn.style.background = 'var(--bg-tertiary)';
        });
    }

    canvas.appendChild(el);
}

function createNodeHTML(type, label, id) {
    const typeConfig = NODE_TYPES[type] || NODE_TYPES.action;
    return `
    <div class="node-header">
      <div class="node-icon" style="background:${typeConfig.bgColor}; color:${typeConfig.color};">
        ${typeConfig.icon}
      </div>
      <span class="node-name">${label}</span>
      ${id ? '<button class="node-delete" title="Delete node">✕</button>' : ''}
    </div>
    <div class="node-body">
      ${type.charAt(0).toUpperCase() + type.slice(1)} node
    </div>
    ${id ? '<div class="port port-in"></div><div class="port port-out"></div>' : ''}
  `;
}

// ── Select / Deselect ─────────────────────────────────────
function selectNode(id) {
    deselectAll();
    selectedNode = id;
    const el = document.getElementById(`node-${id}`);
    if (el) el.classList.add('selected');
    showProperties(id);
}

function deselectAll() {
    selectedNode = null;
    document.querySelectorAll('.flow-node.selected').forEach(el => el.classList.remove('selected'));
    hideProperties();
}

// ── Delete Node ───────────────────────────────────────────
function deleteNode(id) {
    // Remove connections
    connections = connections.filter(c => c.from !== id && c.to !== id);

    // Remove node from state
    nodes = nodes.filter(n => n.id !== id);

    // Remove from DOM
    const el = document.getElementById(`node-${id}`);
    if (el) el.remove();

    // Deselect
    if (selectedNode === id) deselectAll();

    // Update SVG
    updateConnections();

    // Show empty state if no nodes
    if (nodes.length === 0) {
        document.getElementById('empty-state').style.display = '';
    }

    showToast('info', 'Node deleted');
}

// ── Connection Drawing ─────────────────────────────────────
function startConnectionDraw(fromId, event) {
    isDrawingConnection = true;
    connectionStart = fromId;

    const svg = document.getElementById('canvas-svg');
    tempLine = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    tempLine.classList.add('temp-line');

    const fromNode = nodes.find(n => n.id === fromId);
    const fromEl = document.getElementById(`node-${fromId}`);
    if (!fromNode || !fromEl) return;

    const startX = fromNode.x + fromEl.offsetWidth;
    const startY = fromNode.y + fromEl.offsetHeight / 2;

    tempLine.setAttribute('data-start-x', startX);
    tempLine.setAttribute('data-start-y', startY);
    tempLine.setAttribute('d', `M ${startX} ${startY} L ${startX} ${startY}`);

    svg.appendChild(tempLine);
}

function updateTempLine(x, y) {
    if (!tempLine) return;
    const startX = parseFloat(tempLine.getAttribute('data-start-x'));
    const startY = parseFloat(tempLine.getAttribute('data-start-y'));

    const midX = (startX + x) / 2;
    const d = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${y}, ${x} ${y}`;
    tempLine.setAttribute('d', d);
}

function completeConnection(toId) {
    if (connectionStart === toId) {
        cancelConnectionDraw();
        return;
    }

    // Check if connection already exists
    const exists = connections.some(c => c.from === connectionStart && c.to === toId);
    if (exists) {
        showToast('error', 'Connection already exists');
        cancelConnectionDraw();
        return;
    }

    connections.push({ from: connectionStart, to: toId });
    cancelConnectionDraw();
    updateConnections();
    showToast('success', 'Nodes connected');
}

function cancelConnectionDraw() {
    isDrawingConnection = false;
    connectionStart = null;
    if (tempLine) {
        tempLine.remove();
        tempLine = null;
    }
}

// ── Render Connections ────────────────────────────────────
function updateConnections() {
    const svg = document.getElementById('canvas-svg');
    // Remove existing paths (except temp)
    svg.querySelectorAll('path:not(.temp-line)').forEach(p => p.remove());

    connections.forEach(conn => {
        const fromEl = document.getElementById(`node-${conn.from}`);
        const toEl = document.getElementById(`node-${conn.to}`);
        if (!fromEl || !toEl) return;

        const fromNode = nodes.find(n => n.id === conn.from);
        const toNode = nodes.find(n => n.id === conn.to);
        if (!fromNode || !toNode) return;

        const startX = fromNode.x + fromEl.offsetWidth;
        const startY = fromNode.y + fromEl.offsetHeight / 2;
        const endX = toNode.x;
        const endY = toNode.y + toEl.offsetHeight / 2;

        const midX = (startX + endX) / 2;
        const d = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.dataset.from = conn.from;
        path.dataset.to = conn.to;

        // Click to delete connection
        path.style.pointerEvents = 'stroke';
        path.style.cursor = 'pointer';
        path.addEventListener('click', () => {
            connections = connections.filter(c => !(c.from === conn.from && c.to === conn.to));
            updateConnections();
            showToast('info', 'Connection removed');
        });

        svg.appendChild(path);
    });
}

// ── Properties Panel ──────────────────────────────────────
function showProperties(nodeId) {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    const panel = document.getElementById('properties-panel');
    const title = document.getElementById('properties-title');
    const content = document.getElementById('properties-content');

    panel.classList.remove('hidden');
    title.textContent = `${node.label} — Properties`;

    const template = PROPERTY_TEMPLATES[node.type] || [];
    content.innerHTML = '';

    // Node name
    const nameGroup = document.createElement('div');
    nameGroup.className = 'property-group';
    nameGroup.innerHTML = `
    <label class="property-label">Node Name</label>
    <input class="property-input" type="text" value="${node.label}" data-prop="__label">
  `;
    content.appendChild(nameGroup);

    // Type-specific properties
    template.forEach(prop => {
        const group = document.createElement('div');
        group.className = 'property-group';

        let inputHTML = '';
        if (prop.type === 'text') {
            inputHTML = `<input class="property-input" type="text" value="${node.properties[prop.key] || ''}" placeholder="${prop.placeholder || ''}" data-prop="${prop.key}">`;
        } else if (prop.type === 'textarea') {
            inputHTML = `<textarea class="property-input" placeholder="${prop.placeholder || ''}" data-prop="${prop.key}">${node.properties[prop.key] || ''}</textarea>`;
        } else if (prop.type === 'select') {
            inputHTML = `<select class="property-input" data-prop="${prop.key}">
        <option value="">— Select —</option>
        ${prop.options.map(opt => `<option value="${opt}" ${node.properties[prop.key] === opt ? 'selected' : ''}>${opt}</option>`).join('')}
      </select>`;
        }

        group.innerHTML = `
      <label class="property-label">${prop.label}</label>
      ${inputHTML}
    `;
        content.appendChild(group);
    });

    // Bind input changes
    content.querySelectorAll('.property-input').forEach(input => {
        input.addEventListener('change', () => {
            const key = input.dataset.prop;
            if (key === '__label') {
                node.label = input.value;
                const nameEl = document.querySelector(`#node-${node.id} .node-name`);
                if (nameEl) nameEl.textContent = input.value;
            } else {
                node.properties[key] = input.value;
            }
        });
        input.addEventListener('input', () => {
            const key = input.dataset.prop;
            if (key === '__label') {
                node.label = input.value;
                const nameEl = document.querySelector(`#node-${node.id} .node-name`);
                if (nameEl) nameEl.textContent = input.value;
            } else {
                node.properties[key] = input.value;
            }
        });
    });
}

function hideProperties() {
    document.getElementById('properties-panel').classList.add('hidden');
}

// ── Toolbar ───────────────────────────────────────────────
function bindToolbar() {
    // For now, zoom and fit are cosmetic (future enhancement with canvas transforms)
    document.getElementById('btn-zoom-in').addEventListener('click', () => {
        showToast('info', 'Zoom In — Coming soon');
    });
    document.getElementById('btn-zoom-out').addEventListener('click', () => {
        showToast('info', 'Zoom Out — Coming soon');
    });
    document.getElementById('btn-fit').addEventListener('click', () => {
        showToast('info', 'Fit to View — Coming soon');
    });
    document.getElementById('btn-generate-code').addEventListener('click', generateDelugeCode);
}

// ── Flow Actions ──────────────────────────────────────────
function bindFlowActions() {
    document.getElementById('btn-save-flow').addEventListener('click', saveFlow);
    document.getElementById('btn-load-flow').addEventListener('click', loadFlow);
    document.getElementById('btn-export-flow').addEventListener('click', exportFlow);
    document.getElementById('btn-clear-canvas').addEventListener('click', clearCanvas);
}

function saveFlow() {
    const flowData = {
        nodes: nodes.map(n => ({ ...n })),
        connections: [...connections],
        nextNodeId
    };
    localStorage.setItem('deluge-flow', JSON.stringify(flowData));
    showToast('success', '💾 Flow saved successfully');
}

function loadFlow() {
    const raw = localStorage.getItem('deluge-flow');
    if (!raw) {
        showToast('error', 'No saved flow found');
        return;
    }

    try {
        const flowData = JSON.parse(raw);

        // Clear current canvas
        nodes.forEach(n => {
            const el = document.getElementById(`node-${n.id}`);
            if (el) el.remove();
        });
        nodes = [];
        connections = [];

        // Restore
        nextNodeId = flowData.nextNodeId || 1;
        flowData.nodes.forEach(n => {
            nodes.push(n);
            renderNode(n);
        });
        connections = flowData.connections || [];
        updateConnections();

        // Hide empty state if there are nodes
        if (nodes.length > 0) {
            document.getElementById('empty-state').style.display = 'none';
        }

        showToast('success', '📂 Flow loaded successfully');
    } catch (e) {
        showToast('error', 'Failed to load flow data');
    }
}

function exportFlow() {
    const flowData = {
        name: 'My Deluge Flow',
        created: new Date().toISOString(),
        nodes: nodes.map(n => ({
            id: n.id,
            type: n.type,
            label: n.label,
            position: { x: n.x, y: n.y },
            properties: n.properties
        })),
        connections: connections.map(c => ({
            from: c.from,
            to: c.to
        }))
    };

    const json = JSON.stringify(flowData, null, 2);

    // Copy to clipboard
    navigator.clipboard.writeText(json).then(() => {
        showToast('success', '📋 Flow JSON copied to clipboard!');
    }).catch(() => {
        // Fallback: download as file
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'deluge-flow.json';
        a.click();
        URL.revokeObjectURL(url);
        showToast('success', '📥 Flow downloaded as JSON');
    });
}

function clearCanvas() {
    if (nodes.length === 0) return;

    // Remove all node elements
    nodes.forEach(n => {
        const el = document.getElementById(`node-${n.id}`);
        if (el) el.remove();
    });

    nodes = [];
    connections = [];
    nextNodeId = 1;
    deselectAll();
    updateConnections();

    document.getElementById('empty-state').style.display = '';
    showToast('info', '🗑️ Canvas cleared');
}

// ── Generate Deluge Code ──────────────────────────────────
function generateDelugeCode() {
    if (nodes.length === 0) {
        showToast('error', 'Add some nodes to generate code');
        return;
    }

    let code = '// Auto-generated Deluge code from Flow Builder\n';
    code += '// Generated: ' + new Date().toLocaleString() + '\n\n';

    // Sort nodes by connections (topological-ish sort by x position)
    const sorted = [...nodes].sort((a, b) => a.x - b.x);

    sorted.forEach(node => {
        code += `// --- ${node.label} (${node.type}) ---\n`;

        switch (node.type) {
            case 'trigger':
                code += `// Trigger: ${node.properties.event || 'On Event'} on ${node.properties.module || 'Module'}\n`;
                break;
            case 'condition':
                const field = node.properties.field || 'field_name';
                const op = node.properties.operator || 'equals';
                const val = node.properties.value || 'value';
                const opMap = { 'equals': '==', 'not equals': '!=', 'contains': '.contains', 'greater than': '>', 'less than': '<' };
                if (op === 'contains') {
                    code += `if (${field}.contains("${val}"))\n{\n  // Action here\n}\n`;
                } else if (op === 'is empty') {
                    code += `if (${field} == null || ${field} == "")\n{\n  // Action here\n}\n`;
                } else {
                    code += `if (${field} ${opMap[op] || '=='} "${val}")\n{\n  // Action here\n}\n`;
                }
                break;
            case 'action':
                const module = node.properties.module || 'Leads';
                const action = node.properties.action || 'Update Record';
                if (action === 'Create Record') {
                    code += `dataMap = Map();\n`;
                    if (node.properties.fields) {
                        node.properties.fields.split('\n').forEach(f => {
                            const parts = f.split('=').map(s => s.trim());
                            if (parts.length === 2) {
                                code += `dataMap.put("${parts[0]}", ${parts[1]});\n`;
                            }
                        });
                    }
                    code += `response = zoho.crm.createRecord("${module}", dataMap);\ninfo response;\n`;
                } else if (action === 'Update Record') {
                    code += `updateMap = Map();\n`;
                    if (node.properties.fields) {
                        node.properties.fields.split('\n').forEach(f => {
                            const parts = f.split('=').map(s => s.trim());
                            if (parts.length === 2) {
                                code += `updateMap.put("${parts[0]}", ${parts[1]});\n`;
                            }
                        });
                    }
                    code += `response = zoho.crm.updateRecord("${module}", recordId, updateMap);\ninfo response;\n`;
                } else {
                    code += `response = zoho.crm.getRecords("${module}");\ninfo response;\n`;
                }
                break;
            case 'loop':
                const iterator = node.properties.variable || 'item';
                code += `for each ${iterator} in recordsList\n{\n  info ${iterator};\n}\n`;
                break;
            case 'api':
                const url = node.properties.url || 'https://api.example.com';
                const method = node.properties.method || 'GET';
                code += `response = invokeurl\n[\n  url: "${url}"\n  type: ${method}\n];\ninfo response;\n`;
                break;
            case 'email':
                code += `sendmail\n[\n  from: zoho.adminuserid\n  to: "${node.properties.to || 'recipient@example.com'}"\n  subject: "${node.properties.subject || 'Notification'}"\n  message: "${node.properties.message || 'Hello from your flow!'}"\n];\n`;
                break;
            case 'function':
                if (node.properties.code) {
                    code += node.properties.code + '\n';
                } else {
                    code += `// Custom function: ${node.properties.name || 'myFunction'}\n`;
                }
                break;
        }
        code += '\n';
    });

    // Copy to clipboard
    navigator.clipboard.writeText(code).then(() => {
        showToast('success', '⟨/⟩ Deluge code copied to clipboard!');
    }).catch(() => {
        console.log(code);
        showToast('info', 'Code logged to console (clipboard not available)');
    });
}

// ── Toast ─────────────────────────────────────────────────
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
