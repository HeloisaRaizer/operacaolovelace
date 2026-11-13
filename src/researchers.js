const createResearcher = (
  id,
  name,
  institution,
  area,
  description,
  question,
  options,
  answer,
  explanation,
  cityClues,
  libraryClues
) => ({
  id,
  name,
  institution,
  area,
  description,
  question,
  options,
  answer,
  explanation,
  cityClues: cityClues.map((clue, index) => ({
    ...clue,
    id: `${id}-city-${index + 1}`,
    scene: "city",
  })),
  libraryClues: libraryClues.map((clue, index) => ({
    ...clue,
    id: `${id}-library-${index + 1}`,
    scene: "library",
  })),
});

const researchers = [
  createResearcher(
    "teresa-ludermir",
    "Teresa Ludermir",
    "Universidade Federal de Pernambuco (UFPE)",
    "Inteligência Artificial e Aprendizado de Máquina",
    "Pesquisadora brasileira reconhecida por suas contribuições em redes neurais artificiais e aprendizado de máquina.",
    "Qual conjunto de temas está mais diretamente relacionado às pesquisas de Teresa Ludermir?",
    [
      "Redes neurais artificiais e aprendizado profundo",
      "Aprendizado por reforço e tomada de decisão",
      "Mineração de dados e descoberta de padrões",
      "Processamento de linguagem natural",
    ],
    0,
    "As pistas apontam para inteligência artificial, redes neurais artificiais e aprendizado de máquina.",
    [
      {
        title: "Destino acadêmico",
        text: "Uma das pistas aponta para a Universidade Federal de Pernambuco, conhecida pela atuação em pesquisa e tecnologia.",
        x: 32,
        y: 37,
      },
      {
        title: "Pista tecnológica",
        text: "O relatório encontrado menciona sistemas capazes de aprender padrões a partir de dados.",
        x: 72,
        y: 65,
      },
    ],
    [
      {
        title: "Anotações sobre IA",
        text: "O documento cita inteligência artificial e modelos computacionais que aprendem com exemplos.",
        x: 22,
        y: 43,
      },
      {
        title: "Redes conectadas",
        text: "O desenho representa neurônios artificiais conectados, formando uma rede neural.",
        x: 52,
        y: 29,
      },
      {
        title: "Caderno de pesquisa",
        text: "As anotações reforçam o estudo de redes neurais artificiais e aprendizado de máquina.",
        x: 76,
        y: 53,
      },
    ]
  ),

  createResearcher(
    "sandra-avila",
    "Sandra Avila",
    "Universidade Estadual de Campinas (Unicamp)",
    "Visão Computacional e Aprendizado Profundo",
    "Pesquisadora brasileira que atua em visão computacional, aprendizado profundo e análise de imagens médicas.",
    "Qual conjunto de temas corresponde melhor à atuação de Sandra Avila?",
    [
      "Segmentação semântica e análise de imagens",
      "Reconhecimento de padrões e visão computacional",
      "Processamento de imagens médicas e aprendizado profundo",
      "Detecção de objetos e classificação visual",
    ],
    2,
    "As pistas relacionam Sandra Avila à visão computacional, ao aprendizado profundo e à análise de imagens médicas.",
    [
      {
        title: "Arquivo universitário",
        text: "O registro acadêmico encontrado indica vínculo com a Unicamp.",
        x: 32,
        y: 37,
      },
      {
        title: "Imagem suspeita",
        text: "Uma imagem médica aparece acompanhada de anotações sobre análise automatizada.",
        x: 72,
        y: 65,
      },
    ],
    [
      {
        title: "Imagem digital",
        text: "O material descreve técnicas computacionais para interpretar imagens.",
        x: 22,
        y: 43,
      },
      {
        title: "Aprendizado profundo",
        text: "Há referências a modelos de deep learning usados no processamento de imagens.",
        x: 52,
        y: 29,
      },
      {
        title: "Análise médica",
        text: "As anotações mencionam a aplicação de visão computacional em imagens médicas.",
        x: 76,
        y: 53,
      },
    ]
  ),

  createResearcher(
    "ana-carolina-lorena",
    "Ana Carolina Lorena",
    "Instituto Tecnológico de Aeronáutica (ITA)",
    "Aprendizado de Máquina",
    "Pesquisadora brasileira com atuação em aprendizado de máquina, meta-aprendizado e complexidade de dados.",
    "Qual assunto está mais relacionado às pesquisas de Ana Carolina Lorena?",
    [
      "Meta-aprendizado e complexidade de dados",
      "Aprendizado supervisionado e classificação",
      "Máquinas de vetores de suporte e reconhecimento de padrões",
      "Seleção de atributos e mineração de dados",
    ],
    0,
    "Meta-aprendizado, aprendizado de máquina e complexidade de dados são os temas indicados pelas pistas.",
    [
      {
        title: "Instituição",
        text: "Um registro leva ao Instituto Tecnológico de Aeronáutica, o ITA.",
        x: 32,
        y: 37,
      },
      {
        title: "Dados misteriosos",
        text: "O relatório encontrado compara diferentes conjuntos de dados e seus níveis de complexidade.",
        x: 72,
        y: 65,
      },
    ],
    [
      {
        title: "Aprender a aprender",
        text: "A expressão meta-aprendizado aparece destacada no documento.",
        x: 22,
        y: 43,
      },
      {
        title: "Modelos inteligentes",
        text: "As anotações tratam de algoritmos que identificam padrões em dados.",
        x: 52,
        y: 29,
      },
      {
        title: "Complexidade",
        text: "A última pista cita a complexidade dos dados como tema de investigação.",
        x: 76,
        y: 53,
      },
    ]
  ),

  createResearcher(
    "claudia-bauzer-medeiros",
    "Claudia Bauzer Medeiros",
    "Universidade Estadual de Campinas (Unicamp)",
    "Bancos de Dados e e-Science",
    "Pesquisadora brasileira associada a bancos de dados científicos, e-Science e aplicações com dados ambientais.",
    "Qual conjunto de temas está associado à trajetória de Claudia Bauzer Medeiros?",
    [
      "Bancos de dados científicos e e-Science",
      "Mineração de dados e inteligência artificial",
      "Integração de dados e sistemas distribuídos",
      "Modelagem e gerenciamento de dados",
    ],
    0,
    "As evidências relacionam a pesquisadora a bancos de dados científicos, e-Science e dados ambientais.",
    [
      {
        title: "Registro acadêmico",
        text: "O documento institucional encontrado aponta para a Unicamp.",
        x: 32,
        y: 37,
      },
      {
        title: "Dados ambientais",
        text: "Um mapa aparece acompanhado de informações ambientais organizadas em conjuntos de dados.",
        x: 72,
        y: 65,
      },
    ],
    [
      {
        title: "Banco de dados",
        text: "A primeira anotação fala sobre armazenamento e organização de dados científicos.",
        x: 22,
        y: 43,
      },
      {
        title: "Ciência colaborativa",
        text: "O termo e-Science aparece em uma página sobre pesquisa científica apoiada por tecnologia.",
        x: 52,
        y: 29,
      },
      {
        title: "Pesquisa ambiental",
        text: "O material menciona o uso de dados ambientais em pesquisas.",
        x: 76,
        y: 53,
      },
    ]
  ),

  createResearcher(
    "claudia-werner",
    "Cláudia Werner",
    "COPPE / Universidade Federal do Rio de Janeiro (UFRJ)",
    "Engenharia de Software",
    "Pesquisadora brasileira relacionada à engenharia de software, reutilização de software e ecossistemas de desenvolvimento.",
    "Qual conjunto de temas corresponde à atuação de Cláudia Werner?",
    [
      "Engenharia de software e reutilização de software",
      "Arquitetura de software e padrões de projeto",
      "Teste de software e garantia da qualidade",
      "Processos de desenvolvimento e manutenção",
    ],
    0,
    "As pistas destacam engenharia de software, reutilização e ecossistemas de desenvolvimento.",
    [
      {
        title: "Localização acadêmica",
        text: "O registro encontrado indica a COPPE, ligada à Universidade Federal do Rio de Janeiro.",
        x: 32,
        y: 37,
      },
      {
        title: "Projeto de sistema",
        text: "Um esquema mostra etapas de desenvolvimento e organização de um sistema.",
        x: 72,
        y: 65,
      },
    ],
    [
      {
        title: "Código reutilizável",
        text: "A anotação destaca a reutilização de componentes de software.",
        x: 22,
        y: 43,
      },
      {
        title: "Engenharia",
        text: "O documento apresenta práticas de engenharia de software.",
        x: 52,
        y: 29,
      },
      {
        title: "Ecossistemas",
        text: "A última pista menciona ecossistemas de desenvolvimento de software.",
        x: 76,
        y: 53,
      },
    ]
  ),

  createResearcher(
    "mirella-moro",
    "Mirella Moro",
    "Universidade Federal de Minas Gerais (UFMG)",
    "Banco de Dados e Redes Sociais",
    "Pesquisadora brasileira com atuação em gerenciamento de dados, redes sociais e bibliometria.",
    "Qual conjunto de temas está relacionado a Mirella Moro?",
    [
      "Gerenciamento de dados e redes sociais",
      "Mineração de dados e análise de redes",
      "Bibliometria e recuperação da informação",
      "Bancos de dados e sistemas de recomendação",
    ],
    0,
    "As pistas relacionam a pesquisadora ao gerenciamento de dados, às redes sociais e à bibliometria.",
    [
      {
        title: "Universidade",
        text: "O arquivo encontrado aponta para a Universidade Federal de Minas Gerais.",
        x: 32,
        y: 37,
      },
      {
        title: "Conexões digitais",
        text: "Um painel apresenta conexões entre perfis e informações de redes sociais.",
        x: 72,
        y: 65,
      },
    ],
    [
      {
        title: "Organização de dados",
        text: "O documento fala sobre gerenciamento e organização de grandes volumes de dados.",
        x: 22,
        y: 43,
      },
      {
        title: "Redes sociais",
        text: "As anotações apresentam relações e interações em redes sociais.",
        x: 52,
        y: 29,
      },
      {
        title: "Bibliometria",
        text: "A palavra bibliometria aparece em um relatório sobre produção científica.",
        x: 76,
        y: 53,
      },
    ]
  ),

  createResearcher(
    "clarisse-sieckenius",
    "Clarisse Sieckenius de Souza",
    "Pontifícia Universidade Católica do Rio de Janeiro (PUC-Rio)",
    "Engenharia Semiótica e Interação Humano-Computador",
    "Pesquisadora brasileira associada à engenharia semiótica e aos estudos de interação entre pessoas e sistemas computacionais.",
    "Qual conjunto de temas está relacionado às pesquisas de Clarisse Sieckenius de Souza?",
    [
      "Engenharia semiótica e interação humano-computador",
      "Usabilidade e avaliação de interfaces",
      "Design de interação e experiência do usuário",
      "Acessibilidade e comunicação em sistemas",
    ],
    0,
    "A engenharia semiótica e a interação humano-computador são os temas centrais indicados pelas pistas.",
    [
      {
        title: "Instituição",
        text: "O registro encontrado leva à PUC-Rio.",
        x: 32,
        y: 37,
      },
      {
        title: "Interface",
        text: "Uma tela apresenta anotações sobre a comunicação entre usuários e sistemas.",
        x: 72,
        y: 65,
      },
    ],
    [
      {
        title: "Comunicação",
        text: "O documento analisa como sistemas comunicam suas intenções aos usuários.",
        x: 22,
        y: 43,
      },
      {
        title: "Engenharia semiótica",
        text: "O termo aparece destacado em uma página de pesquisa.",
        x: 52,
        y: 29,
      },
      {
        title: "Interação",
        text: "A última pista aborda a interação humano-computador.",
        x: 76,
        y: 53,
      },
    ]
  ),

  createResearcher(
    "cecilia-baranauskas",
    "Cecília Baranauskas",
    "Universidade Estadual de Campinas (Unicamp)",
    "Acessibilidade e Design Universal",
    "Pesquisadora brasileira associada ao design universal, à acessibilidade digital e ao desenvolvimento de sistemas inclusivos.",
    "Qual conjunto de temas está ligado à atuação de Cecília Baranauskas?",
    [
      "Design universal e acessibilidade digital",
      "Interação humano-computador e usabilidade",
      "Tecnologias assistivas e inclusão digital",
      "Design participativo e sistemas inclusivos",
    ],
    0,
    "As pistas apontam para design universal, acessibilidade e desenvolvimento de sistemas inclusivos.",
    [
      {
        title: "Registro institucional",
        text: "O arquivo acadêmico encontrado aponta para a Unicamp.",
        x: 32,
        y: 37,
      },
      {
        title: "Acesso para todos",
        text: "Uma interface apresenta recursos pensados para diferentes necessidades de usuários.",
        x: 72,
        y: 65,
      },
    ],
    [
      {
        title: "Inclusão digital",
        text: "O material destaca a importância de sistemas que possam ser utilizados por diferentes pessoas.",
        x: 22,
        y: 43,
      },
      {
        title: "Design universal",
        text: "A expressão design universal aparece em uma anotação de pesquisa.",
        x: 52,
        y: 29,
      },
      {
        title: "Acessibilidade",
        text: "A última pista aborda acessibilidade em ambientes digitais.",
        x: 76,
        y: 53,
      },
    ]
  ),

  createResearcher(
    "nina-da-hora",
    "Nina da Hora",
    "Pontifícia Universidade Católica do Rio de Janeiro (PUC-Rio)",
    "Cibersegurança e Justiça Algorítmica",
    "Pesquisadora e divulgadora brasileira que aborda tecnologia, segurança digital, justiça algorítmica e vieses raciais.",
    "Qual conjunto de temas combina com os assuntos abordados por Nina da Hora?",
    [
      "Cibersegurança e justiça algorítmica",
      "Privacidade e proteção de dados",
      "Auditoria de algoritmos e vieses",
      "Ética em inteligência artificial",
    ],
    0,
    "As evidências apontam para cibersegurança, justiça algorítmica e discussões sobre vieses em sistemas tecnológicos.",
    [
      {
        title: "Registro acadêmico",
        text: "O arquivo encontrado faz referência à PUC-Rio.",
        x: 32,
        y: 37,
      },
      {
        title: "Sistema em análise",
        text: "Um relatório questiona se um algoritmo pode reproduzir desigualdades.",
        x: 72,
        y: 65,
      },
    ],
    [
      {
        title: "Segurança digital",
        text: "O documento aborda proteção de sistemas e segurança no ambiente digital.",
        x: 22,
        y: 43,
      },
      {
        title: "Justiça algorítmica",
        text: "A expressão aparece em uma anotação sobre decisões automatizadas.",
        x: 52,
        y: 29,
      },
      {
        title: "Vieses",
        text: "A última pista discute vieses raciais que podem estar presentes em algoritmos.",
        x: 76,
        y: 53,
      },
    ]
  ),

  createResearcher(
    "camila-achutti",
    "Camila Achutti",
    "Universidade de São Paulo (USP)",
    "Educação em Tecnologia e Empreendedorismo",
    "Profissional brasileira ligada à educação em tecnologia, ao empreendedorismo e à participação de mulheres na computação.",
    "Qual conjunto de temas está relacionado à trajetória de Camila Achutti?",
    [
      "Educação em tecnologia e participação feminina",
      "Empreendedorismo e inovação digital",
      "Formação em programação e computação",
      "Inclusão e diversidade no setor tecnológico",
    ],
    0,
    "As pistas destacam educação em tecnologia, empreendedorismo e iniciativas de participação feminina na computação.",
    [
      {
        title: "Instituição",
        text: "Um registro acadêmico aponta para a Universidade de São Paulo.",
        x: 32,
        y: 37,
      },
      {
        title: "Participação feminina",
        text: "O material encontrado destaca a presença de mulheres no setor de tecnologia.",
        x: 72,
        y: 65,
      },
    ],
    [
      {
        title: "Aprender tecnologia",
        text: "O documento aborda educação e formação na área tecnológica.",
        x: 22,
        y: 43,
      },
      {
        title: "Empreendedorismo",
        text: "Uma anotação relaciona tecnologia à criação de iniciativas e negócios.",
        x: 52,
        y: 29,
      },
      {
        title: "Mulheres na computação",
        text: "A última pista destaca ações para ampliar a participação feminina na computação.",
        x: 76,
        y: 53,
      },
    ]
  ),

  createResearcher(
    "isabela-gasparini",
    "Isabela Gasparini",
    "Universidade do Estado de Santa Catarina (UDESC)",
    "Interação Humano-Computador",
    "Pesquisadora brasileira associada à área de interação humano-computador. As informações específicas sobre sua trajetória devem ser complementadas com fontes acadêmicas.",
    "Qual área está indicada no perfil desta pesquisadora?",
    [
      "Interação humano-computador",
      "Usabilidade e experiência do usuário",
      "Design de interfaces e avaliação",
      "Acessibilidade em sistemas interativos",
    ],
    0,
    "O perfil fornecido para este caso relaciona Isabela Gasparini à interação humano-computador.",
    [
      {
        title: "Registro institucional",
        text: "O material do caso indica a Universidade do Estado de Santa Catarina, a UDESC.",
        x: 32,
        y: 37,
      },
      {
        title: "Experiência digital",
        text: "Uma anotação menciona a relação entre pessoas e sistemas computacionais.",
        x: 72,
        y: 65,
      },
    ],
    [
      {
        title: "Usuários",
        text: "O documento destaca a importância de compreender as necessidades dos usuários.",
        x: 22,
        y: 43,
      },
      {
        title: "Interfaces",
        text: "As anotações mencionam interfaces e formas de interação com sistemas.",
        x: 52,
        y: 29,
      },
      {
        title: "Interação humano-computador",
        text: "A última pista confirma a área indicada no perfil desta pesquisadora.",
        x: 76,
        y: 53,
      },
    ]
  ),

  createResearcher(
    "liane-tarouco",
    "Liane Tarouco",
    "Trajetória acadêmica ligada à informática na educação e às redes de computadores",
    "Informática na Educação e Redes",
    "Pesquisadora brasileira lembrada por sua contribuição histórica à informática na educação e às redes de computadores. Este caso é uma homenagem à sua trajetória.",
    "Quais áreas estão relacionadas ao legado acadêmico de Liane Tarouco?",
    [
      "Informática na educação e redes de computadores",
      "Ambientes virtuais de aprendizagem e tecnologias educacionais",
      "Comunicação de dados e infraestrutura de redes",
      "Educação a distância e recursos digitais",
    ],
    0,
    "As pistas destacam a contribuição histórica de Liane Tarouco para a informática na educação e as redes de computadores.",
    [
      {
        title: "Arquivo histórico",
        text: "O registro apresenta uma trajetória acadêmica ligada à tecnologia e à educação.",
        x: 32,
        y: 37,
      },
      {
        title: "Conexões",
        text: "Um esquema mostra computadores conectados em rede.",
        x: 72,
        y: 65,
      },
    ],
    [
      {
        title: "Educação e tecnologia",
        text: "O documento aborda o uso de recursos tecnológicos em processos educacionais.",
        x: 22,
        y: 43,
      },
      {
        title: "Redes de computadores",
        text: "A anotação apresenta conceitos relacionados à comunicação entre computadores.",
        x: 52,
        y: 29,
      },
      {
        title: "Legado",
        text: "A última pista reforça sua contribuição histórica para a informática na educação.",
        x: 76,
        y: 53,
      },
    ]
  ),
];

export default researchers;