:root {
  --primary: #002855;       /* Navy Aroya */
  --accent: #0056b3;
  --bg: #f8fafc;
  --card-bg: #ffffff;
  --text-main: #1e293b;
  --text-muted: #64748b;
  
  /* Status Colors */
  --ok: #10b981;
  --warn: #f59e0b;
  --bad: #ef4444;
  
  --radius: 12px;
  --shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

* { box-sizing: border-box; transition: all 0.2s ease; }

body {
  font-family: 'Inter', -apple-system, sans-serif;
  background-color: var(--bg);
  color: var(--text-main);
  margin: 0;
  line-height: 1.5;
}

.container {
  max-width: 1300px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Header Design */
header {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.logo-preview {
  width: 80px;
  height: 80px;
  background: white;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow);
  border: 1px solid #f1f5f9;
}

.logo-preview img { max-width: 80%; }

h1 {
  font-size: 28px;
  font-weight: 800;
  margin: 0;
  color: var(--primary);
  letter-spacing: -0.5px;
}

.sub { color: var(--text-muted); font-size: 14px; }

/* Grid Layout */
.grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 30px;
}

.card {
  background: var(--card-bg);
  padding: 28px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  border: 1px solid rgba(255,255,255,0.7);
}

h3, h4 { margin-top: 0; color: var(--primary); font-weight: 700; }

/* Form Elements */
.input-group {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 12px;
  margin-bottom: 20px;
}

input, select {
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #fdfdfd;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(0, 86, 179, 0.1);
}

button {
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

button:not(.secondary) {
  background: var(--primary);
  color: white;
}

button:not(.secondary):hover {
  background: #001a3a;
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

button.secondary {
  background: #f1f5f9;
  color: var(--text-main);
}

button.secondary:hover { background: #e2e8f0; }

/* Timeline Tasks */
.task {
  display: flex;
  align-items: center;
  padding: 18px;
  margin-bottom: 12px;
  background: white;
  border-radius: 12px;
  border-left: 6px solid #cbd5e1;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  border-top: 1px solid #f1f5f9;
  border-right: 1px solid #f1f5f9;
  border-bottom: 1px solid #f1f5f9;
}

/* Color coding by status */
.task.status-ok { border-left-color: var(--ok); }
.task.status-near { border-left-color: var(--warn); }
.task.status-past { border-left-color: var(--bad); }

.task:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow);
}

.task .meta { flex: 1; }
.task .title { font-weight: 700; font-size: 16px; margin-bottom: 4px; }

.tag {
  background: #eff6ff;
  color: var(--accent);
  padding: 2px 10px;
  border-radius: 6px;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.5px;
}

/* Legend & Footer */
.pill {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

footer {
  margin-top: 60px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-muted);
}

@media (max-width: 900px) {
  .grid { grid-template-columns: 1fr; }
  .input-group { grid-template-columns: 1fr; }
}
