import { Link, useNavigate } from 'react-router-dom'
import ItemCarrinho from '../components/ItemCarrinho.jsx'
import Mensagem from '../components/Mensagem.jsx'
import { useCarrinho } from '../context/CarrinhoContext.js'
import { formatarPreco } from '../utils/formatar.js'

// Tela 3 — rota "/pedido": número do pedido, itens, total e "Novo pedido".
export default function Pedido() {
  const { pedido, iniciarNovoPedido } = useCarrinho()
  const navigate = useNavigate()

  function aoIniciarNovoPedido() {
    iniciarNovoPedido()
    navigate('/')
  }

  // Abriu /pedido sem ter finalizado nada.
  if (pedido === null) {
    return (
      <section>
        <h1 className="titulo-pagina">Resumo do pedido</h1>
        <Mensagem>
          Nenhum pedido finalizado ainda. <Link to="/">Ver o cardápio</Link>
        </Mensagem>
      </section>
    )
  }

  const dataFormatada = new Date(pedido.data).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  })

  return (
    <section>
      <h1 className="titulo-pagina">Resumo do pedido</h1>

      <div className="pedido-confirmado">
        <p className="pedido-confirmado__rotulo">Pedido confirmado</p>
        <p className="pedido-confirmado__numero">Nº {pedido.numero}</p>
        <p className="pedido-confirmado__data">Feito em {dataFormatada}</p>
      </div>

      <ul className="lista-carrinho">
        {pedido.itens.map((item) => (
          <ItemCarrinho key={item.id} item={item} somenteLeitura />
        ))}
      </ul>

      <div className="resumo">
        <p className="resumo__linha resumo__linha--total">
          <span>Total</span>
          <strong>{formatarPreco(pedido.total)}</strong>
        </p>

        <div className="resumo__acoes">
          <button type="button" className="botao botao--grande" onClick={aoIniciarNovoPedido}>
            Novo pedido
          </button>
        </div>
      </div>
    </section>
  )
}
