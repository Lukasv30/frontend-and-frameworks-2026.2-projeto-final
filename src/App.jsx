import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import { useCarrinho } from './context/CarrinhoContext.js'
import Cardapio from './pages/Cardapio.jsx'
import Carrinho from './pages/Carrinho.jsx'
import NaoEncontrada from './pages/NaoEncontrada.jsx'
import Pedido from './pages/Pedido.jsx'

export default function App() {
  const { quantidadeItens } = useCarrinho()

  return (
    <>
      {/* O Header fica fora das rotas: aparece em todas as telas. */}
      <Header nomeLoja="Café do Campus" quantidadeItens={quantidadeItens} />

      <main className="conteudo">
        <Routes>
          <Route path="/" element={<Cardapio />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/pedido" element={<Pedido />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>

      <footer className="rodape">
        Projeto Final · Front-End Frameworks · UNINASSAU
      </footer>
    </>
  )
}
