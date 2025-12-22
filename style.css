/* Sostituisci la funzione render() esistente nel tuo js/script.js con questa */

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
    else if (daysLeft <= t.sla) statusClass = 'status-near';

    el.className = `task ${statusClass}`;

    el.innerHTML = `
      <div class="meta">
        <div class="title">${t.title} <span class="tag">${t.dept || 'General'}</span></div>
        <div class="sub">Deadline: <strong>${t.due}</strong> • SLA: ${t.sla} days • <span style="color:${daysLeft < 0 ? 'var(--bad)' : 'inherit'}">Remaining: ${daysLeft} days</span></div>
      </div>
      <div style="display:flex; gap:10px">
        <button class="secondary" style="padding:6px 12px" onclick="editTask(${idx})">Edit</button>
        <button class="secondary" style="padding:6px 12px; color:var(--bad)" onclick="deleteTask(${idx})">✕</button>
      </div>`;
    timelineEl.appendChild(el);
  });
}
