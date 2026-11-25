import { Link } from 'react-router-dom'
import Mensagem from '../components/Mensagem.jsx'

// Extra — página 404: aparece em qualquer rota que não exista (path="*").
export default function NaoEncontrada() {
  return (
    <section>
      <h1 className="titulo-pagina">404 · Página não encontrada</h1>
      <Mensagem tipo="erro">
        Esse endereço não existe no nosso cardápio. <Link to="/">Voltar para o cardápio</Link>
      </Mensagem>
    </section>
  )
}
