import { NavLink } from 'react-router-dom'

// Cabeçalho com o nome da loja e os links das 3 rotas.
// Props:
//   nomeLoja        -> texto mostrado como título
//   quantidadeItens -> número mostrado ao lado do link "Carrinho"
export default function Header({ nomeLoja, quantidadeItens }) {
  return (
    <header className="header">
      <div className="header__conteudo">
        <NavLink to="/" className="header__logo">
          <span aria-hidden="true">☕</span> {nomeLoja}
        </NavLink>

        <nav className="header__nav" aria-label="Navegação principal">
          <NavLink to="/" end className="header__link">
            Cardápio
          </NavLink>

          <NavLink to="/carrinho" className="header__link">
            Carrinho
            {quantidadeItens > 0 && <span className="header__contador">{quantidadeItens}</span>}
          </NavLink>

          <NavLink to="/pedido" className="header__link">
            Pedido
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
