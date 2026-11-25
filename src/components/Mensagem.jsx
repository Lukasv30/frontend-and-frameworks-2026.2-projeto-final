// Caixa de aviso reutilizada para "carregando", erro e listas vazias.
// Props:
//   tipo     -> 'info' (padrão) ou 'erro' — muda a cor da caixa
//   children -> conteúdo da mensagem (texto, links, botões)
export default function Mensagem({ tipo = 'info', children }) {
  return (
    <div className={`mensagem mensagem--${tipo}`} role={tipo === 'erro' ? 'alert' : 'status'}>
      {children}
    </div>
  )
}
