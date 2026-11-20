// ==========================================
// DOSSIÊ 001 — NINA DA HORA
// ==========================================

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


// ==========================================
// DOSSIÊ 002 — TERESA LUDERMIR
// ==========================================

const teresaLudermir = {
  id: "teresa-ludermir",
  name: "Teresa Ludermir",
  institution: "Universidade Federal de Pernambuco (UFPE)",
  area: "Inteligência Artificial, aprendizado de máquina e redes neurais artificiais",

  description:
    "Pesquisadora brasileira pioneira em Inteligência Artificial e Redes Neurais Artificiais, com pesquisas voltadas ao aprendizado de máquinas e aplicações em problemas reais.",

  intro: `Detetive, temos um novo mistério!

Descobri pistas sobre uma cientista brasileira que dedica sua vida a ensinar máquinas a aprender.

Imagine computadores capazes de reconhecer padrões, fazer previsões e até ajudar a identificar problemas antes que se tornem perigosos!

Mas quem está por trás dessas pesquisas?

Espalhei oito pistas pela cidade. Decifre os códigos, resolva os desafios e descubra a identidade dessa pesquisadora!

Preparada para começar o Dossiê 002?`,

  finalMessage: `Excelente trabalho, detetive!

Você descobriu Teresa Ludermir, uma cientista brasileira pioneira em Inteligência Artificial e Redes Neurais Artificiais.

Suas pesquisas ajudam computadores a aprender com dados e contribuem para resolver problemas reais, como analisar a qualidade da água e fazer previsões.

Em 2024, ela passou a integrar a Academia Brasileira de Ciências!

Mais uma história recuperada! Mas ainda existem cientistas esperando para serem descobertas...`,

  challenges: [
    // DESAFIO 1 — BIBLIOTECA
    {
      id: 1,
      location: "library",
      type: "quiz",
      title: "O segredo das máquinas",

      ada: "Encontrei um documento sobre máquinas que aprendem com exemplos. Qual tecnologia permite que computadores identifiquem padrões a partir de dados?",

      question:
        "Qual tecnologia permite que computadores identifiquem padrões a partir de dados?",

      options: [
        "Aprendizado de Máquina",
        "Armazenamento em Nuvem",
        "Computação Gráfica"
      ],

      answer: 0,

      clue:
        "Nossa cientista pesquisa maneiras de fazer computadores aprenderem com dados.",

      success:
        "Correto! O Aprendizado de Máquina permite que computadores identifiquem padrões a partir de dados."
    },

    // DESAFIO 2 — BIBLIOTECA
    {
      id: 2,
      location: "library",
      type: "caesar",
      title: "A mensagem do cérebro artificial",

      ada: "O documento menciona uma tecnologia inspirada no funcionamento do cérebro humano. A palavra foi criptografada! Cada letra avançou uma posição no alfabeto.",

      question:
        "Volte uma letra no alfabeto para descobrir a palavra.",

      cipher: "S F E F T",

      answer: "REDES",

      clue:
        "Redes neurais artificiais são uma das principais áreas de pesquisa da cientista.",

      success:
        "Muito bem! Redes neurais artificiais são inspiradas no funcionamento do cérebro humano e permitem que sistemas aprendam padrões."
    },

    // DESAFIO 3 — MUSEU
    {
      id: 3,
      location: "museum",
      type: "quiz",
      title: "A água sob investigação",

      ada: "Um sistema inteligente está ajudando pesquisadores a analisar informações sobre a qualidade da água. Como redes neurais podem contribuir para essa tarefa?",

      question:
        "Como as redes neurais podem ajudar nessa investigação?",

      options: [
        "Identificando padrões nos dados para apoiar análises e previsões.",
        "Transformando automaticamente água contaminada em água potável.",
        "Substituindo a coleta de dados por resultados sem medições."
      ],

      answer: 0,

      clue:
        "As pesquisas da cientista têm aplicações em problemas ambientais.",

      success:
        "Correto! Redes neurais podem identificar padrões e ajudar pesquisadores a analisar informações e realizar previsões."
    },

    // DESAFIO 4 — MUSEU
    {
      id: 4,
      location: "museum",
      type: "code",
      title: "O arquivo numérico",

      ada: "Uma nova palavra está escondida neste registro. Cada número corresponde à posição de uma letra no alfabeto. Descubra o que as máquinas precisam analisar para aprender.",

      question:
        "Use A=1, B=2, C=3 ... Z=26 para decifrar a mensagem:",

      cipher: "4 - 1 - 4 - 15 - 19",

      answer: "DADOS",

      clue:
        "As redes neurais podem aprender padrões a partir de exemplos presentes nos dados.",

      success:
        "Mensagem decifrada: DADOS! Eles são fundamentais para que as redes neurais aprendam padrões."
    },

    // DESAFIO 5 — LABORATÓRIO
    {
      id: 5,
      location: "laboratory",
      type: "quiz",
      title: "O centro das descobertas",

      ada: "Descobri que nossa cientista desenvolve suas pesquisas em uma universidade pública do Nordeste brasileiro, localizada em Recife. Qual é essa instituição?",

      question:
        "Em qual instituição nossa cientista desenvolve suas pesquisas?",

      options: [
        "Universidade Federal do Ceará (UFC)",
        "Universidade Federal de Pernambuco (UFPE)",
        "Universidade Federal da Paraíba (UFPB)"
      ],

      answer: 1,

      clue:
        "Nossa pesquisadora é professora titular do Centro de Informática da UFPE.",

      success:
        "Isso mesmo! Teresa Ludermir é professora titular do Centro de Informática da Universidade Federal de Pernambuco."
    },

    // DESAFIO 6 — LABORATÓRIO
    {
      id: 6,
      location: "laboratory",
      type: "scramble",
      title: "A cidade secreta",

      ada: "Encontramos o nome da cidade onde nossa cientista desenvolve suas pesquisas, mas as letras estão embaralhadas. Consegue reorganizá-las?",

      question:
        "Organize as seis letras para descobrir a cidade.",

      cipher: "F E C E R I",

      answer: "RECIFE",

      clue:
        "Nossa cientista trabalha na capital pernambucana.",

      success:
        "Correto! A cidade é Recife, onde está localizada a Universidade Federal de Pernambuco."
    },

    // DESAFIO 7 — CENTRAL
    {
      id: 7,
      location: "central",
      type: "caesar",
      title: "O primeiro nome",

      ada: "Estamos quase lá, detetive! Encontrei um registro com o primeiro nome da cientista, mas as letras foram avançadas uma posição no alfabeto. Decifre!",

      question:
        "Volte uma letra no alfabeto para descobrir o primeiro nome.",

      cipher: "U F S F T B",

      answer: "TERESA",

      clue:
        "Já sabemos seu primeiro nome. Precisamos encontrar a identidade completa!",

      success:
        "Código decifrado: TERESA! Agora falta confirmar sua identidade completa."
    },

    // DESAFIO 8 — CENTRAL
    {
      id: 8,
      location: "central",
      type: "quiz",
      title: "A identidade revelada",

      ada: "Encontramos a última evidência! Nossa cientista é professora titular da UFPE, pioneira em pesquisas sobre redes neurais artificiais e tornou-se membro titular da Academia Brasileira de Ciências em 2024. Quem é ela?",

      question:
        "Quem é a pesquisadora?",

      options: [
        "Teresa Cristina da Silva",
        "Teresa Bernarda Ludermir",
        "Teresa Maria de Souza"
      ],

      answer: 1,

      clue:
        "Identidade confirmada: Teresa Bernarda Ludermir!",

      success:
        "Identidade confirmada: Teresa Bernarda Ludermir! Caso solucionado, detetive!"
    }
  ]
};


// ==========================================
// EXPORTAÇÃO DOS DOSSIÊS
// ==========================================

const researchers = [
  ninaDaHora,
  teresaLudermir
];

export default researchers;