<template>
  <div class="home-wrapper">
    <header class="home-header">
      <span class="home-logo">ObservaAção</span>
    </header>

    <div class="home-body">
      <div class="home-card">
        <h1>Bem-vindo!</h1>
        <p class="home-sub">Como deseja acessar o sistema?</p>

        <div class="home-options">
          <div class="option-card">
            <div class="option-icon">👤</div>
            <h2>Cidadão</h2>
            <p>Registrar e consultar protocolo de problemas</p>
            <router-link to="/cidadao" class="btn-primary">ACESSAR</router-link>
          </div>
          <div class="option-card">
            <div class="option-icon">🛡️</div>
            <h2>Gestor</h2>
            <p>Gerenciar e acompanhar os protocolos.</p>
            <router-link to="/login" class="btn-primary">ACESSAR</router-link>
          </div>
        </div>

        <p class="home-help">
          Preciso de ajuda?
          <a href="https://wa.me/5544997577363" target="_blank">Entre em contato conosco</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
}

.home-header {
  background: white;
  padding: 16px 32px;
  border-bottom: 1px solid #e5e7eb;
}

.home-logo {
  font-size: 20px;
  font-weight: 700;
  color: #1a56db;
}

.home-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.home-card {
  background: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  border: 1px solid #e5e7eb;
  max-width: 680px;
  width: 100%;
}

.home-card h1 {
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 8px;
}

.home-sub {
  color: #6b7280;
  margin-bottom: 32px;
  font-size: 15px;
}

.home-options {
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-bottom: 32px;
}

.option-card {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 28px 24px;
  width: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.option-icon {
  font-size: 36px;
}

.option-card h2 {
  font-size: 17px;
  font-weight: 700;
}

.option-card p {
  font-size: 13px;
  color: #6b7280;
  text-align: center;
  line-height: 1.5;
}

.option-card .btn-primary {
  margin-top: 8px;
  text-decoration: none;
  display: inline-block;
  border-radius: 6px;
  padding: 8px 22px;
  background: #111827;
  color: white;
  font-size: 13px;
  font-weight: 600;
}
.option-card .btn-primary:hover {
  background: #374151;
}

.home-help {
  font-size: 13px;
  color: #6b7280;
}
.home-help a {
  color: #1a56db;
  font-weight: 600;
  text-decoration: none;
}
</style>
