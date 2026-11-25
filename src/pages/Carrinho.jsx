import { Link, useNavigate } from 'react-router-dom'
import ItemCarrinho from '../components/ItemCarrinho.jsx'
import Mensagem from '../components/Mensagem.jsx'
import { useCarrinho } from '../context/CarrinhoContext.js'
import { formatarPreco } from '../utils/formatar.js'

// Tela 2 — rota "/carrinho": itens escolhidos, remover, total e "Finalizar pedido".
export default function Carrinho() {
  const { carrinho, total, quantidadeItens, removerItem, alterarQuantidade, finalizarPedido } =
    useCarrinho()
  const navigate = useNavigate()

  function aoFinalizar() {
    finalizarPedido()
    navigate('/pedido') // troca de tela sem recarregar a página
  }

  if (carrinho.length === 0) {
    return (
      <section>
        <h1 className="titulo-pagina">Carrinho</h1>
        <Mensagem>
          Seu carrinho está vazio. <Link to="/">Ver o cardápio</Link>
        </Mensagem>
      </section>
    )
  }

  return (
    <section>
      <h1 className="titulo-pagina">Carrinho</h1>

      <ul className="lista-carrinho">
        {carrinho.map((item) => (
          <ItemCarrinho
            key={item.id}
            item={item}
            onRemover={removerItem}
            onAlterarQuantidade={alterarQuantidade}
          />
        ))}
      </ul>

      <div className="resumo">
        <p className="resumo__linha">
          <span>Itens</span>
          <span>{quantidadeItens}</span>
        </p>
        <p className="resumo__linha resumo__linha--total">
          <span>Total</span>
          <strong>{formatarPreco(total)}</strong>
        </p>

        <div className="resumo__acoes">
          <Link to="/" className="botao botao--secundario">
            Continuar escolhendo
          </Link>
          <button type="button" className="botao botao--grande" onClick={aoFinalizar}>
            Finalizar pedido
          </button>
        </div>
      </div>
    </section>
  )
}
