// src/data/cases.js

const cases = [
  // =====================================================
  // CASO 001 — LIANE TAROUCO
  // =====================================================
  {
    id: 1,
    number: "001",
    name: "Liane Tarouco",
    specialty: "Redes de Computadores",
    mechanic: "network",
    location: "laboratory",
    title: "O colapso da rede acadêmica",
    story:
      "O sistema de comunicação entre centros universitários foi interrompido. Registros antigos indicam que uma pesquisadora participou da criação de redes que conectavam universidades e centros de pesquisa. Você precisa reconstruir a rota da informação e descobrir quem esteve por trás dessa infraestrutura.",
    introduction:
      "Uma rede de pesquisa perdeu sua conexão. Reconstrua os registros históricos e identifique as contribuições da cientista.",
    challenges: [
      {
        type: "investigation",
        title: "Reconstruindo a conexão",
        question:
          "Qual rede contou com a participação de Liane Tarouco e conectou universidades e centros de pesquisa do Rio Grande do Sul?",
        options: ["Internet Hall of Fame", "Rede Tchê", "MetroPOA"],
        answer: 1,
        explanation:
          "A Rede Tchê conectou universidades e centros de pesquisa do Rio Grande do Sul."
      },
      {
        type: "decode",
        title: "Arquivo histórico",
        question:
          "Qual livro Liane publicou em 1977, considerado o primeiro livro brasileiro sobre redes de computadores?",
        options: [
          "Computação e Tecnologia no Brasil",
          "Internet e Sociedade Digital",
          "Redes de Comunicação de Dados"
        ],
        answer: 2,
        explanation:
          "Redes de Comunicação de Dados foi publicado em 1977 e tornou-se referência na área."
      },
      {
        type: "analysis",
        title: "Último registro",
        question:
          "Além das redes de computadores, qual conjunto de temas também fez parte de suas pesquisas?",
        options: [
          "Informática na educação, mundos virtuais imersivos, realidade aumentada e Internet das Coisas",
          "Engenharia mecânica, mineração e química industrial",
          "Exclusivamente sistemas bancários"
        ],
        answer: 0,
        explanation:
          "Liane também pesquisou informática na educação, mundos virtuais, realidade aumentada, dispositivos móveis e Internet das Coisas."
      }
    ],
    evidence: {
      id: "liane-evidence",
      title: "Registro da infraestrutura de Internet",
      text: "A contribuição de Liane Tarouco para redes de computadores e conectividade acadêmica foi confirmada."
    }
  },

  // =====================================================
  // CASO 002 — TERESA LUDERMIR
  // =====================================================
  {
    id: 2,
    number: "002",
    name: "Teresa Ludermir",
    specialty: "Inteligência Artificial",
    mechanic: "pattern",
    location: "central",
    title: "A máquina que aprendeu",
    story:
      "Um sistema de previsão começou a apresentar resultados inesperados. Os registros apontam para uma pesquisadora que trabalha com modelos capazes de aprender com dados. Descubra como o sistema foi construído e quais pesquisas podem ajudar a resolver o problema.",
    introduction:
      "Um algoritmo perdeu sua capacidade de reconhecer padrões. Analise os registros e reconstrua a lógica do sistema.",
    challenges: [
      {
        type: "pattern",
        title: "Reconhecimento de padrões",
        question:
          "Qual é uma das principais áreas de pesquisa de Teresa Ludermir?",
        options: ["Botânica", "Inteligência Artificial", "Astronomia observacional"],
        answer: 1,
        explanation:
          "Teresa Ludermir é reconhecida por suas contribuições à Inteligência Artificial."
      },
      {
        type: "analysis",
        title: "Aplicação do modelo",
        question:
          "Qual aplicação aparece entre as pesquisas de Teresa Ludermir?",
        options: [
          "Detecção de vazamentos de gás",
          "Cultivo de plantas medicinais",
          "Desenvolvimento de vacinas"
        ],
        answer: 0,
        explanation:
          "Suas pesquisas incluem aplicações como detecção de vazamentos de gás, previsão de geração eólica e avaliação da qualidade da água."
      },
      {
        type: "logic",
        title: "Registro de reconhecimento",
        question:
          "Qual reconhecimento Teresa recebeu em 2010?",
        options: [
          "Medalha Fields",
          "Prêmio Nobel de Física",
          "Ordem Nacional do Mérito Científico, na categoria Comendadora"
        ],
        answer: 2,
        explanation:
          "Em 2010, Teresa recebeu a Ordem Nacional do Mérito Científico, na categoria Comendadora."
      }
    ],
    evidence: {
      id: "teresa-evidence",
      title: "Modelo de aprendizado recuperado",
      text: "O registro confirmou as pesquisas de Teresa Ludermir em Inteligência Artificial e aprendizado de máquina."
    }
  },

  // =====================================================
  // CASO 003 — SANDRA AVILA
  // =====================================================
  {
    id: 3,
    number: "003",
    name: "Sandra Avila",
    specialty: "Visão Computacional e Inclusão",
    mechanic: "image-analysis",
    location: "museum",
    title: "O diagnóstico invisível",
    story:
      "Um sistema de análise de imagens médicas apresenta falhas ao identificar lesões em diferentes tons de pele. Uma investigação revela que os dados utilizados no treinamento podem não representar todas as pessoas. Você precisa encontrar a origem do problema.",
    introduction:
      "O sistema de reconhecimento de imagens apresenta resultados desiguais. Investigue a representatividade dos dados.",
    challenges: [
      {
        type: "analysis",
        title: "Dados incompletos",
        question:
          "Qual é o objetivo do projeto 'Peles Negras Importam'?",
        options: [
          "Desenvolver ferramentas de IA para auxiliar na identificação de lesões de pele e reduzir desigualdades nos diagnósticos",
          "Criar aplicativos exclusivamente estéticos",
          "Substituir completamente dermatologistas"
        ],
        answer: 0,
        explanation:
          "O projeto busca desenvolver ferramentas de IA para análise de lesões de pele negra, ampliando a representatividade e contribuindo para reduzir desigualdades."
      },
      {
        type: "decode",
        title: "Reconhecimento de pesquisa",
        question:
          "Qual reconhecimento Sandra Avila recebeu em 2022?",
        options: [
          "Ordem Nacional do Mérito Científico",
          "Google Award for Inclusion Research",
          "Prêmio Nobel de Medicina"
        ],
        answer: 1,
        explanation:
          "Sandra recebeu o Google Award for Inclusion Research em 2022."
      },
      {
        type: "logic",
        title: "Relatório de inclusão",
        question:
          "Como as pesquisas de Sandra Avila buscam contribuir para a sociedade?",
        options: [
          "Criando sistemas sem análise de dados",
          "Voltando a tecnologia apenas ao entretenimento",
          "Utilizando IA para promover inclusão, auxiliar na saúde e reduzir desigualdades"
        ],
        answer: 2,
        explanation:
          "Suas pesquisas buscam aplicar IA em problemas sociais, saúde e inclusão."
      }
    ],
    evidence: {
      id: "sandra-evidence",
      title: "Relatório de representatividade",
      text: "Foi identificado que representatividade e qualidade dos dados são fundamentais para sistemas de IA mais inclusivos."
    }
  },

  // =====================================================
  // CASO 004 — ANA CAROLINA LORENA
  // =====================================================
  {
    id: 4,
    number: "004",
    name: "Ana Carolina Lorena",
    specialty: "Mineração de Dados",
    mechanic: "data-mining",
    location: "laboratory",
    title: "O conjunto de dados perdido",
    story:
      "Uma base científica foi corrompida e os pesquisadores perderam a capacidade de analisar os registros. Você foi chamado para recuperar o sistema de dados e encontrar pistas sobre os métodos usados pela cientista.",
    introduction:
      "Os dados estão desorganizados. Recupere a informação e identifique as técnicas utilizadas pela pesquisadora.",
    challenges: [
      {
        type: "data",
        title: "Mineração de dados",
        question:
          "Qual é uma das principais áreas de pesquisa de Ana Carolina Lorena?",
        options: ["Astronomia", "Mineração de Dados", "Engenharia Ambiental"],
        answer: 1,
        explanation:
          "Ana Carolina Lorena atua em Inteligência Artificial, Aprendizado de Máquina, Mineração de Dados e Ciência de Dados."
      },
      {
        type: "analysis",
        title: "Investigação científica",
        question:
          "Em qual área Ana Carolina participou de pesquisas relacionadas à análise de dados, incluindo estudos sobre COVID-19?",
        options: ["Arqueologia", "Agricultura", "Saúde"],
        answer: 2,
        explanation:
          "Ela participou de pesquisas envolvendo análise de dados na área da saúde, incluindo estudos relacionados à COVID-19."
      },
      {
        type: "decode",
        title: "Biblioteca científica",
        question:
          "Qual livro Ana Carolina Lorena é coautora?",
        options: [
          "Inteligência Artificial: uma abordagem de Aprendizado de Máquina",
          "O Universo da Robótica",
          "Computação e Sociedade"
        ],
        answer: 0,
        explanation:
          "Ela é coautora do livro Inteligência Artificial: uma abordagem de Aprendizado de Máquina."
      }
    ],
    evidence: {
      id: "ana-evidence",
      title: "Base de dados recuperada",
      text: "Os registros de Ana Carolina Lorena confirmaram sua atuação em mineração de dados, aprendizado de máquina e análise de dados."
    }
  },

  // =====================================================
  // CASO 005 — CLAUDIA BAUZER MEDEIROS
  // =====================================================
  {
    id: 5,
    number: "005",
    name: "Claudia Bauzer Medeiros",
    specialty: "Bancos de Dados Científicos",
    mechanic: "database",
    location: "library",
    title: "O banco de dados fragmentado",
    story:
      "Um arquivo científico possui informações espalhadas por diferentes sistemas, formatos e origens. A equipe não consegue relacionar os dados. As pesquisas de uma especialista em gerenciamento e integração de dados podem revelar como reconstruir o arquivo.",
    introduction:
      "Informações científicas estão fragmentadas. Organize os dados para descobrir a pesquisa responsável.",
    challenges: [
      {
        type: "database",
        title: "Integração de informações",
        question:
          "Qual é uma das principais áreas de pesquisa de Claudia Bauzer Medeiros?",
        options: [
          "Astrofísica",
          "Engenharia Mecânica",
          "Gerenciamento de Dados Científicos"
        ],
        answer: 2,
        explanation:
          "Claudia trabalha com bancos de dados, gerenciamento e integração de dados científicos e eScience."
      },
      {
        type: "analysis",
        title: "Dados de diferentes origens",
        question:
          "Quais áreas são mencionadas como aplicações de suas pesquisas?",
        options: [
          "Biodiversidade e sistemas agroambientais",
          "Construção civil e mineração",
          "Astronomia e exploração espacial"
        ],
        answer: 0,
        explanation:
          "Seus trabalhos incluem aplicações em biodiversidade e sistemas agroambientais."
      },
      {
        type: "logic",
        title: "Registro institucional",
        question:
          "Qual sociedade científica Claudia Bauzer Medeiros presidiu entre 2003 e 2007?",
        options: [
          "Sociedade Brasileira de Física",
          "Sociedade Brasileira de Computação",
          "Sociedade Brasileira de Matemática"
        ],
        answer: 1,
        explanation:
          "Claudia Bauzer Medeiros presidiu a Sociedade Brasileira de Computação (SBC) entre 2003 e 2007."
      }
    ],
    evidence: {
      id: "claudia-bauzer-evidence",
      title: "Dados científicos integrados",
      text: "O sistema recuperou os registros de gerenciamento e integração de dados científicos."
    }
  },

  // =====================================================
  // CASO 006 — CLÁUDIA WERNER
  // =====================================================
  {
    id: 6,
    number: "006",
    name: "Cláudia Werner",
    specialty: "Engenharia de Software",
    mechanic: "software",
    location: "central",
    title: "O software incompleto",
    story:
      "Um programa foi desenvolvido diversas vezes, sempre começando do zero. A equipe perdeu componentes que poderiam ser reutilizados. Você precisa reconstruir o projeto utilizando os princípios da Engenharia de Software.",
    introduction:
      "O projeto está incompleto e cheio de partes repetidas. Descubra como reaproveitar soluções existentes.",
    challenges: [
      {
        type: "logic",
        title: "Reutilização de componentes",
        question:
          "O que significa reutilização de software, uma das áreas de pesquisa de Cláudia Werner?",
        options: [
          "Criar sistemas sem aproveitar códigos anteriores",
          "Aproveitar componentes e soluções já desenvolvidos para criar novos sistemas",
          "Substituir programas por equipamentos físicos"
        ],
        answer: 1,
        explanation:
          "A reutilização de software consiste em aproveitar componentes e soluções já desenvolvidos para construir novos sistemas."
      },
      {
        type: "decode",
        title: "Tecnologia aplicada",
        question:
          "Qual dessas áreas também faz parte das pesquisas de Cláudia Werner?",
        options: ["Oceanografia", "Química Orgânica", "Realidade Aumentada"],
        answer: 2,
        explanation:
          "Cláudia Werner também trabalha com realidade virtual, realidade aumentada e jogos aplicados ao ensino."
      },
      {
        type: "analysis",
        title: "Registro acadêmico",
        question:
          "Além de desenvolver pesquisas, como Cláudia Werner contribui para a Ciência da Computação?",
        options: [
          "Participando de projetos, publicações, atividades acadêmicas e formação de estudantes",
          "Atuando somente na criação de equipamentos",
          "Trabalhando exclusivamente em empresas privadas"
        ],
        answer: 0,
        explanation:
          "Sua trajetória inclui projetos, publicações científicas, atividades acadêmicas e formação de estudantes."
      }
    ],
    evidence: {
      id: "claudia-werner-evidence",
      title: "Código reutilizável recuperado",
      text: "O registro da investigação destacou a reutilização de software e as pesquisas em Engenharia de Software."
    }
  },

  // =====================================================
  // CASO 007 — MIRELLA MORO
  // =====================================================
  {
    id: 7,
    number: "007",
    name: "Mirella Moro",
    specialty: "Banco de Dados e Inclusão",
    mechanic: "matching",
    location: "museum",
    title: "O projeto desaparecido",
    story:
      "Uma iniciativa criada para incentivar meninas na tecnologia desapareceu dos registros de um centro de pesquisa. A investigação aponta para uma pesquisadora que une produção científica, ensino e incentivo à participação feminina.",
    introduction:
      "Um projeto de incentivo à participação feminina precisa ser recuperado. Relacione as pistas e encontre a iniciativa.",
    challenges: [
      {
        type: "matching",
        title: "Programa de inclusão",
        question:
          "Qual programa Mirella Moura Moro coordena, voltado ao incentivo da participação feminina na Computação?",
        options: [
          "Programa Ciência para Todos",
          "Programa Meninas Digitais",
          "Programa Mulheres na Engenharia"
        ],
        answer: 1,
        explanation:
          "Mirella coordena o Programa Meninas Digitais, da Sociedade Brasileira de Computação."
      },
      {
        type: "analysis",
        title: "Área de pesquisa",
        question:
          "Qual é uma das principais áreas de pesquisa de Mirella Moro?",
        options: ["Banco de Dados", "Medicina Veterinária", "Engenharia Civil"],
        answer: 0,
        explanation:
          "Sua trajetória inclui pesquisas em Banco de Dados, Ciência de Dados, algoritmos e educação em Computação."
      },
      {
        type: "logic",
        title: "Objetivo da iniciativa",
        question:
          "Qual é um dos objetivos das iniciativas de inclusão nas quais Mirella participa?",
        options: [
          "Reduzir o acesso à tecnologia",
          "Incentivar exclusivamente a participação masculina",
          "Diminuir a desigualdade de gênero e ampliar a participação feminina na Computação"
        ],
        answer: 2,
        explanation:
          "Suas iniciativas buscam diminuir a desigualdade de gênero e ampliar a participação de meninas e mulheres na tecnologia."
      }
    ],
    evidence: {
      id: "mirella-evidence",
      title: "Projeto de inclusão recuperado",
      text: "A investigação confirmou iniciativas de inclusão e incentivo à participação feminina na Computação."
    }
  },

  // =====================================================
  // CASO 008 — CLARISSE SIECKENIUS DE SOUZA
  // =====================================================
  {
    id: 8,
    number: "008",
    name: "Clarisse Sieckenius de Souza",
    specialty: "Interação Humano-Computador",
    mechanic: "interface",
    location: "laboratory",
    title: "A interface silenciosa",
    story:
      "Um sistema está funcionando, mas ninguém consegue compreender suas mensagens. Os usuários interpretam os comandos de forma errada. Uma teoria sobre comunicação entre pessoas e sistemas pode solucionar o problema.",
    introduction:
      "A interface não está comunicando corretamente. Analise as pistas sobre interação e linguagem.",
    challenges: [
      {
        type: "interface",
        title: "Comunicação entre sistema e usuário",
        question:
          "Qual teoria Clarisse Sieckenius de Souza criou, voltada ao estudo da interação entre pessoas e sistemas computacionais?",
        options: [
          "Engenharia de Dados",
          "Engenharia Semiótica",
          "Teoria da Computação Quântica"
        ],
        answer: 1,
        explanation:
          "Clarisse criou a Engenharia Semiótica, que estuda a interação entre pessoas e sistemas computacionais."
      },
      {
        type: "decode",
        title: "Fundação do grupo",
        question:
          "Em que ano Clarisse fundou o SERG, grupo de pesquisa dedicado à Engenharia Semiótica?",
        options: ["1996", "2013", "2016"],
        answer: 0,
        explanation:
          "Clarisse fundou o SERG em 1996."
      },
      {
        type: "logic",
        title: "Trajetória inesperada",
        question:
          "Qual aspecto torna a trajetória acadêmica de Clarisse Sieckenius de Souza marcante?",
        options: [
          "Foi exclusivamente da Engenharia Civil",
          "Começou na Astronomia",
          "Veio da área de Letras e construiu uma carreira de destaque na Computação"
        ],
        answer: 2,
        explanation:
          "Clarisse veio da área de Letras e construiu uma trajetória marcante na Computação."
      }
    ],
    evidence: {
      id: "clarisse-evidence",
      title: "Comunicação da interface restaurada",
      text: "A investigação confirmou a Engenharia Semiótica e sua contribuição para a Interação Humano-Computador."
    }
  },

  // =====================================================
  // CASO 009 — CECÍLIA BARANAUSKAS
  // =====================================================
  {
    id: 9,
    number: "009",
    name: "Cecília Baranauskas",
    specialty: "Interação Humano-Computador",
    mechanic: "accessibility",
    location: "library",
    title: "O sistema inacessível",
    story:
      "Uma plataforma foi criada para atender à sociedade, mas parte dos usuários não consegue utilizá-la. A investigação leva a uma pesquisadora que estuda design participativo, acessibilidade e tecnologias conectadas às necessidades humanas.",
    introduction:
      "O sistema não atende a todos. Descubra os princípios que podem tornar a tecnologia mais inclusiva.",
    challenges: [
      {
        type: "analysis",
        title: "Tecnologia para todos",
        question:
          "Quais características Cecília busca promover por meio de suas pesquisas em sistemas computacionais?",
        options: [
          "Sistemas exclusivamente financeiros",
          "Sistemas mais acessíveis, inclusivos e conectados às necessidades da sociedade",
          "Sistemas destinados somente a especialistas"
        ],
        answer: 1,
        explanation:
          "Cecília desenvolve pesquisas para criar sistemas mais acessíveis, inclusivos e conectados às necessidades da sociedade."
      },
      {
        type: "decode",
        title: "Núcleo de pesquisa",
        question:
          "Qual núcleo da Unicamp Maria Cecília foi cofundadora e ex-coordenadora?",
        options: [
          "Núcleo de Informática Aplicada à Educação (NIED)",
          "Núcleo de Engenharia Mecânica (NEM)",
          "Núcleo de Astronomia Aplicada (NAA)"
        ],
        answer: 0,
        explanation:
          "Cecília foi cofundadora e ex-coordenadora do Núcleo de Informática Aplicada à Educação (NIED)."
      },
      {
        type: "logic",
        title: "Reconhecimento",
        question:
          "Qual reconhecimento Maria Cecília Calani Baranauskas recebeu em 2021?",
        options: [
          "ACM SIGDOC Rigo Award",
          "Prêmio Carreira de Destaque em IHC",
          "ACM CHI Social Impact Award"
        ],
        answer: 2,
        explanation:
          "Em 2021, Cecília recebeu o ACM CHI Social Impact Award."
      }
    ],
    evidence: {
      id: "cecilia-evidence",
      title: "Sistema inclusivo restaurado",
      text: "A investigação destacou o design participativo, acessibilidade e a relação entre tecnologia e sociedade."
    }
  },

  // =====================================================
  // CASO 010 — NINA DA HORA
  // =====================================================
  {
    id: 10,
    number: "010",
    name: "Nina da Hora",
    specialty: "Ética, IA e Segurança Digital",
    mechanic: "ethics",
    location: "central",
    title: "O algoritmo discriminatório",
    story:
      "Um sistema de reconhecimento facial começou a excluir pessoas de determinados grupos. Os dados parecem apresentar problemas de representação. Você deve investigar os impactos sociais da tecnologia e encontrar a falha.",
    introduction:
      "O algoritmo não está sendo justo com todos. Analise as evidências e descubra o problema.",
    challenges: [
      {
        type: "analysis",
        title: "Desigualdade algorítmica",
        question:
          "O que Nina da Hora investiga em suas pesquisas sobre reconhecimento facial?",
        options: [
          "Como esses sistemas podem reproduzir desigualdades e excluir determinadas pessoas",
          "Como utilizar reconhecimento facial apenas para entretenimento",
          "Como substituir todos os sistemas de computador"
        ],
        answer: 0,
        explanation:
          "Nina investiga como sistemas de reconhecimento facial e IA podem reproduzir desigualdades e excluir pessoas."
      },
      {
        type: "logic",
        title: "Dados problemáticos",
        question:
          "O que Nina da Hora analisa nos conjuntos de dados utilizados em sistemas de IA?",
        options: [
          "Somente a velocidade de processamento",
          "Problemas de representação que podem contribuir para desigualdades",
          "Exclusivamente os custos de armazenamento"
        ],
        answer: 1,
        explanation:
          "Ela analisa problemas de representação nos conjuntos de dados que podem levar a desigualdades."
      },
      {
        type: "decode",
        title: "Instituto da pesquisadora",
        question:
          "Qual instituto Nina da Hora fundou?",
        options: [
          "Instituto Nacional de Astronomia",
          "Instituto de Engenharia Civil",
          "Instituto da Hora"
        ],
        answer: 2,
        explanation:
          "Nina da Hora fundou o Instituto da Hora."
      }
    ],
    evidence: {
      id: "nina-evidence",
      title: "Relatório de ética algorítmica",
      text: "Os registros recuperados revelam uma pesquisadora brasileira que investiga os impactos sociais da Inteligência Artificial, os problemas de representação nos dados e os riscos de sistemas que reproduzem desigualdades. Um último documento confirma a ligação com o Instituto da Hora."
    }
  },

  // =====================================================
  // CASO 011 — CAMILA ACHUTTI
  // =====================================================
  {
    id: 11,
    number: "011",
    name: "Camila Achutti",
    specialty: "Educação e Empreendedorismo em Tecnologia",
    mechanic: "education",
    location: "museum",
    title: "O código que ninguém ensinava",
    story:
      "Um centro educacional percebeu que poucas meninas estavam participando de suas atividades de programação. Os registros mostram uma iniciativa criada para aproximar jovens da Computação e tornar o conhecimento tecnológico mais acessível.",
    introduction:
      "A participação feminina na tecnologia está diminuindo. Descubra as iniciativas criadas para transformar esse cenário.",
    challenges: [
      {
        type: "analysis",
        title: "Iniciativa de visibilidade",
        question:
          "Qual iniciativa Camila Achutti criou em 2010 para dar visibilidade às mulheres na Computação?",
        options: [
          "Mastertech",
          "Meninas Digitais",
          "Blog Mulheres na Computação"
        ],
        answer: 2,
        explanation:
          "Em 2010, Camila criou o blog Mulheres na Computação para dar visibilidade às mulheres e incentivar jovens a conhecerem programação."
      },
      {
        type: "logic",
        title: "Educação digital",
        question:
          "Qual escola voltada ao desenvolvimento de habilidades digitais Camila Achutti fundou?",
        options: ["Mastertech", "Instituto da Hora", "NIED"],
        answer: 0,
        explanation:
          "Camila fundou a Mastertech, voltada ao desenvolvimento de habilidades digitais."
      },
      {
        type: "decode",
        title: "Motivação da pesquisadora",
        question:
          "Qual foi um dos motivos que despertou o interesse de Camila Achutti em discutir desigualdade de gênero na tecnologia?",
        options: [
          "Falta de computadores em empresas",
          "Pouca presença de mulheres nas salas de aula de Computação durante sua graduação",
          "Ausência de cursos de Engenharia Civil"
        ],
        answer: 1,
        explanation:
          "Durante a graduação, Camila percebeu a pouca presença de mulheres nas salas de Computação."
      }
    ],
    evidence: {
      id: "camila-evidence",
      title: "Programa de educação digital",
      text: "O caso revelou iniciativas para ampliar o acesso ao ensino de tecnologia e incentivar a participação feminina."
    }
  },

  // =====================================================
  // CASO 012 — ISABELA GASPARINI
  // =====================================================
  {
    id: 12,
    number: "012",
    name: "Isabela Gasparini",
    specialty: "Computação Adaptativa",
    mechanic: "adaptive",
    location: "laboratory",
    title: "A plataforma que não se adaptava",
    story:
      "Uma plataforma de aprendizagem entrega o mesmo conteúdo para todos os estudantes, ignorando suas necessidades e formas de interação. Uma pesquisadora trabalha justamente com sistemas capazes de se adaptar aos usuários. Você deve descobrir como personalizar o ambiente.",
    introduction:
      "A plataforma não considera as diferenças entre estudantes. Investigue como sistemas adaptativos podem resolver o problema.",
    challenges: [
      {
        type: "logic",
        title: "Sistema adaptativo",
        question:
          "Qual é o objetivo dos sistemas adaptativos estudados por Isabela Gasparini?",
        options: [
          "Adaptar-se às necessidades, preferências e contextos dos usuários",
          "Impedir personalização",
          "Substituir completamente os ambientes de aprendizagem"
        ],
        answer: 0,
        explanation:
          "Sistemas adaptativos procuram adaptar-se às necessidades, preferências e contextos dos usuários."
      },
      {
        type: "analysis",
        title: "Personalização do ambiente",
        question:
          "Como os sistemas educacionais adaptativos podem melhorar a experiência de aprendizagem?",
        options: [
          "Oferecendo sempre o mesmo conteúdo para todos",
          "Considerando características, contextos e formas de interação dos estudantes",
          "Eliminando a interação dos estudantes com plataformas digitais"
        ],
        answer: 1,
        explanation:
          "Esses sistemas consideram características e contextos dos estudantes para adaptar os ambientes de aprendizagem."
      },
      {
        type: "decode",
        title: "Área de pesquisa",
        question:
          "Qual área do conhecimento está entre os temas de pesquisa de Isabela Gasparini?",
        options: ["Geologia", "Medicina Veterinária", "Computação Ubíqua"],
        answer: 2,
        explanation:
          "Computação Ubíqua é uma das áreas de pesquisa de Isabela Gasparini."
      }
    ],
    evidence: {
      id: "isabela-evidence",
      title: "Sistema adaptativo restaurado",
      text: "A investigação confirmou a importância de sistemas adaptativos e ambientes educacionais personalizados."
    }
  }
];

export default cases;