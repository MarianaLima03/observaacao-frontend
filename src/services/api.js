// Toda comunicação com o backend Spring Boot fica aqui
const BASE_URL = '/api/solicitacoes'

export const api = {

  // POST /solicitacoes — Criar nova solicitação (Cidadão)
  async criarSolicitacao(dados) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
    if (!response.ok) throw new Error('Erro ao criar solicitação')
    return response.json()
  },

  // GET /solicitacoes/{id} — Buscar por protocolo (Cidadão)
  async buscarPorId(id) {
    const response = await fetch(`${BASE_URL}/${id}`)
    if (response.status === 404) return null
    if (!response.ok) throw new Error('Erro ao buscar solicitação')
    return response.json()
  },

  // GET /solicitacoes/cpf/{cpf} — Buscar por CPF (Cidadão)
  async buscarPorCpf(cpf) {
    const response = await fetch(`${BASE_URL}/cpf/${cpf}`)
    if (!response.ok) throw new Error('Erro ao buscar por CPF')
    return response.json()
  },

  // GET /solicitacoes — Listar todas (Gestor)
  async listarTodas() {
    const response = await fetch(BASE_URL)
    if (!response.ok) throw new Error('Erro ao listar solicitações')
    return response.json()
  },

  // PUT /solicitacoes/{id}/status — Atualizar status (Gestor)
  async atualizarStatus(id, status, comentario, responsavel) {
    const response = await fetch(`${BASE_URL}/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, comentario, responsavel })
    })
    if (!response.ok) throw new Error('Erro ao atualizar status')
    return response.json()
  },

  // DELETE /solicitacoes/{id} — Remover solicitação (Gestor)
  async deletar(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Erro ao deletar solicitação')
  }
}
