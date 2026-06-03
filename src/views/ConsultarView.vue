<template>
  <div class="layout">
   
    <aside class="sidebar">
      <div class="sidebar-logo">ObservaAção</div>
      <nav class="sidebar-nav">
        <router-link to="/cidadao">📋 Novo Protocolo</router-link>
        <router-link to="/consultar">🔍 Consultar Protocolos</router-link>
        <router-link to="/consultar-cpf">👤 Consultar por CPF</router-link>
      </nav>
      <div class="sidebar-home">
        <router-link to="/">🏠 home</router-link>
      </div>
    </aside>

   
    <main class="main-content">
      <router-link to="/" class="voltar">← Voltar</router-link>
      <h1 class="page-title">Consultar Protocolo</h1>

      <div class="card">
        <label>Digite o Código do Protocolo:</label>
        <div class="search-row">
          <input v-model="codigo" type="number" placeholder="Digite o Código do Protocolo:" />
          <button class="btn-primary" @click="consultar" :disabled="carregando">
            {{ carregando ? '...' : 'CONSULTAR' }}
          </button>
        </div>

       
        <div v-if="naoEncontrado" class="msg-error">
          Nenhuma solicitação encontrada com o código informado.
        </div>

       
        <div v-if="resultado" class="resultado">
          <h3>Resultado da consulta:</h3>
          <div class="resultado-card">
            <div class="resultado-linha">
              <span class="resultado-label">Código:</span>
              <strong>#{{ resultado.id }}</strong>
            </div>
            <div class="resultado-linha">
              <span class="resultado-label">Status:</span>
              <span :class="badgeClass(resultado.statusAtual)" class="badge">
                {{ resultado.statusAtual }}
              </span>
            </div>
            <div class="resultado-linha">
              <span class="resultado-label">Categoria:</span>
              <span>{{ resultado.categoria }}</span>
            </div>
            <div class="resultado-linha">
              <span class="resultado-label">Descrição:</span>
              <span>{{ resultado.descricao }}</span>
            </div>
            <div class="resultado-linha">
              <span class="resultado-label">Localização:</span>
              <span>{{ resultado.localizacao }}</span>
            </div>
            <div class="resultado-linha">
              <span class="resultado-label">Prioridade:</span>
              <span>{{ resultado.prioridade }}</span>
            </div>
            <div class="resultado-linha">
              <span class="resultado-label">Prazo:</span>
              <span>{{ resultado.prazo }} dias</span>
            </div>
            <div class="resultado-linha">
              <span class="resultado-label">Anônima:</span>
              <span>{{ resultado.anonima ? 'Sim' : 'Não' }}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { api } from '../services/api.js'

const codigo = ref('')
const resultado = ref(null)
const naoEncontrado = ref(false)
const carregando = ref(false)

async function consultar() {
  resultado.value = null
  naoEncontrado.value = false

  if (!codigo.value) return

  try {
    carregando.value = true
    const dados = await api.buscarPorId(codigo.value)
    if (dados) {
      resultado.value = dados
    } else {
      naoEncontrado.value = true
    }
  } catch (e) {
    naoEncontrado.value = true
  } finally {
    carregando.value = false
  }
}

function badgeClass(status) {
  const map = {
    ABERTO: 'badge-aberto',
    TRIAGEM: 'badge-triagem',
    EM_EXECUCAO: 'badge-execucao',
    RESOLVIDO: 'badge-resolvido',
    ENCERRADO: 'badge-encerrado'
  }
  return map[status] || 'badge-aberto'
}
</script>

<style scoped>
.voltar {
  display: inline-block;
  color: #6b7280;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 16px;
}
.page-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 24px;
}
.search-row {
  display: flex;
  gap: 12px;
  margin-top: 8px;
  margin-bottom: 24px;
}
.search-row input {
  flex: 1;
}
.resultado h3 {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #374151;
}
.resultado-card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.resultado-linha {
  display: flex;
  gap: 16px;
  font-size: 14px;
}
.resultado-label {
  font-weight: 600;
  min-width: 100px;
  color: #374151;
}
</style>
