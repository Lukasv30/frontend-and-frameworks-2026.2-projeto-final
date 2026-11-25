import { formatarPreco } from '../utils/formatar.js'

// Card de um item do cardápio.
// Props:
//   produto     -> objeto { id, nome, descricao, preco, categoria, emoji }
//   onAdicionar -> função chamada com o produto ao clicar em "Adicionar"
export default function CardProduto({ produto, onAdicionar }) {
  return (
    <article className="card">
      <div className="card__emoji" aria-hidden="true">
        {produto.emoji}
      </div>

      <div className="card__texto">
        <h3 className="card__nome">{produto.nome}</h3>
        <p className="card__descricao">{produto.descricao}</p>
      </div>

      <div className="card__rodape">
        <strong className="card__preco">{formatarPreco(produto.preco)}</strong>
        <button type="button" className="botao" onClick={() => onAdicionar(produto)}>
          Adicionar
        </button>
      </div>
    </article>
  )
}
