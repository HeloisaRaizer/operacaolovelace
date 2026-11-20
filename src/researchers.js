const ninaDaHora = {
  id: "nina-da-hora",
  name: "Nina da Hora",
  institution: "Instituto da Hora",
  area: "Cibersegurança, inteligência artificial e justiça algorítmica",

  description:
    "Pesquisadora brasileira que investiga impactos sociais da tecnologia, vieses algorítmicos e direitos digitais.",

  intro: `Detetive, nosso primeiro caso é intrigante!

Uma cientista brasileira investiga por que certas tecnologias conseguem reconhecer algumas pessoas, mas falham com outras.

Ela acredita que a tecnologia deve ser inteligente, mas também justa.

Espalhei oito pistas pela cidade. Explore os locais, resolva os enigmas e descubra quem é essa pesquisadora!

Vamos começar a investigação?`,

  finalMessage: `Caso solucionado, detetive!

Você encontrou Nina da Hora, uma cientista brasileira que investiga como a inteligência artificial pode reproduzir desigualdades.

Seu trabalho nos mostra que não basta criar tecnologias inteligentes: precisamos garantir que elas também sejam justas e inclusivas.

Mais uma cientista reconhecida em nosso arquivo!

Mas atenção... uma nova pista acaba de chegar. Nossa investigação está apenas começando!`,

  challenges: [
    // DESAFIO 1 — BIBLIOTECA
    {
      id: 1,
      location: "library",
      type: "quiz",
      title: "O reconhecimento misterioso",

      ada: "Um sistema de reconhecimento facial apresenta mais erros ao identificar determinados grupos de pessoas. O que pode explicar isso?",

      question:
        "O que pode explicar os erros de reconhecimento facial para determinados grupos?",

      options: [
        "A quantidade de memória disponível no computador.",
        "Problemas de representação nos dados utilizados para treinar o sistema.",
        "A distância entre os computadores conectados."
      ],

      answer: 1,

      clue:
        "Nem toda inteligência artificial funciona igualmente para todas as pessoas.",

      success:
        "Isso mesmo! Dados de treinamento pouco representativos podem levar a sistemas que falham mais com alguns grupos."
    },

    // DESAFIO 2 — BIBLIOTECA
    {
      id: 2,
      location: "library",
      type: "scramble",
      title: "A mensagem embaralhada",

      ada: "Encontrei uma palavra importante, mas as letras foram embaralhadas! Descubra o termo que representa a participação de diferentes grupos na tecnologia.",

      question:
        "Reorganize as letras para formar uma palavra de 8 letras.",

      cipher: "O S L C I N U Ã",

      answer: "INCLUSÃO",

      clue:
        "A tecnologia precisa considerar diferentes pessoas e realidades.",

      success:
        "Correto! Inclusão significa considerar diferentes pessoas e realidades na tecnologia."
    },

    // DESAFIO 3 — MUSEU
    {
      id: 3,
      location: "museum",
      type: "code",
      title: "O código dos dados",

      ada: "Um documento foi protegido com números. Cada número corresponde à posição de uma letra no alfabeto. Decifre a mensagem!",

      question:
        "Use A=1, B=2, C=3 ... Z=26 para decifrar:", 

      cipher: "4 - 1 - 4 - 15 - 19",

      answer: "DADOS",

      clue:
        "Os dados usados para desenvolver uma inteligência artificial podem influenciar suas decisões.",

      success:
        "Mensagem decifrada: DADOS! Eles podem influenciar as decisões de uma IA."
    },

    // DESAFIO 4 — MUSEU
    {
      id: 4,
      location: "museum",
      type: "quiz",
      title: "Uma decisão injusta",

      ada: "Uma empresa percebeu que seu sistema de reconhecimento facial comete mais erros ao analisar rostos de determinados grupos. O que os desenvolvedores deveriam fazer?",

      question: "Qual atitude é a mais adequada?",

      options: [
        "Investigar possíveis vieses, avaliar os dados e testar o sistema com diferentes grupos.",
        "Manter o sistema sem alterações, pois computadores são sempre imparciais.",
        "Ignorar os erros se a maioria das identificações estiver correta."
      ],

      answer: 0,

      clue:
        "Nossa cientista investiga os impactos sociais das tecnologias.",

      success:
        "Correto! Investigar vieses e testar com grupos diversos é essencial para avaliar a justiça do sistema."
    },

    // DESAFIO 5 — LABORATÓRIO
    {
      id: 5,
      location: "laboratory",
      type: "caesar",
      title: "O algoritmo criptografado",

      ada: "Descobri uma palavra escondida! Cada letra foi substituída pela letra seguinte no alfabeto. Volte uma posição para revelar o termo.",

      question:
        "Volte cada letra uma posição no alfabeto. Exemplo: B vira A; C vira B.",

      cipher: "BMHPSJUJNP",

      answer: "ALGORITIMO",

      acceptedAnswers: ["ALGORITMO"],

      clue:
        "Algoritmos são conjuntos de instruções, mas seus resultados também precisam ser avaliados.",

      success:
        "Palavra decifrada! Algoritmos são instruções que devem ser analisadas e avaliadas."
    },

    // DESAFIO 6 — LABORATÓRIO
    {
      id: 6,
      location: "laboratory",
      type: "quiz",
      title: "A inteligência artificial",

      ada: "Nossa cientista estuda os impactos de tecnologias inteligentes. Qual destas aplicações está relacionada às suas pesquisas?",

      question:
        "Qual aplicação está relacionada às pesquisas da cientista?",

      options: [
        "Sistemas de reconhecimento facial e seus possíveis vieses.",
        "Sistemas de previsão meteorológica baseados em satélites.",
        "Sistemas de automação para produção de energia elétrica."
      ],

      answer: 0,

      clue:
        "A pesquisadora questiona como sistemas de inteligência artificial podem reproduzir desigualdades.",

      success:
        "Isso mesmo! Ela pesquisa como tecnologias inteligentes podem reproduzir desigualdades."
    },

    // DESAFIO 7 — CENTRAL
    {
      id: 7,
      location: "central",
      type: "caesar2",
      title: "O nome oculto",

      ada: "Estamos perto! Um registro contém o primeiro nome da cientista, mas foi protegido por um código. Cada letra foi avançada duas posições no alfabeto.",

      question: "Volte duas letras. Exemplo: C vira A.",

      cipher: "PKPC",

      answer: "NINA",

      clue:
        "Agora sabemos seu primeiro nome. Falta confirmar sua identidade completa!",

      success:
        "Código decifrado: NINA! Vamos confirmar a identidade completa."
    },

    // DESAFIO 8 — CENTRAL
    {
      id: 8,
      location: "central",
      type: "quiz",
      title: "A identidade revelada",

      ada: "Encontramos a última evidência: nossa pesquisadora brasileira também fundou o Instituto da Hora, dedicado a questões relacionadas à tecnologia, sociedade e direitos digitais. Quem é ela?",

      question: "Quem é a pesquisadora?",

      options: [
        "Nina da Hora",
        "Sonia Guimarães",
        "Jaqueline Goes de Jesus"
      ],

      answer: 0,

      clue:
        "Identidade confirmada: Nina da Hora!",

      success:
        "Identidade confirmada: Nina da Hora!"
    }
  ]
};

const researchers = [ninaDaHora];

export default researchers;