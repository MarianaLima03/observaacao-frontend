<template>
  <div class="layout">
    
    <aside class="sidebar">
      <div class="sidebar-logo">ObservaAção</div>
      <nav class="sidebar-nav">
        <router-link to="/gestor">👤 Gerenciar Protocolos</router-link>
      </nav>
      <div class="sidebar-home">
        <router-link to="/">🏠 home</router-link>
      </div>
    </aside>

    
    <main class="main-content">
      <h1 class="page-title">Gerenciar Protocolos</h1>
      <p class="page-sub">Todos os protocolos</p>

      <div v-if="erro" class="msg-error">{{ erro }}</div>
      <div v-if="sucesso" class="msg-success">{{ sucesso }}</div>

      <div class="card">
        <table>
  <thead>
    <tr>
      <th>Código</th>
      <th>Nome</th>
      <th>Descrição</th>
      <th>Prioridade</th>
      <th>Prazo</th>
      <th>Status</th>
      <th>Ações</th>
    </tr>
  </thead>
  <tbody>
    <tr v-if="solicitacoes.length === 0">
      <td colspan="7" style="text-align:center; color:#9ca3af;">
        Nenhuma solicitação cadastrada.
      </td>
    </tr>
    <tr v-for="s in solicitacoes" :key="s.id">
      <td><strong>#{{ s.id }}</strong></td>
      <td>{{ s.anonima ? 'Anônimo' : (s.nomeCidadao || '—') }}</td>
      <td>{{ s.descricao }}</td>
      <td>
        <span :class="prioridadeClass(s.prioridade)" class="badge">
          {{ s.prioridade }}
        </span>
      </td>
      <td>{{ s.prazo }} dias</td>
      <td>
        <span :class="badgeClass(s.statusAtual)" class="badge">
          {{ statusLabel(s.statusAtual) }}
        </span>
      </td>
      <td class="acoes">
        <button class="btn-editar" @click="abrirModal(s)" title="Editar status">✏️</button>
        <button class="btn-danger" @click="deletar(s.id)" title="Remover">🗑️</button>
      </td>
    </tr>
  </tbody>
</table>

        
        <div class="legenda">
          <strong>Legenda de Status:</strong>
          <span class="badge badge-aberto">Aberto</span>
          <span class="badge badge-triagem">Em Análise</span>
          <span class="badge badge-execucao">Em Execução</span>
          <span class="badge badge-resolvido">Resolvido ✓</span>
          <span class="badge badge-encerrado">Encerrado</span>
        </div>
      </div>
    </main>

   
    <div v-if="modalAberto" class="modal-overlay" @click.self="fecharModal">
      <div class="modal">
        <h2>Atualizar Status</h2>
        <p class="modal-sub">Protocolo <strong>#{{ selecionado?.id }}</strong></p>

        <div class="form-group">
          <label>Novo Status</label>
          <select v-model="novoStatus">
            <option value="ABERTO">Aberto</option>
            <option value="TRIAGEM">Triagem / Em Análise</option>
            <option value="EM_EXECUCAO">Em Execução</option>
            <option value="RESOLVIDO">Resolvido</option>
            <option value="ENCERRADO">Encerrado</option>
          </select>
        </div>

        <div class="form-group">
          <label>Comentário <span class="obrigatorio">(obrigatório)</span></label>
          <textarea v-model="comentario" rows="3" placeholder="Descreva o andamento..."></textarea>
        </div>

        <div class="modal-botoes">
          <button class="btn-primary" @click="salvarStatus">Salvar</button>
          <button class="btn-secondary" @click="fecharModal">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../services/api.js'

const solicitacoes = ref([])
const erro = ref('')
const sucesso = ref('')
const modalAberto = ref(false)
const selecionado = ref(null)
const novoStatus = ref('ABERTO')
const comentario = ref('')

onMounted(() => {
  carregar()
})

async function carregar() {
  try {
    solicitacoes.value = await api.listarTodas()
  } catch (e) {
    erro.value = 'Erro ao carregar solicitações. Verifique se o backend está rodando.'
  }
}

function abrirModal(s) {
  selecionado.value = s
  novoStatus.value = s.statusAtual
  comentario.value = ''
  modalAberto.value = true
}

function fecharModal() {
  modalAberto.value = false
  selecionado.value = null
}

async function salvarStatus() {
  erro.value = ''
  sucesso.value = ''

  if (!comentario.value.trim()) {
    erro.value = 'O comentário é obrigatório para atualizar o status.'
    return
  }

  try {
    await api.atualizarStatus(selecionado.value.id, novoStatus.value, comentario.value, 'admin')
    sucesso.value = `Status do protocolo #${selecionado.value.id} atualizado com sucesso!`
    fecharModal()
    await carregar()
  } catch (e) {
    erro.value = 'Erro ao atualizar status.'
  }
}

async function deletar(id) {
  if (!confirm(`Tem certeza que deseja remover o protocolo #${id}?`)) return

  try {
    await api.deletar(id)
    sucesso.value = `Protocolo #${id} removido com sucesso.`
    await carregar()
  } catch (e) {
    erro.value = 'Erro ao remover solicitação.'
  }
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
function prioridadeClass(prioridade) {
  const map = {
    ALTA: 'badge-execucao',
    MEDIA: 'badge-triagem',
    BAIXA: 'badge-aberto'
  }
  return map[prioridade] || 'badge-aberto'
}
</script>

<style scoped>
.page-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 4px;
}
.page-sub {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 20px;
}
.acoes {
  display: flex;
  gap: 8px;
}
.btn-editar {
  background: none;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 15px;
}
.btn-editar:hover { background: #f3f4f6; }

.legenda {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  flex-wrap: wrap;
  font-size: 13px;
}


.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}
.modal {
  background: white;
  border-radius: 12px;
  padding: 32px;
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.modal h2 {
  font-size: 18px;
  font-weight: 700;
}
.modal-sub {
  font-size: 13px;
  color: #6b7280;
  margin-top: -10px;
}
.obrigatorio {
  color: #e02424;
  font-weight: 400;
  font-size: 12px;
}
.modal-botoes {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

</style>
