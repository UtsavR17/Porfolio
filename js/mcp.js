/* ============================================
   MCP PLAYGROUND — Tool Builder & Code Generator
   ============================================ */

// ── Examples ──────────────────────────────────────────────
const MCP_EXAMPLES = {
  crm_lookup: {
    name: 'zoho_crm_lookup',
    desc: 'Search for records in Zoho CRM by module and criteria',
    params: [
      { name: 'module', type: 'string' },
      { name: 'search_field', type: 'string' },
      { name: 'search_value', type: 'string' },
    ],
    required: 'module, search_field, search_value'
  },
  create_lead: {
    name: 'zoho_create_lead',
    desc: 'Create a new lead in Zoho CRM with name, email, company, and source',
    params: [
      { name: 'last_name', type: 'string' },
      { name: 'email', type: 'string' },
      { name: 'company', type: 'string' },
      { name: 'lead_source', type: 'string' },
    ],
    required: 'last_name, email, company'
  },
  send_email: {
    name: 'zoho_send_email',
    desc: 'Send an email notification via Zoho Mail',
    params: [
      { name: 'to', type: 'string' },
      { name: 'subject', type: 'string' },
      { name: 'body', type: 'string' },
      { name: 'cc', type: 'string' },
    ],
    required: 'to, subject, body'
  },
  fetch_report: {
    name: 'zoho_analytics_report',
    desc: 'Fetch a report or dashboard data from Zoho Analytics',
    params: [
      { name: 'workspace_name', type: 'string' },
      { name: 'report_name', type: 'string' },
      { name: 'criteria', type: 'string' },
      { name: 'limit', type: 'number' },
    ],
    required: 'workspace_name, report_name'
  }
};

// ── State ──────────────────────────────────────────────────
let paramCount = 1;

// ── Initialize ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  bindInputs();
  bindExamples();
  bindActions();
  generatePreview();
});

function bindInputs() {
  const inputs = ['mcp-tool-name', 'mcp-tool-desc', 'mcp-required', 'mcp-language'];
  inputs.forEach(id => {
    document.getElementById(id).addEventListener('input', generatePreview);
    document.getElementById(id).addEventListener('change', generatePreview);
  });

  document.getElementById('btn-add-param').addEventListener('click', addParam);

  // Bind existing param changes
  bindParamInputs();
}

function bindParamInputs() {
  document.querySelectorAll('.param-item input, .param-item select').forEach(el => {
    el.removeEventListener('input', generatePreview);
    el.addEventListener('input', generatePreview);
  });
}

function addParam() {
  paramCount++;
  const list = document.getElementById('param-list');
  const div = document.createElement('div');
  div.className = 'param-item';
  div.dataset.idx = paramCount;
  div.innerHTML = `
    <input type="text" placeholder="Param name">
    <select><option>string</option><option>number</option><option>boolean</option><option>object</option><option>array</option></select>
    <button class="param-remove" onclick="removeParam(this)">✕</button>
  `;
  list.appendChild(div);
  bindParamInputs();
  generatePreview();
}

function removeParam(btn) {
  btn.closest('.param-item').remove();
  generatePreview();
}

function bindExamples() {
  document.querySelectorAll('.mcp-example-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const example = MCP_EXAMPLES[btn.dataset.example];
      if (!example) return;
      loadExample(example);
    });
  });
}

function loadExample(ex) {
  document.getElementById('mcp-tool-name').value = ex.name;
  document.getElementById('mcp-tool-desc').value = ex.desc;
  document.getElementById('mcp-required').value = ex.required;

  // Rebuild params
  const list = document.getElementById('param-list');
  list.innerHTML = '';
  paramCount = 0;
  ex.params.forEach(p => {
    paramCount++;
    const div = document.createElement('div');
    div.className = 'param-item';
    div.dataset.idx = paramCount;
    div.innerHTML = `
      <input type="text" placeholder="Param name" value="${p.name}">
      <select>${['string','number','boolean','object','array'].map(t => `<option ${t===p.type?'selected':''}>${t}</option>`).join('')}</select>
      <button class="param-remove" onclick="removeParam(this)">✕</button>
    `;
    list.appendChild(div);
  });

  bindParamInputs();
  generatePreview();
  showToast('success', `Loaded example: ${ex.name}`);
}

function bindActions() {
  document.getElementById('btn-copy-schema').addEventListener('click', () => {
    const text = document.getElementById('schema-content').textContent;
    navigator.clipboard.writeText(text).then(() => showToast('success', '📋 Schema copied!'));
  });
  document.getElementById('btn-copy-code').addEventListener('click', () => {
    const text = document.getElementById('code-content').textContent;
    navigator.clipboard.writeText(text).then(() => showToast('success', '📋 Code copied!'));
  });
}

// ── Generate Previews ─────────────────────────────────────
function generatePreview() {
  generateSchema();
  generateHandler();
}

function generateSchema() {
  const name = document.getElementById('mcp-tool-name').value || 'my_tool';
  const desc = document.getElementById('mcp-tool-desc').value || 'Tool description';
  const required = document.getElementById('mcp-required').value.split(',').map(s => s.trim()).filter(Boolean);

  // Gather params
  const params = [];
  document.querySelectorAll('.param-item').forEach(item => {
    const nameInput = item.querySelector('input');
    const typeSelect = item.querySelector('select');
    if (nameInput.value) {
      params.push({ name: nameInput.value, type: typeSelect.value });
    }
  });

  // Build JSON Schema
  const properties = {};
  params.forEach(p => {
    properties[p.name] = {
      type: p.type,
      description: `The ${p.name.replace(/_/g, ' ')} parameter`
    };
  });

  const schema = {
    name,
    description: desc,
    inputSchema: {
      type: 'object',
      properties,
      required: required.filter(r => params.some(p => p.name === r))
    }
  };

  document.getElementById('schema-content').textContent = JSON.stringify(schema, null, 2);
}

function generateHandler() {
  const name = document.getElementById('mcp-tool-name').value || 'my_tool';
  const desc = document.getElementById('mcp-tool-desc').value || 'Tool description';
  const lang = document.getElementById('mcp-language').value;

  const params = [];
  document.querySelectorAll('.param-item').forEach(item => {
    const nameInput = item.querySelector('input');
    const typeSelect = item.querySelector('select');
    if (nameInput.value) {
      params.push({ name: nameInput.value, type: typeSelect.value });
    }
  });

  let code = '';

  if (lang === 'nodejs') {
    const zodTypes = { string: 'z.string()', number: 'z.number()', boolean: 'z.boolean()', object: 'z.object({})', array: 'z.array(z.string())' };
    const paramDefs = params.map(p => `    ${p.name}: ${zodTypes[p.type] || 'z.string()'}.describe("${p.name.replace(/_/g, ' ')}")`).join(',\n');
    const destructure = params.map(p => p.name).join(', ');

    code = `import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "zoho-mcp-server",
  version: "1.0.0"
});

// Tool: ${name}
server.tool(
  "${name}",
  "${desc}",
  {
${paramDefs}
  },
  async ({ ${destructure} }) => {
    try {
      // TODO: Implement your Zoho API logic here
      // Example: Call Zoho CRM API
      const response = await fetch(
        \`https://www.zohoapis.com/crm/v2/...\`,
        {
          headers: {
            "Authorization": "Zoho-oauthtoken YOUR_TOKEN",
            "Content-Type": "application/json"
          }
        }
      );
      const data = await response.json();

      return {
        content: [{
          type: "text",
          text: JSON.stringify(data, null, 2)
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: \`Error: \${error.message}\`
        }],
        isError: true
      };
    }
  }
);

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("Zoho MCP server running on stdio");`;
  } else {
    // Python
    const paramAnnotations = params.map(p => {
      const pyType = { string: 'str', number: 'int', boolean: 'bool', object: 'dict', array: 'list' }[p.type] || 'str';
      return `    ${p.name}: ${pyType}`;
    }).join(',\n');
    const paramArgs = params.map(p => p.name).join(', ');

    code = `from mcp.server.fastmcp import FastMCP
import httpx

# Create server
mcp = FastMCP("zoho-mcp-server")

@mcp.tool()
async def ${name}(
${paramAnnotations}
) -> str:
    """${desc}"""
    try:
        # TODO: Implement your Zoho API logic here
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://www.zohoapis.com/crm/v2/...",
                headers={
                    "Authorization": "Zoho-oauthtoken YOUR_TOKEN",
                    "Content-Type": "application/json"
                },
                params={${params.map(p => `"${p.name}": ${p.name}`).join(', ')}}
            )
            data = response.json()

        return json.dumps(data, indent=2)

    except Exception as e:
        return f"Error: {str(e)}"

# Run server
if __name__ == "__main__":
    mcp.run(transport="stdio")`;
  }

  document.getElementById('code-content').textContent = code;
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
