<template>
  <div class="layout">
    <!-- Sidebar -->
    <aside class="sidebar">
      <div class="sidebar-logo">ObservaAção</div>
      <nav class="sidebar-nav">
        <router-link to="/cidadao">📋 Novo Protocolo</router-link>
        <router-link to="/consultar">🔍 Consultar Protocolo</router-link>
        <router-link to="/consultar-cpf">👤 Consultar por CPF</router-link>
      </nav>
      <div class="sidebar-home">
        <router-link to="/">🏠 Início</router-link>
      </div>
    </aside>

    <!-- Conteúdo -->
    <main class="main-content">
      <router-link to="/" class="voltar">← Voltar</router-link>
      <h1 class="page-title">Novo Protocolo</h1>

      <div v-if="sucesso" class="msg-success">
        ✅ Solicitação criada! Seu protocolo: <strong>#{{ protocoloCriado }}</strong>. Guarde esse número!
      </div>
      <div v-if="erro" class="msg-error">{{ erro }}</div>

      <div class="card">
        <!-- Anônimo -->
        <div class="form-group">
          <label>Solicitação Anônima?</label>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" v-model="form.anonima" :value="true" /> Sim
            </label>
            <label class="radio-label">
              <input type="radio" v-model="form.anonima" :value="false" /> Não
            </label>
          </div>
        </div>

        <!-- Nome e CPF (só se não for anônimo) -->
        <template v-if="!form.anonima">
          <div class="form-group">
            <label>Nome completo</label>
            <input v-model="form.nomeCidadao" type="text" placeholder="Digite seu nome" />
          </div>
          <div class="form-group">
            <label>CPF</label>
            <input v-model="form.cpfCidadao" type="text" placeholder="Digite seu CPF" />
          </div>
        </template>

        <!-- Categoria -->
        <div class="form-group">
          <label>Categoria</label>
          <select v-model="form.categoria">
            <option value="" disabled>Selecione uma categoria</option>
            <option value="ILUMINACAO">Iluminação</option>
            <option value="BURACO">Buraco</option>
            <option value="PODA">Poda</option>
            <option value="SAUDE">Saúde</option>
            <option value="ZELADORIA">Zeladoria</option>
            <option value="DENUNCIA">Denúncia</option>
          </select>
        </div>

        <!-- Descrição -->
        <div class="form-group">
          <label>Descrição do problema</label>
          <textarea v-model="form.descricao" rows="5" placeholder="Descreva o problema..."></textarea>
        </div>

        <!-- Localização -->
        <div class="form-group">
          <label>Localização/Bairro</label>
          <input v-model="form.localizacao" type="text" placeholder="Digite sua localização" />
        </div>

        <!-- Prioridade -->
        <div class="form-group">
          <label>Prioridade</label>
          <div class="radio-group">
            <label class="radio-label">
              <input type="radio" v-model="form.prioridade" value="BAIXA" /> Baixa
            </label>
            <label class="radio-label">
              <input type="radio" v-model="form.prioridade" value="MEDIA" /> Média
            </label>
            <label class="radio-label">
              <input type="radio" v-model="form.prioridade" value="ALTA" /> Alta
            </label>
          </div>
        </div>

        <button class="btn-primary btn-enviar" @click="enviar" :disabled="carregando">
          {{ carregando ? 'Enviando...' : 'Enviar' }}
        </button>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { api } from '../services/api.js'

const sucesso = ref(false)
const erro = ref('')
const carregando = ref(false)
const protocoloCriado = ref(null)

const form = reactive({
  anonima: false,
  nomeCidadao: '',
  cpfCidadao: '',
  categoria: '',
  descricao: '',
  localizacao: '',
  prioridade: 'BAIXA'
})

async function enviar() {
  erro.value = ''
  sucesso.value = false

  if (!form.categoria || !form.descricao || !form.localizacao) {
    erro.value = 'Preencha todos os campos obrigatórios.'
    return
  }
  if (!form.anonima && (!form.nomeCidadao || !form.cpfCidadao)) {
    erro.value = 'Nome e CPF são obrigatórios para solicitações identificadas.'
    return
  }

  try {
    carregando.value = true
    const resposta = await api.criarSolicitacao(form)
    protocoloCriado.value = resposta.id
    sucesso.value = true

    // Limpa o formulário
    Object.assign(form, {
      anonima: false, nomeCidadao: '', cpfCidadao: '',
      categoria: '', descricao: '', localizacao: '', prioridade: 'BAIXA'
    })
  } catch (e) {
    erro.value = 'Erro ao enviar solicitação. Verifique se o backend está rodando.'
  } finally {
    carregando.value = false
  }
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
.voltar:hover { color: #1a56db; }

.page-title {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.radio-group {
  display: flex;
  gap: 24px;
  margin-top: 4px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;
}

.radio-label input[type="radio"] {
  width: auto;
}

.btn-enviar {
  width: 200px;
  padding: 12px;
  margin-top: 8px;
}
</style>
