import CardProduto from './CardProduto.jsx'

// Grade de cards: percorre o array com map e cria um CardProduto por item.
// Props:
//   produtos    -> array de produtos já filtrado pela página
//   onAdicionar -> repassada para cada CardProduto
export default function ListaProdutos({ produtos, onAdicionar }) {
  return (
    <div className="lista-produtos">
      {produtos.map((produto) => (
        <CardProduto key={produto.id} produto={produto} onAdicionar={onAdicionar} />
      ))}
    </div>
  )
}
