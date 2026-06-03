<template>
  <div class="login-wrapper">
    <div class="login-card">
      <div class="login-icon">🛡️</div>
      <h1>Login do Gestor</h1>
      <p class="login-sub">Acesse o sistema administrativo</p>

      <div v-if="erro" class="msg-error">{{ erro }}</div>

      <div class="form-group">
        <label>Usuário</label>
        <input v-model="usuario" type="text" placeholder="Digite seu usuário" />
      </div>

      <div class="form-group">
        <label>Senha</label>
        <input v-model="senha" type="password" placeholder="Digite sua senha" />
      </div>

      <button class="btn-primary btn-full" @click="entrar">ENTRAR</button>

      <a href="#" class="login-forgot">Esqueci minha senha</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const usuario = ref('')
const senha = ref('')
const erro = ref('')

function entrar() {
  // Credenciais fixas do gestor (igual à 1ª entrega: admin / 123)
  if (usuario.value === 'admin' && senha.value === '123') {
    router.push('/gestor')
  } else {
    erro.value = 'Usuário ou senha inválidos.'
  }
}
</script>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
}

.login-card {
  background: white;
  border-radius: 12px;
  padding: 40px 36px;
  width: 100%;
  max-width: 380px;
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.login-icon {
  font-size: 40px;
}

.login-card h1 {
  font-size: 20px;
  font-weight: 700;
}

.login-sub {
  color: #6b7280;
  font-size: 13px;
  margin-top: -8px;
}

.form-group {
  width: 100%;
}

.btn-full {
  width: 100%;
  padding: 12px;
  font-size: 15px;
  letter-spacing: 0.5px;
  margin-top: 4px;
}

.login-forgot {
  color: #1a56db;
  font-size: 13px;
  text-decoration: none;
}
.login-forgot:hover { text-decoration: underline; }
</style>
