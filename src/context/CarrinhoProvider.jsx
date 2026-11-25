import { useEffect, useState } from 'react'
import { CarrinhoContext } from './CarrinhoContext.js'

// Chaves usadas no localStorage do navegador.
const CHAVE_CARRINHO = 'cafe-do-campus:carrinho'
const CHAVE_PEDIDO = 'cafe-do-campus:pedido'

// Lê um valor salvo no localStorage. Se não existir (ou estiver corrompido),
// devolve o valor padrão.
function lerDoStorage(chave, valorPadrao) {
  try {
    const salvo = localStorage.getItem(chave)
    return salvo ? JSON.parse(salvo) : valorPadrao
  } catch {
    return valorPadrao
  }
}

// Número do pedido: os 6 últimos dígitos do relógio em milissegundos.
function gerarNumeroPedido() {
  return Date.now().toString().slice(-6)
}

// AQUI É ONDE O CARRINHO É GUARDADO.
// O Provider fica em volta do <App /> (veja main.jsx), então as 3 telas
// leem e alteram o mesmo estado.
export function CarrinhoProvider({ children }) {
  // Cada item do carrinho é um produto do cardápio + a quantidade:
  // { id, nome, descricao, preco, categoria, emoji, quantidade }
  const [carrinho, setCarrinho] = useState(() => lerDoStorage(CHAVE_CARRINHO, []))

  // Último pedido finalizado (ou null se ainda não houve pedido).
  const [pedido, setPedido] = useState(() => lerDoStorage(CHAVE_PEDIDO, null))

  // Extra: salva no localStorage sempre que o carrinho ou o pedido mudam,
  // para sobreviver ao recarregar a página.
  useEffect(() => {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho))
  }, [carrinho])

  useEffect(() => {
    localStorage.setItem(CHAVE_PEDIDO, JSON.stringify(pedido))
  }, [pedido])

  function adicionarItem(produto) {
    setCarrinho((atual) => {
      const jaEstaNoCarrinho = atual.some((item) => item.id === produto.id)

      if (jaEstaNoCarrinho) {
        // Já existe: cria um novo array aumentando só a quantidade desse item.
        return atual.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item,
        )
      }

      // Não existe: cria um novo array com o produto no final.
      return [...atual, { ...produto, quantidade: 1 }]
    })
  }

  function removerItem(id) {
    setCarrinho((atual) => atual.filter((item) => item.id !== id))
  }

  // Extra: alterar a quantidade. "variacao" é +1 ou -1; o mínimo é 1
  // (para tirar o item do carrinho existe o botão Remover).
  function alterarQuantidade(id, variacao) {
    setCarrinho((atual) =>
      atual.map((item) =>
        item.id === id
          ? { ...item, quantidade: Math.max(1, item.quantidade + variacao) }
          : item,
      ),
    )
  }

  // Total do pedido com reduce: soma preço x quantidade de cada item.
  const total = carrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0)

  // Quantidade de itens (mostrada no Header), também com reduce.
  const quantidadeItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0)

  // Fecha o pedido: guarda o resumo e esvazia o carrinho.
  function finalizarPedido() {
    if (carrinho.length === 0) return

    setPedido({
      numero: gerarNumeroPedido(),
      data: new Date().toISOString(),
      itens: carrinho,
      total,
    })
    setCarrinho([])
  }

  function iniciarNovoPedido() {
    setPedido(null)
    setCarrinho([])
  }

  // Tudo o que as telas podem usar.
  const valor = {
    carrinho,
    pedido,
    total,
    quantidadeItens,
    adicionarItem,
    removerItem,
    alterarQuantidade,
    finalizarPedido,
    iniciarNovoPedido,
  }

  return <CarrinhoContext.Provider value={valor}>{children}</CarrinhoContext.Provider>
}
