/* ============================================
   SNIPPET LIBRARY — Data & Rendering
   ============================================ */

const SNIPPETS = [
  { title: 'Fetch & Loop CRM Leads', category: 'crm', tags: ['CRM','Leads','Loop'], desc: 'Get all leads and iterate with field access.', code: `// Fetch all leads from CRM
leads = zoho.crm.getRecords("Leads");

for each lead in leads
{
  name = lead.get("Last_Name");
  email = lead.get("Email");
  status = lead.get("Lead_Status");
  info name + " | " + email + " | " + status;
}` },
  { title: 'Create a CRM Contact with Validation', category: 'crm', tags: ['CRM','Create','Validation'], desc: 'Validate email before creating a contact record.', code: `// Validate and create a contact
email = input.Email;

if (email.contains("@") && email.contains("."))
{
  contactMap = Map();
  contactMap.put("Last_Name", input.Last_Name);
  contactMap.put("Email", email);
  contactMap.put("Phone", input.Phone);
  contactMap.put("Lead_Source", "Web Form");

  response = zoho.crm.createRecord("Contacts", contactMap);
  info "Created: " + response;
}
else
{
  info "Invalid email address";
}` },
  { title: 'Bulk Update Records', category: 'crm', tags: ['CRM','Update','Bulk'], desc: 'Update multiple records matching a criteria.', code: `// Bulk update: set all "Open" deals to "In Progress"
deals = zoho.crm.searchRecords("Deals",
  "(Stage:equals:Open)");

for each deal in deals
{
  dealId = deal.get("id");
  updateMap = Map();
  updateMap.put("Stage", "In Progress");
  updateMap.put("Modified_Note", "Auto-updated by script");

  zoho.crm.updateRecord("Deals", dealId, updateMap);
}
info "Updated " + deals.size() + " deals";` },
  { title: 'Send Email Notification', category: 'email', tags: ['Email','Notification'], desc: 'Send a formatted email with dynamic content.', code: `// Send notification email
recipientEmail = "manager@company.com";
leadName = input.Last_Name;
leadSource = input.Lead_Source;

subject = "New Lead: " + leadName;
body = "<h2>New Lead Created</h2>" +
  "<p><strong>Name:</strong> " + leadName + "</p>" +
  "<p><strong>Source:</strong> " + leadSource + "</p>" +
  "<p><strong>Date:</strong> " + zoho.currentdate + "</p>";

sendmail
[
  from: zoho.adminuserid
  to: recipientEmail
  subject: subject
  message: body
];
info "Email sent to " + recipientEmail;` },
  { title: 'REST API GET Request', category: 'api', tags: ['API','GET','REST'], desc: 'Fetch data from an external REST API.', code: `// GET request to external API
headerMap = Map();
headerMap.put("Authorization", "Bearer YOUR_TOKEN");
headerMap.put("Content-Type", "application/json");

response = invokeurl
[
  url: "https://api.example.com/v2/users"
  type: GET
  headers: headerMap
];

// Parse response
users = response.get("data");
for each user in users
{
  info user.get("name") + " — " + user.get("email");
}` },
  { title: 'REST API POST Request', category: 'api', tags: ['API','POST','REST'], desc: 'Send data to an external API.', code: `// POST request to external API
headerMap = Map();
headerMap.put("Authorization", "Bearer YOUR_TOKEN");
headerMap.put("Content-Type", "application/json");

bodyMap = Map();
bodyMap.put("name", "John Doe");
bodyMap.put("email", "john@example.com");
bodyMap.put("role", "admin");

response = invokeurl
[
  url: "https://api.example.com/v2/users"
  type: POST
  headers: headerMap
  body: bodyMap.toString()
];
info response;` },
  { title: 'Creator Form: On Submit Script', category: 'creator', tags: ['Creator','Form','On Submit'], desc: 'Run logic when a Creator form is submitted.', code: `// Creator On Submit script
name = input.Name;
email = input.Email;
department = input.Department;

// Auto-assign a manager based on department
if (department == "Sales")
{
  manager = "alice@company.com";
}
else if (department == "Engineering")
{
  manager = "bob@company.com";
}
else
{
  manager = "charlie@company.com";
}

// Update the record with the assigned manager
input.Assigned_Manager = manager;

// Send notification
sendmail
[
  from: zoho.adminuserid
  to: manager
  subject: "New team member: " + name
  message: name + " has joined " + department
];` },
  { title: 'Creator: Fetch & Filter Records', category: 'creator', tags: ['Creator','Query','Filter'], desc: 'Query Creator form records with criteria.', code: `// Fetch records from a Creator form
openTasks = Tasks[Status == "Open" && Priority == "High"];

count = 0;
for each task in openTasks
{
  info task.Task_Name + " — Due: " + task.Due_Date;
  count = count + 1;
}
info "Total high-priority open tasks: " + count;

// Update overdue tasks
today = zoho.currentdate;
overdue = Tasks[Status == "Open" && Due_Date < today];
for each t in overdue
{
  t.Status = "Overdue";
}` },
  { title: 'Creator: On Validate Script', category: 'creator', tags: ['Creator','Validate','Form'], desc: 'Validate form data before saving.', code: `// Creator On Validate script
email = input.Email;
phone = input.Phone;
age = input.Age;

// Email validation
if (!email.contains("@"))
{
  cancel submit;
  alert "Please enter a valid email address";
}

// Age validation
if (age < 18 || age > 120)
{
  cancel submit;
  alert "Age must be between 18 and 120";
}

// Phone format check
if (phone.length() < 10)
{
  cancel submit;
  alert "Phone number must be at least 10 digits";
}` },
  { title: 'Catalyst: ZCQL Data Store Query', category: 'catalyst', tags: ['Catalyst','ZCQL','Data Store'], desc: 'Query and manipulate Catalyst Data Store.', code: `// Catalyst ZCQL queries

// Select all active users
SELECT Name, Email, Role, Created_At
FROM Users
WHERE Status = 'active'
ORDER BY Created_At DESC
LIMIT 25;

// Count by role
SELECT Role, COUNT(ROWID) as Total
FROM Users
WHERE Status = 'active'
GROUP BY Role;

// Update user status
UPDATE Users
SET Status = 'inactive', Updated_At = '2026-03-27'
WHERE Last_Login < '2026-01-01';

// Delete old records
DELETE FROM SessionLogs
WHERE Created_At < '2025-01-01';` },
  { title: 'Catalyst: Node.js Serverless Function', category: 'catalyst', tags: ['Catalyst','Node.js','Function'], desc: 'A Catalyst serverless function in Node.js.', code: `// Catalyst Advanced I/O Function (Node.js)
const catalyst = require("zcatalyst-sdk-node");

module.exports = async (req, res) => {
  const app = catalyst.initialize(req);

  try {
    // Query Data Store
    const zcql = app.zcql();
    const query = "SELECT * FROM Products WHERE Category = 'Electronics'";
    const result = await zcql.executeZCQLQuery(query);

    // Process results
    const products = result.map(row => ({
      name: row.Products.Name,
      price: row.Products.Price,
      stock: row.Products.Stock
    }));

    res.status(200).json({ products, count: products.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};` },
  { title: 'Catalyst: File Store Upload', category: 'catalyst', tags: ['Catalyst','File Store','Upload'], desc: 'Upload and manage files in Catalyst File Store.', code: `// Catalyst File Store operations (Node.js)
const catalyst = require("zcatalyst-sdk-node");

module.exports = async (req, res) => {
  const app = catalyst.initialize(req);
  const fileStore = app.filestore();

  // Get folder
  const folder = fileStore.folder(FOLDER_ID);

  // Upload file
  const uploadedFile = await folder.uploadFile({
    code: req.files.document,
    name: req.files.document.name
  });

  // Get file details
  const fileDetails = await folder.getFileDetails(uploadedFile.id);

  res.status(200).json({
    message: "File uploaded successfully",
    fileId: uploadedFile.id,
    fileName: fileDetails.file_name,
    fileSize: fileDetails.file_size
  });
};` },
  { title: 'MCP: Zoho CRM Lookup Tool', category: 'mcp', tags: ['MCP','Tool','CRM'], desc: 'An MCP tool definition for looking up CRM records.', code: `// MCP Tool: Zoho CRM Record Lookup
{
  "name": "zoho_crm_lookup",
  "description": "Search for records in Zoho CRM by module and criteria",
  "inputSchema": {
    "type": "object",
    "properties": {
      "module": {
        "type": "string",
        "description": "CRM module name",
        "enum": ["Leads", "Contacts", "Deals", "Accounts"]
      },
      "search_field": {
        "type": "string",
        "description": "Field to search by (e.g. Email, Last_Name)"
      },
      "search_value": {
        "type": "string",
        "description": "Value to search for"
      }
    },
    "required": ["module", "search_field", "search_value"]
  }
}` },
  { title: 'MCP: Server Setup (Node.js)', category: 'mcp', tags: ['MCP','Server','Node.js'], desc: 'Basic MCP server setup with tool registration.', code: `// MCP Server with Zoho integration
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "zoho-mcp-server",
  version: "1.0.0"
});

// Register a tool
server.tool(
  "get_crm_record",
  "Fetch a record from Zoho CRM",
  {
    module: z.string().describe("CRM module"),
    recordId: z.string().describe("Record ID")
  },
  async ({ module, recordId }) => {
    // Call Zoho CRM API here
    const record = await fetchFromZohoCRM(module, recordId);
    return {
      content: [{
        type: "text",
        text: JSON.stringify(record, null, 2)
      }]
    };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);` },
  { title: 'Slack Notification from Deluge', category: 'api', tags: ['API','Slack','Webhook'], desc: 'Send a Slack message via webhook from Deluge.', code: `// Send Slack notification
webhookUrl = "https://hooks.slack.com/services/YOUR/WEBHOOK/URL";

slackMsg = Map();
slackMsg.put("text", "🎉 New deal closed!");
slackMsg.put("channel", "#sales");

attachments = List();
att = Map();
att.put("color", "#36a64f");
att.put("title", "Deal: " + input.Deal_Name);
att.put("text", "Amount: $" + input.Amount);
attachments.add(att);
slackMsg.put("attachments", attachments);

response = invokeurl
[
  url: webhookUrl
  type: POST
  body: slackMsg.toString()
];
info "Slack sent: " + response;` },
  { title: 'Date Calculations', category: 'crm', tags: ['Date','Utility'], desc: 'Common date calculations and formatting.', code: `// Date utility patterns
today = zoho.currentdate;
rightNow = now;

// Add/subtract days
nextWeek = today.addDay(7);
lastMonth = today.subDay(30);

// Format dates
formatted = today.toString("dd-MMM-yyyy");
info formatted;  // 27-Mar-2026

// Days between dates
startDate = "01-Jan-2026".toDate();
daysElapsed = daysBetween(startDate, today);
info "Days since Jan 1: " + daysElapsed;

// Check if weekend
dayOfWeek = today.toString("EEEE");
if (dayOfWeek == "Saturday" || dayOfWeek == "Sunday")
{
  info "It's the weekend!";
}` },
  { title: 'Error Handling Pattern', category: 'crm', tags: ['Error','Try-Catch','Utility'], desc: 'Robust error handling with logging.', code: `// Robust error handling pattern
try
{
  // Attempt API call
  response = invokeurl
  [
    url: "https://api.example.com/data"
    type: GET
  ];

  if (response.get("status") == "success")
  {
    data = response.get("data");
    info "Success: " + data.size() + " records";
  }
  else
  {
    info "API returned error: " + response.get("message");
  }
}
catch (e)
{
  // Log error details
  errorMsg = "API Error at " + now + ": " + e;
  info errorMsg;

  // Send alert email
  sendmail
  [
    from: zoho.adminuserid
    to: "admin@company.com"
    subject: "API Integration Error"
    message: errorMsg
  ];
}` },
];

const SNIPPET_CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'crm', label: 'CRM Operations' },
  { key: 'creator', label: 'Creator' },
  { key: 'catalyst', label: 'Catalyst' },
  { key: 'api', label: 'API / Webhooks' },
  { key: 'email', label: 'Email' },
  { key: 'mcp', label: 'MCP' },
];

let activeSnippetFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderSnippetFilters();
  renderSnippets();
  document.getElementById('snippet-search').addEventListener('input', renderSnippets);
});

function renderSnippetFilters() {
  const container = document.getElementById('snippet-filters');
  SNIPPET_CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-tab' + (cat.key === 'all' ? ' active' : '');
    const count = cat.key === 'all' ? SNIPPETS.length : SNIPPETS.filter(s => s.category === cat.key).length;
    btn.innerHTML = `${cat.label} <span class="count-badge">${count}</span>`;
    btn.onclick = () => {
      activeSnippetFilter = cat.key;
      document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      renderSnippets();
    };
    container.appendChild(btn);
  });
}

function renderSnippets() {
  const query = document.getElementById('snippet-search').value.toLowerCase();
  const list = document.getElementById('snippet-list');
  list.innerHTML = '';

  const filtered = SNIPPETS.filter(s => {
    const matchesFilter = activeSnippetFilter === 'all' || s.category === activeSnippetFilter;
    const matchesSearch = !query ||
      s.title.toLowerCase().includes(query) ||
      s.desc.toLowerCase().includes(query) ||
      s.tags.some(t => t.toLowerCase().includes(query)) ||
      s.code.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  if (filtered.length === 0) {
    list.innerHTML = '<div style="text-align:center;padding:48px;color:var(--text-muted);">No matching snippets found.</div>';
    return;
  }

  filtered.forEach(snippet => {
    const card = document.createElement('div');
    card.className = 'snippet-card fade-in';
    const tagClass = `tag-${snippet.category}`;
    card.innerHTML = `
      <div class="snippet-header">
        <span class="snippet-title">${snippet.title}</span>
        <div class="snippet-tags">
          ${snippet.tags.map(t => `<span class="snippet-tag ${tagClass}">${t}</span>`).join('')}
        </div>
      </div>
      <div class="snippet-desc">${snippet.desc}</div>
      <div class="snippet-code"><button class="copy-btn" onclick="copySnippet(this)">Copy</button>${escapeHtml(snippet.code)}</div>
    `;
    list.appendChild(card);
  });
}

function copySnippet(btn) {
  const codeBlock = btn.parentElement;
  const code = codeBlock.textContent.replace('Copy', '').replace('✓ Copied', '').trim();
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
