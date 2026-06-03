<template>
  <div class="layout">
   
    <aside class="sidebar">
      <div class="sidebar-logo">ObservaAção</div>
      <nav class="sidebar-nav">
        <router-link to="/cidadao">📋 Novo Protocolo</router-link>
        <router-link to="/consultar">🔍 Consultor Protocolo</router-link>
        <router-link to="/consultar-cpf">👤 Consultar po CPF</router-link>
      </nav>
      <div class="sidebar-home">
        <router-link to="/">🏠 Inicio</router-link>
      </div>
    </aside>

   
    <main class="main-content">
      <router-link to="/" class="voltar">← Voltar</router-link>
      <h1 class="page-title">Consultar por CPF</h1>

      <div class="card">
        <label>Digite o CPF</label>
        <div class="search-row">
          <input v-model="cpf" type="text" placeholder="Digite seu CPF" />
          <button class="btn-primary" @click="buscar" :disabled="carregando">
            {{ carregando ? '...' : 'BUSCAR' }}
          </button>
        </div>

        <div v-if="buscou && resultados.length === 0" class="msg-error">
          Nenhuma solicitação encontrada para esse CPF.
        </div>

        
        <div v-if="resultados.length > 0">
          <h3 class="tabela-titulo">Protocolos Encontrados</h3>
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Data</th>
                <th>Descrição</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="s in resultados" :key="s.id">
                <td><strong>#{{ s.id }}</strong></td>
                <td>{{ formatarData(s.dataCriacao) }}</td>
                <td>{{ s.descricao }}</td>
                <td>
                  <span :class="badgeClass(s.statusAtual)" class="badge">
                    {{ statusLabel(s.statusAtual) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { api } from '../services/api.js'

const cpf = ref('')
const resultados = ref([])
const buscou = ref(false)
const carregando = ref(false)

async function buscar() {
  buscou.value = false
  resultados.value = []
  if (!cpf.value) return

  try {
    carregando.value = true
    resultados.value = await api.buscarPorCpf(cpf.value)
    buscou.value = true
  } catch (e) {
    buscou.value = true
  } finally {
    carregando.value = false
  }
}

function formatarData(data) {
  if (!data) return '—'
  return new Date(data).toLocaleDateString('pt-BR')
}

function statusLabel(status) {
  const map = {
    ABERTO: 'Aberto', TRIAGEM: 'Em Análise',
    EM_EXECUCAO: 'Em Execução', RESOLVIDO: 'Resolvido', ENCERRADO: 'Encerrado'
  }
  return map[status] || status
}

function badgeClass(status) {
  const map = {
    ABERTO: 'badge-aberto', TRIAGEM: 'badge-triagem',
    EM_EXECUCAO: 'badge-execucao', RESOLVIDO: 'badge-resolvido', ENCERRADO: 'badge-encerrado'
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
.search-row input { flex: 1; }
.tabela-titulo {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #374151;
}
</style>
