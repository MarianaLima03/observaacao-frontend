<template>
  <router-view />
</template>

<script setup>
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f0f2f5;
  color: #333;
}


.btn-primary {
  background-color: #1a56db;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-primary:hover { background-color: #1642b0; }

.btn-danger {
  background-color: #e02424;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
}
.btn-danger:hover { background-color: #b91c1c; }

.btn-secondary {
  background-color: #6b7280;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
}
.btn-secondary:hover { background-color: #4b5563; }


input, select, textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border 0.2s;
}
input:focus, select:focus, textarea:focus {
  border-color: #1a56db;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #374151;
}

.layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 240px;
  background-color: white;
  border-right: 1px solid #e5e7eb;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
}

.sidebar-logo {
  font-size: 20px;
  font-weight: 700;
  color: #1a56db;
  padding: 0 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.sidebar-nav {
  flex: 1;
  padding: 16px 0;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  color: #374151;
  text-decoration: none;
  font-size: 14px;
  border-radius: 0;
  transition: background 0.15s;
}
.sidebar-nav a:hover,
.sidebar-nav a.router-link-active {
  background-color: #eff6ff;
  color: #1a56db;
  font-weight: 600;
}

.sidebar-home {
  padding: 16px 20px;
  border-top: 1px solid #e5e7eb;
}
.sidebar-home a {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;
}
.sidebar-home a:hover { color: #1a56db; }

.main-content {
  flex: 1;
  padding: 32px 40px;
}


.card {
  background: white;
  border-radius: 10px;
  padding: 28px;
  border: 1px solid #e5e7eb;
}

.msg-success {
  background: #f0fdf4;
  border: 1px solid #86efac;
  color: #166534;
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 14px;
}
.msg-error {
  background: #fef2f2;
  border: 1px solid #fca5a5;
  color: #991b1b;
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 14px;
}


table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}
th {
  background: #f9fafb;
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
}
td {
  padding: 12px 16px;
  border-bottom: 1px solid #f3f4f6;
  color: #4b5563;
}
tr:last-child td { border-bottom: none; }
tr:hover td { background: #f9fafb; }


.badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
}
.badge-aberto     { background: #eff6ff; color: #1d4ed8; }
.badge-triagem    { background: #fefce8; color: #854d0e; }
.badge-execucao   { background: #fff7ed; color: #c2410c; }
.badge-resolvido  { background: #f0fdf4; color: #166534; }
.badge-encerrado  { background: #f3f4f6; color: #4b5563; }
</style>
