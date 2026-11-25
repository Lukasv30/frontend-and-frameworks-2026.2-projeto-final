// Botões de filtro por categoria.
// Props:
//   categorias   -> array [{ id, nome }]
//   selecionada  -> id da categoria ativa ('todas' mostra tudo)
//   onSelecionar -> função chamada com o id da categoria clicada
export default function FiltroCategorias({ categorias, selecionada, onSelecionar }) {
  return (
    <div className="filtro" role="group" aria-label="Filtrar por categoria">
      <button
        type="button"
        className={selecionada === 'todas' ? 'filtro__botao filtro__botao--ativo' : 'filtro__botao'}
        onClick={() => onSelecionar('todas')}
      >
        Todas
      </button>

      {categorias.map((categoria) => (
        <button
          key={categoria.id}
          type="button"
          className={
            selecionada === categoria.id ? 'filtro__botao filtro__botao--ativo' : 'filtro__botao'
          }
          onClick={() => onSelecionar(categoria.id)}
        >
          {categoria.nome}
        </button>
      ))}
    </div>
  )
}
