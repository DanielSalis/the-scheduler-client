function distribuirLeitos(funcionarios, leitos) {
  // Ordenar as listas de forma aleatória
  funcionarios.sort(() => Math.random() - 0.5);
  leitos.sort(() => Math.random() - 0.5);

  // Inicializar o objeto de distribuição de leitos para cada funcionário
  const distribuicao = {};
  funcionarios.forEach((funcionario) => {
    distribuicao[funcionario.nome] = { leitos: [], classificacao: 0 };
  });

  // Distribuir os leitos para cada funcionário
  leitos.forEach((leito) => {
    for (const nomeFuncionario in distribuicao) {
      const funcionario = distribuicao[nomeFuncionario];
      if (funcionario.classificacao + classificacaoLeito(leito) <= 6.5) {
        funcionario.leitos.push(leito);
        funcionario.classificacao += classificacaoLeito(leito);
        break;
      }
    }
  });

  return distribuicao;
}

// Função auxiliar para obter a classificação numérica de um leito
function classificacaoLeito(leito) {
  switch (leito.classificacao) {
    case '1h':
      return 1;
    case '3h':
      return 3;
    case '6h':
      return 6;
    default:
      return 0;
  }
}

// Exemplo de uso
const funcionarios = [
  { nome: 'Funcionário 1'},
  { nome: 'Funcionário 2'},
  { nome: 'Funcionário 3'},
  { nome: 'Funcionário 4'},
];
const leitos = [
  { id: 1, classificacao: '3h' },
  { id: 2, classificacao: '3h' },
  { id: 3, classificacao: '6h' },
  { id: 4, classificacao: '1h' },
  { id: 5, classificacao: '6h' },
  { id: 6, classificacao: '3h' },
];
const distribuicaoLeitos = distribuirLeitos(funcionarios, leitos);
console.log(distribuicaoLeitos);