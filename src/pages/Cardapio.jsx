import { useEffect, useState } from 'react'
import CampoBusca from '../components/CampoBusca.jsx'
import FiltroCategorias from '../components/FiltroCategorias.jsx'
import ListaProdutos from '../components/ListaProdutos.jsx'
import Mensagem from '../components/Mensagem.jsx'
import { useCarrinho } from '../context/CarrinhoContext.js'
import { cardapio as cardapioLocal, categorias } from '../dados/cardapio.js'
import { normalizarTexto } from '../utils/formatar.js'

// Tela 1 — rota "/": lista de itens, filtro por categoria e botão "Adicionar".
export default function Cardapio() {
  const { adicionarItem } = useCarrinho()

  // Estado local desta tela.
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('todas')
  const [busca, setBusca] = useState('')
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  // Extra: carrega o cardápio de um arquivo JSON com fetch.
  // O array vazio [] no final faz o efeito rodar só quando a tela abre.
  useEffect(() => {
    async function carregarCardapio() {
      try {
        const resposta = await fetch('/cardapio.json')

        if (!resposta.ok) {
          throw new Error(`Resposta ${resposta.status}`)
        }

        const dados = await resposta.json()
        setProdutos(dados)
      } catch {
        // Deu erro: avisa o cliente e usa a cópia local de src/dados/cardapio.js.
        setErro('Não foi possível carregar o cardápio atualizado. Mostrando a cópia local.')
        setProdutos(cardapioLocal)
      } finally {
        setCarregando(false)
      }
    }

    carregarCardapio()
  }, [])

  // filter: primeiro pela categoria, depois pelo texto da busca.
  const textoBuscado = normalizarTexto(busca)

  const produtosFiltrados = produtos
    .filter(
      (produto) =>
        categoriaSelecionada === 'todas' || produto.categoria === categoriaSelecionada,
    )
    .filter((produto) => normalizarTexto(produto.nome).includes(textoBuscado))

  return (
    <section>
      <h1 className="titulo-pagina">Cardápio</h1>

      <div className="controles">
        <FiltroCategorias
          categorias={categorias}
          selecionada={categoriaSelecionada}
          onSelecionar={setCategoriaSelecionada}
        />
        <CampoBusca valor={busca} onMudar={setBusca} descricao="Buscar item pelo nome" />
      </div>

      {carregando && <Mensagem>Carregando cardápio...</Mensagem>}

      {erro && <Mensagem tipo="erro">{erro}</Mensagem>}

      {!carregando && produtosFiltrados.length === 0 && (
        <Mensagem>Nenhum item encontrado para esse filtro.</Mensagem>
      )}

      {!carregando && produtosFiltrados.length > 0 && (
        <>
          <p className="contagem">{produtosFiltrados.length} itens</p>
          <ListaProdutos produtos={produtosFiltrados} onAdicionar={adicionarItem} />
        </>
      )}
    </section>
  )
}
