const timelineEl = document.getElementById('timeline');
const tasksKey = 'tv_sop_tasks_v3';

// Caricamento dati
function loadTasks() {
  const raw = localStorage.getItem(tasksKey);
  return raw ? JSON.parse(raw) : [];
}

function saveTasks(arr) {
  localStorage.setItem(tasksKey, JSON.stringify(arr));
}

function daysBetween(a, b) {
  const ms = (new Date(b) - new Date(a));
  return Math.ceil(ms / (1000 * 3600 * 24));
}

// Rendering della UI
function render() {
  const tasks = loadTasks();
  timelineEl.innerHTML = '';
  tasks.sort((x, y) => new Date(x.due) - new Date(y.due));
  
  tasks.forEach((t, idx) => {
    const el = document.createElement('div');
    const now = new Date();
    const daysLeft = daysBetween(now.toISOString().slice(0, 10), t.due);
    
    let statusClass = 'status-ok';
    if (daysLeft < 0) statusClass = 'status-past';
    else if (daysLeft <= (t.sla || 3)) statusClass = 'status-near';

    el.className = `task ${statusClass}`;
    el.innerHTML = `
      <div class="task-info">
        <div class="title">${t.title} <span style="font-weight:400; opacity:0.6; font-size:12px;">| ${t.dept}</span></div>
        <div class="meta">Deadline: ${t.due} • SLA: ${t.sla}d • <strong>Remaining: ${daysLeft}d</strong></div>
      </div>
      <div style="display:flex; gap:5px;">
        <button class="secondary" style="padding:5px 10px;" onclick="deleteTask(${idx})">✕</button>
      </div>
    `;
    timelineEl.appendChild(el);
  });
}

// Funzioni Operative
function addTask() {
  const title = document.getElementById('taskTitle').value.trim();
  const dept = document.getElementById('taskDept').value.trim() || 'General';
  const due = document.getElementById('taskDue').value;
  const sla = parseInt(document.getElementById('taskSLA').value || 0, 10);
  
  if (!title || !due) { alert('Please enter title and date'); return; }
  
  const arr = loadTasks();
  arr.push({ title, dept, due, sla });
  saveTasks(arr);
  render();
  
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDue').value = '';
}

window.deleteTask = function(i) {
  const arr = loadTasks();
  arr.splice(i, 1);
  saveTasks(arr);
  render();
};

document.getElementById('addTaskBtn').addEventListener('click', addTask);

document.getElementById('clearAll').addEventListener('click', () => {
  if (confirm('Clear all tasks?')) { localStorage.removeItem(tasksKey); render(); }
});

// Settings & Logo
document.getElementById('saveSettings').addEventListener('click', () => {
  const s = {
    title: document.getElementById('projectTitleEN').value,
    director: document.getElementById('hotelDirector').value
  };
  localStorage.setItem('tv_sop_settings_v3', JSON.stringify(s));
  alert('Configuration Saved');
});

document.getElementById('loadDemo').addEventListener('click', () => {
  const demo = [
    { title: 'Kids Channel Update', dept: 'Digital', due: '2024-12-30', sla: 5 },
    { title: 'Safety Video Upload', dept: 'IT', due: '2024-12-25', sla: 2 }
  ];
  saveTasks(demo);
  render();
});

// Export PDF
document.getElementById('exportPdf').addEventListener('click', () => {
  const element = document.querySelector('.container');
  const opt = {
    margin: 0.5,
    filename: 'TV_Cabin_SOP_Report.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(element).save();
});

// Inizializza
render();
