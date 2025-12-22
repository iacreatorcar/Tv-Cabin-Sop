const timelineEl = document.getElementById('timeline');
const tasksKey = 'tv_sop_tasks_v2';

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

function render() {
  const tasks = loadTasks();
  timelineEl.innerHTML = '';
  tasks.sort((x, y) => new Date(x.due) - new Date(y.due));
  
  tasks.forEach((t, idx) => {
    const el = document.createElement('div');
    el.className = 'task';
    const now = new Date();
    const daysLeft = daysBetween(now.toISOString().slice(0, 10), t.due);
    
    let status = 'ok';
    if (daysLeft < 0) status = 'past';
    else if (daysLeft <= t.sla) status = 'near';

    const color = status === 'ok' ? 'var(--ok)' : status === 'near' ? 'var(--warn)' : 'var(--bad)';

    el.innerHTML = `
      <div style="width:12px;height:12px;border-radius:50%;background:${color}"></div>
      <div class="meta">
        <div class="title">${t.title} <span class="tag">${t.dept || ''}</span></div>
        <div class="small">Due: ${t.due} • SLA: ${t.sla} days • Remaining: ${daysLeft} days</div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="secondary" onclick="editTask(${idx})">Edit</button>
        <button class="secondary" onclick="deleteTask(${idx})">Delete</button>
      </div>`;
    timelineEl.appendChild(el);
  });
}

function addTask() {
  const title = document.getElementById('taskTitle').value.trim();
  const dept = document.getElementById('taskDept').value.trim();
  const due = document.getElementById('taskDue').value;
  const sla = parseInt(document.getElementById('taskSLA').value || 0, 10);
  
  if (!title || !due) {
    alert('Please enter title and due date');
    return;
  }
  
  const arr = loadTasks();
  arr.push({ title, dept, due, sla });
  saveTasks(arr);
  render();
  
  // Reset campi
  document.getElementById('taskTitle').value = '';
  document.getElementById('taskDept').value = '';
  document.getElementById('taskDue').value = '';
  document.getElementById('taskSLA').value = '';
}

window.deleteTask = function(i) {
  const arr = loadTasks();
  arr.splice(i, 1);
  saveTasks(arr);
  render();
};

window.editTask = function(i) {
  const arr = loadTasks();
  const t = arr[i];
  const newTitle = prompt('Task title', t.title);
  if (newTitle === null) return;
  const newDue = prompt('Deadline (YYYY-MM-DD)', t.due);
  if (newDue === null) return;
  const newSla = prompt('SLA (days)', t.sla);
  if (newSla === null) return;
  
  t.title = newTitle;
  t.due = newDue;
  t.sla = parseInt(newSla, 10) || 0;
  saveTasks(arr);
  render();
};

document.getElementById('addTaskBtn').addEventListener('click', addTask);

document.getElementById('clearAll').addEventListener('click', () => {
  if (confirm('Clear all tasks?')) {
    localStorage.removeItem(tasksKey);
    render();
  }
});

// Gestione Logo
const logoInput = document.getElementById('logoInput');
const logoPreview = document.getElementById('logoPreview');
logoInput.addEventListener('change', (e) => {
  const f = e.target.files[0];
  if (!f) return;
  const reader = new FileReader();
  reader.onload = () => {
    logoPreview.innerHTML = '';
    const img = document.createElement('img');
    img.src = reader.result;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';
    logoPreview.appendChild(img);
  };
  reader.readAsDataURL(f);
});

document.getElementById('saveSettings').addEventListener('click', () => {
  const s = {
    projectTitleEN: document.getElementById('projectTitleEN').value,
    hotelDirector: document.getElementById('hotelDirector').value,
    fleetSupervisor: document.getElementById('fleetSupervisor').value,
  };
  localStorage.setItem('tv_sop_settings', JSON.stringify(s));
  alert('Settings saved');
});

document.getElementById('loadDemo').addEventListener('click', () => {
  const demo = [
    { title: 'Kids Content Delivery', dept: 'Kids', due: nextDate(3), sla: 5 },
    { title: 'Promotional Trailer Production', dept: 'Digital', due: nextDate(7), sla: 7 },
    { title: 'Fleet Supervisor Approval', dept: 'Marketing & Revenue', due: nextDate(2), sla: 2 }
  ];
  saveTasks(demo);
  render();
});

function nextDate(addDays) {
  const d = new Date();
  d.setDate(d.getDate() + addDays);
  return d.toISOString().slice(0, 10);
}

document.getElementById('exportPdf').addEventListener('click', () => {
  const clone = document.createElement('div');
  clone.style.padding = '24px';
  clone.style.background = 'white';
  clone.style.color = 'black';
  clone.style.fontFamily = 'Arial, sans-serif';
  
  const settings = JSON.parse(localStorage.getItem('tv_sop_settings') || '{}');
  const header = `<h2>${settings.projectTitleEN || document.getElementById('projectTitleEN').value}</h2>`;
  
  clone.innerHTML = header + `<p>Generated by: Dalise Carmine — Digital Lead • carmine.dalise@aroyacruises.com</p>`;
  const tasks = loadTasks();
  clone.innerHTML += '<ol>' + tasks.map(t => `<li><strong>${t.title}</strong> — Dept: ${t.dept} — Due: ${t.due} — SLA: ${t.sla} days</li>`).join('') + '</ol>';
  
  const opt = {
    margin: 0.4,
    filename: (settings.projectTitleEN || 'TV_Cabin_Guest_SOP') + '.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(clone).save();
});

document.getElementById('printBtn').addEventListener('click', () => window.print());

// Inizializzazione
render();
