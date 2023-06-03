function distribuirLeitos(funcionarios, leitos) {
  // Ordenar as listas de forma aleatória
  funcionarios.sort(() => Math.random() - 0.5);
  leitos.sort(() => Math.random() - 0.5);

  // Inicializar o objeto de distribuição de leitos para cada funcionário
  const distribuicao = {};
  funcionarios.forEach((funcionario) => {
    distribuicao[funcionario.name] = { leitos: [], classificacao: 0 };
  });

  // Distribuir os leitos para cada funcionário
  leitos.forEach((leito) => {
    for (const nomeFuncionario in distribuicao) {
      const funcionario = distribuicao[nomeFuncionario];
      if (funcionario.classificacao + leito.classification.estimated_time <= 120) {
        funcionario.leitos.push(leito);
        funcionario.classificacao += leito.classification.estimated_time;
        break;
      }
    }
  });

  return distribuicao;
}

// Função auxiliar para obter a classificação numérica de um leito
// function classificacaoLeito(leito) {
//   switch (leito.classificacao) {
//     case "1h":
//       return 1;
//     case "3h":
//       return 3;
//     case "6h":
//       return 6;
//     default:
//       return 0;
//   }
// }

// Exemplo de uso
const funcionarios = [
  {
    id: "168480e9-369f-4d0e-899a-77a74bcadbae",
    name: "Daniel",
    email: "daniel@mail.com",
    code: "111-xxx",
  },
  {
    id: "f5ac755c-8fb2-4aa3-9d3b-dadd247599f3",
    name: "Eduardo Amorim",
    email: "eduardo@mail.com",
    code: "222-xxx",
  },
];
const leitos = [
  {
    id: "e8742e1d-e398-4886-a6e5-99150c761b26",
    name: "Leito 04",
    classification: {
      id: "d0b0917f-d885-45d7-9afb-a6330d0540d7",
      name: "Alta",
      color: "#FF5252",
      estimated_time: 120,
    },
  },
  {
    id: "60710fa6-e05f-4889-a3b1-7292c8f1ecf8",
    name: "Leito 05",
    classification: {
      id: "6b1bbdab-f159-4828-8e5c-b36d7a6dbbdd",
      name: "Média",
      color: "#FFC107",
      estimated_time: 60,
    },
  },
  {
    id: "a6a13218-a734-480d-a61a-b6f01700fd19",
    name: "Leito 06",
    classification: {
      id: "9c13efaa-c10e-4f89-aaa3-0d8b31a490c7",
      name: "Baixa",
      color: "#4CAF50",
      estimated_time: 30,
    },
  },
  {
    id: "6b32b809-fd49-4ce4-aaf6-b0c96ae01efd",
    name: "Leito 03",
    classification: {
      id: "d0b0917f-d885-45d7-9afb-a6330d0540d7",
      name: "Alta",
      color: "#FF5252",
      estimated_time: 120,
    },
  },
  {
    id: "0e9dea78-ed27-4996-b5b1-e43259a8c3db",
    name: "Leito 02",
    classification: {
      id: "6b1bbdab-f159-4828-8e5c-b36d7a6dbbdd",
      name: "Média",
      color: "#FFC107",
      estimated_time: 60,
    },
  },
  {
    id: "e443cf14-995b-4213-9f5f-694b344af7b3",
    name: "Leito 01",
    classification: {
      id: "9c13efaa-c10e-4f89-aaa3-0d8b31a490c7",
      name: "Baixa",
      color: "#4CAF50",
      estimated_time: 30,
    },
  },
];
const distribuicaoLeitos = distribuirLeitos(funcionarios, leitos);
console.log(distribuicaoLeitos);

//lembrando que ele não faz muito bem um round robin, mas sim vai atribuindo aos primeiros da lista
//TODO fazer uma lógica que capte todas os leitos restantes que não foram atribuídos