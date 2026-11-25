import { formatarPreco } from '../utils/formatar.js'

// Linha de um item escolhido. É usada em duas telas:
//   - Carrinho: com botões de quantidade e de remover
//   - Resumo do pedido: só leitura (somenteLeitura)
// Props:
//   item                -> objeto do carrinho { id, nome, preco, quantidade, emoji }
//   onRemover           -> função chamada com o id do item
//   onAlterarQuantidade -> função chamada com (id, +1) ou (id, -1)
//   somenteLeitura      -> true esconde os botões
export default function ItemCarrinho({
  item,
  onRemover,
  onAlterarQuantidade,
  somenteLeitura = false,
}) {
  const subtotal = item.preco * item.quantidade

  return (
    <li className="item-carrinho">
      <span className="item-carrinho__emoji" aria-hidden="true">
        {item.emoji}
      </span>

      <div className="item-carrinho__texto">
        <strong>{item.nome}</strong>
        <span className="item-carrinho__unitario">
          {item.quantidade} x {formatarPreco(item.preco)}
        </span>
      </div>

      {!somenteLeitura && (
        <div className="item-carrinho__quantidade">
          <button
            type="button"
            className="botao-quantidade"
            onClick={() => onAlterarQuantidade(item.id, -1)}
            disabled={item.quantidade === 1}
            aria-label={`Diminuir quantidade de ${item.nome}`}
          >
            −
          </button>
          <span aria-label="Quantidade">{item.quantidade}</span>
          <button
            type="button"
            className="botao-quantidade"
            onClick={() => onAlterarQuantidade(item.id, 1)}
            aria-label={`Aumentar quantidade de ${item.nome}`}
          >
            +
          </button>
        </div>
      )}

      <strong className="item-carrinho__subtotal">{formatarPreco(subtotal)}</strong>

      {!somenteLeitura && (
        <button
          type="button"
          className="botao botao--perigo"
          onClick={() => onRemover(item.id)}
          aria-label={`Remover ${item.nome}`}
        >
          Remover
        </button>
      )}
    </li>
  )
}
