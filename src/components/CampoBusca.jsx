// Campo de busca por nome do item (extra).
// Props:
//   valor     -> texto atual do campo
//   onMudar   -> função chamada com o novo texto a cada tecla
//   descricao -> texto de exemplo mostrado com o campo vazio
export default function CampoBusca({ valor, onMudar, descricao = 'Buscar...' }) {
  return (
    <input
      type="search"
      className="busca"
      value={valor}
      onChange={(evento) => onMudar(evento.target.value)}
      placeholder={descricao}
      aria-label={descricao}
    />
  )
}
