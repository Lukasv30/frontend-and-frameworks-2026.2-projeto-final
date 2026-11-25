// Funções pequenas de formatação usadas em mais de uma tela.

// 12.5 -> "R$ 12,50"
export function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// Deixa o texto em minúsculas e sem acentos, para a busca encontrar
// "Pão de Queijo" mesmo quando o cliente digita "pao".
export function normalizarTexto(texto) {
  return texto
    .normalize('NFD') // separa a letra do acento: "ã" vira "a" + "~"
    .replace(/[̀-ͯ]/g, '') // remove os acentos separados
    .toLowerCase()
    .trim()
}
