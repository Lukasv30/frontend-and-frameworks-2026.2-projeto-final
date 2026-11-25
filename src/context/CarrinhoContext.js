import { createContext, useContext } from 'react'

// O contexto é o "canal" por onde o carrinho chega a qualquer tela,
// sem precisar passar props de componente em componente.
export const CarrinhoContext = createContext(null)

// Atalho para ler o contexto: const { carrinho, total } = useCarrinho()
export function useCarrinho() {
  const contexto = useContext(CarrinhoContext)

  if (contexto === null) {
    throw new Error('useCarrinho precisa ser usado dentro de <CarrinhoProvider>.')
  }

  return contexto
}
