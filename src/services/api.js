
const BASE_URL = '/api/solicitacoes'

export const api = {

  async criarSolicitacao(dados) {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
    if (!response.ok) throw new Error('Erro ao criar solicitação')
    return response.json()
  },
  
  async buscarPorId(id) {
    const response = await fetch(`${BASE_URL}/${id}`)
    if (response.status === 404) return null
    if (!response.ok) throw new Error('Erro ao buscar solicitação')
    return response.json()
  },


  async buscarPorCpf(cpf) {
    const response = await fetch(`${BASE_URL}/cpf/${cpf}`)
    if (!response.ok) throw new Error('Erro ao buscar por CPF')
    return response.json()
  },


  async listarTodas() {
    const response = await fetch(BASE_URL)
    if (!response.ok) throw new Error('Erro ao listar solicitações')
    return response.json()
  },


  async atualizarStatus(id, status, comentario, responsavel) {
    const response = await fetch(`${BASE_URL}/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, comentario, responsavel })
    })
    if (!response.ok) throw new Error('Erro ao atualizar status')
    return response.json()
  },

  
  async deletar(id) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    })
    if (!response.ok) throw new Error('Erro ao deletar solicitação')
  }
}
