
import React, { useMemo, useState } from "react";

const MISSIONS = {
  "teresa-ludermir": {
    theme: "Redes neurais artificiais",
    intro: "Treine uma rede neural: reconheça padrões e escolha como o sistema deve aprender.",
    tasks: [
      { title: "Treinar o modelo", question: "Uma rede neural precisa aprender a reconhecer gatos em imagens. O que devemos fornecer?", options: ["Exemplos de imagens identificadas", "Somente nomes aleatórios", "Uma lista de cores sem contexto"], answer: 0, success: "O modelo aprende com exemplos associados às respostas corretas." },
      { title: "Encontrar padrões", question: "O sistema recebeu muitos exemplos. Qual é o próximo passo adequado?", options: ["Ignorar os dados", "Identificar características que se repetem", "Escolher uma resposta ao acaso"], answer: 1, success: "A rede ajusta suas conexões para reconhecer padrões nos dados." },
      { title: "Testar a rede", question: "Como verificar se o modelo aprendeu e não apenas decorou os exemplos?", options: ["Testá-lo com imagens novas", "Repetir a mesma imagem", "Desligar o sistema"], answer: 0, success: "Dados novos ajudam a avaliar a capacidade de generalização." }
    ]
  },
  "sandra-avila": {
    theme: "Visão computacional e imagens médicas",
    intro: "Analise imagens digitais e descubra como um computador pode interpretar informações visuais.",
    tasks: [
      { title: "Preparar a imagem", question: "Antes de analisar uma imagem médica, qual cuidado é importante?", options: ["Apagar os detalhes", "Verificar qualidade e resolução", "Trocar a imagem por texto aleatório"], answer: 1, success: "A qualidade da imagem influencia a análise computacional." },
      { title: "Identificar regiões", question: "Separar uma região de interesse do restante da imagem é chamado de:", options: ["Segmentação", "Compactação de áudio", "Criptografia de senha"], answer: 0, success: "A segmentação destaca regiões relevantes para a análise." },
      { title: "Validar resultado", question: "O sistema sinalizou uma possível alteração. O que deve acontecer?", options: ["Aceitar sem verificar", "Descartar a imagem", "Conferir o resultado com avaliação especializada"], answer: 2, success: "Sistemas de apoio não substituem a avaliação profissional." }
    ]
  },
  "ana-carolina-lorena": {
    theme: "Meta-aprendizado e complexidade de dados",
    intro: "Compare conjuntos de dados e descubra como escolher métodos de aprendizado adequados.",
    tasks: [
      { title: "Comparar conjuntos", question: "Dois conjuntos de dados têm tamanhos e características diferentes. O que analisar primeiro?", options: ["Apenas o nome dos arquivos", "Suas características e complexidade", "A cor da tela"], answer: 1, success: "Entender os dados ajuda a escolher métodos adequados." },
      { title: "Escolher o algoritmo", question: "Um algoritmo funciona bem em um conjunto, mas mal em outro. Qual atitude faz sentido?", options: ["Comparar o desempenho de diferentes métodos", "Usar sempre o mesmo sem avaliar", "Apagar os resultados"], answer: 0, success: "A comparação permite relacionar métodos às características dos dados." },
      { title: "Aprender a aprender", question: "Meta-aprendizado busca principalmente:", options: ["Eliminar todos os dados", "Trocar o computador", "Usar experiências anteriores para orientar novos aprendizados"], answer: 2, success: "O meta-aprendizado aproveita conhecimento sobre tarefas anteriores." }
    ]
  },
  "claudia-bauzer-medeiros": {
    theme: "Bancos de dados científicos",
    intro: "Organize dados de pesquisas e conecte informações para apoiar descobertas científicas.",
    tasks: [
      { title: "Organizar registros", question: "Uma pesquisa reúne milhares de medições ambientais. Como armazená-las de modo útil?", options: ["Em registros estruturados e organizados", "Em arquivos sem identificação", "Somente na memória de uma pessoa"], answer: 0, success: "A organização facilita consulta, análise e reutilização dos dados." },
      { title: "Integrar fontes", question: "Duas equipes usam formatos diferentes para dados do mesmo fenômeno. O que ajuda?", options: ["Ignorar uma equipe", "Definir padrões para integrar as fontes", "Misturar tudo sem conferir"], answer: 1, success: "Padrões e integração tornam os dados comparáveis." },
      { title: "Compartilhar ciência", question: "Qual prática favorece a reprodutibilidade de uma pesquisa?", options: ["Esconder os métodos", "Apagar os metadados", "Documentar dados, métodos e origem"], answer: 2, success: "Documentação permite compreender e verificar como os dados foram produzidos." }
    ]
  },
  "claudia-werner": {
    theme: "Engenharia de software",
    intro: "Monte um projeto sustentável reutilizando componentes e organizando etapas de desenvolvimento.",
    tasks: [
      { title: "Reutilizar componentes", question: "Uma equipe já possui um módulo confiável que resolve uma função necessária. O que pode fazer?", options: ["Reutilizar e adaptar o componente", "Reescrever tudo sem motivo", "Excluir os testes"], answer: 0, success: "A reutilização pode reduzir esforço e manter consistência." },
      { title: "Planejar mudanças", question: "Uma alteração afeta várias partes do sistema. Qual atitude é mais segura?", options: ["Alterar sem analisar", "Avaliar dependências e impactos", "Publicar sem testar"], answer: 1, success: "Analisar dependências reduz riscos de regressões." },
      { title: "Garantir qualidade", question: "Antes de entregar uma nova versão, a equipe deve:", options: ["Ignorar erros", "Remover documentação", "Executar testes e revisar o resultado"], answer: 2, success: "Testes e revisão ajudam a identificar problemas antes da entrega." }
    ]
  },
  "mirella-moro": {
    theme: "Dados e redes sociais",
    intro: "Investigue conexões, organize informações e interprete relações em redes digitais.",
    tasks: [
      { title: "Mapear conexões", question: "Em uma rede social, o que os nós e as ligações podem representar?", options: ["Pessoas e relações entre elas", "Somente cores", "Arquivos sem relação"], answer: 0, success: "Nós representam entidades e arestas representam relações." },
      { title: "Analisar interações", question: "Um perfil possui muitas conexões. Isso, sozinho, prova sua influência?", options: ["Sim, sempre", "Não; é preciso analisar contexto e tipos de interação", "Não existem redes"], answer: 1, success: "Quantidade de conexões não explica sozinha a estrutura ou influência." },
      { title: "Produção científica", question: "A bibliometria ajuda a estudar:", options: ["A velocidade do computador", "A temperatura da sala", "Publicações e indicadores da produção científica"], answer: 2, success: "A bibliometria analisa aspectos quantitativos da produção científica." }
    ]
  },
  "clarisse-sieckenius": {
    theme: "Engenharia semiótica e interação",
    intro: "Avalie como uma interface comunica suas possibilidades e orienta as pessoas.",
    tasks: [
      { title: "Interpretar a interface", question: "Um botão não deixa claro o que fará. Qual é o principal problema?", options: ["Comunicação insuficiente com o usuário", "Excesso de memória RAM", "Falta de conexão física"], answer: 0, success: "A interface precisa comunicar ações e consequências com clareza." },
      { title: "Melhorar a interação", question: "Usuários não encontram uma função importante. O que pode ajudar?", options: ["Esconder ainda mais a função", "Reorganizar a navegação e testar com usuários", "Retirar todas as instruções"], answer: 1, success: "Testes com usuários revelam dificuldades reais de interação." },
      { title: "Comunicação do sistema", question: "Na engenharia semiótica, a interface é entendida como:", options: ["Apenas decoração", "Um componente sem significado", "Uma forma de comunicação entre designers e usuários"], answer: 2, success: "A interface comunica a visão dos designers sobre como o sistema deve ser usado." }
    ]
  },
  "cecilia-baranauskas": {
    theme: "Acessibilidade e design universal",
    intro: "Adapte uma experiência digital para que mais pessoas consigam utilizá-la.",
    tasks: [
      { title: "Acesso ao conteúdo", question: "Uma imagem importante não possui descrição. O que falta?", options: ["Texto alternativo", "Mais animações", "Uma senha maior"], answer: 0, success: "Texto alternativo ajuda pessoas que usam leitores de tela." },
      { title: "Navegação inclusiva", question: "Como tornar um formulário mais acessível?", options: ["Usar apenas cores para indicar erros", "Identificar campos e mensagens de erro claramente", "Impedir navegação pelo teclado"], answer: 1, success: "Rótulos e mensagens claras ajudam diferentes pessoas a preencher o formulário." },
      { title: "Design universal", question: "Qual é a ideia central do design universal?", options: ["Criar uma solução para um único perfil", "Adicionar acessibilidade só no final", "Planejar produtos utilizáveis pelo maior número de pessoas"], answer: 2, success: "O design universal considera a diversidade desde o planejamento." }
    ]
  },
  "nina-da-hora": {
    theme: "Cibersegurança e justiça algorítmica",
    intro: "Audite um sistema automatizado e identifique riscos de segurança e vieses.",
    tasks: [
      { title: "Proteger dados", question: "Um sistema coleta dados pessoais. Qual prática é adequada?", options: ["Coletar tudo sem explicar", "Coletar apenas o necessário e proteger as informações", "Publicar os dados"], answer: 1, success: "Minimização e proteção de dados reduzem riscos à privacidade." },
      { title: "Detectar viés", question: "Um algoritmo apresenta resultados piores para um grupo. O que investigar?", options: ["Dados de treinamento e critérios do modelo", "A cor do computador", "O tamanho do monitor"], answer: 0, success: "Dados e critérios podem reproduzir desigualdades existentes." },
      { title: "Auditar decisões", question: "Uma decisão automatizada afeta uma pessoa. O que é importante garantir?", options: ["Que ninguém possa questionar", "Que o sistema não registre nada", "Transparência, possibilidade de revisão e responsabilização"], answer: 2, success: "Decisões automatizadas precisam de mecanismos de explicação e contestação." }
    ]
  },
  "camila-achutti": {
    theme: "Educação em tecnologia e participação feminina",
    intro: "Planeje uma iniciativa que aproxime mais meninas e mulheres da computação.",
    tasks: [
      { title: "Criar oportunidade", question: "Uma oficina quer aproximar iniciantes da programação. Qual começo é mais inclusivo?", options: ["Exigir experiência avançada", "Propor atividades práticas para diferentes níveis", "Restringir as inscrições sem justificativa"], answer: 1, success: "Atividades acessíveis ajudam pessoas com diferentes experiências a participar." },
      { title: "Combater barreiras", question: "Como enfrentar a baixa participação de mulheres na tecnologia?", options: ["Criar referências, apoio e oportunidades de formação", "Ignorar o problema", "Desestimular iniciantes"], answer: 0, success: "Referências e oportunidades contribuem para ampliar a participação." },
      { title: "Transformar ideia em projeto", question: "Depois de identificar um problema, qual é um próximo passo útil?", options: ["Desistir de avaliar", "Não ouvir o público", "Criar uma solução, testar e melhorar com feedback"], answer: 2, success: "Projetos evoluem quando são testados e aprimorados com as pessoas envolvidas." }
    ]
  },
  "isabela-gasparini": {
    theme: "Interação humano-computador",
    intro: "Avalie a experiência de uso de uma interface e encontre formas de melhorá-la.",
    tasks: [
      { title: "Encontrar dificuldades", question: "Várias pessoas não conseguem concluir uma tarefa no aplicativo. O que fazer?", options: ["Observar e testar a tarefa com usuários", "Culpar os usuários", "Retirar a função sem análise"], answer: 0, success: "A observação ajuda a identificar problemas de usabilidade." },
      { title: "Melhorar feedback", question: "Após clicar em salvar, a tela não mostra nenhuma resposta. O que falta?", options: ["Mais menus", "Feedback do sistema", "Um botão escondido"], answer: 1, success: "O feedback informa ao usuário o resultado de suas ações." },
      { title: "Avaliar usabilidade", question: "Uma interface fácil de aprender deve:", options: ["Exigir memorização de comandos", "Mudar os controles sem aviso", "Apresentar caminhos claros e consistentes"], answer: 2, success: "Consistência e clareza facilitam o aprendizado da interface." }
    ]
  },
  "liane-tarouco": {
    theme: "Informática na educação e redes",
    intro: "Conecte recursos educacionais e escolha formas confiáveis de compartilhar conhecimento.",
    tasks: [
      { title: "Conectar computadores", question: "Qual é a função de uma rede de computadores?", options: ["Permitir comunicação e compartilhamento de recursos", "Aumentar o peso dos arquivos", "Substituir todos os programas"], answer: 0, success: "Redes permitem troca de informações e compartilhamento de recursos." },
      { title: "Aprender com tecnologia", question: "Uma plataforma educacional é mais útil quando:", options: ["Impede colaboração", "Apoia objetivos de aprendizagem e interação", "Substitui todo planejamento pedagógico"], answer: 1, success: "A tecnologia deve apoiar objetivos pedagógicos claros." },
      { title: "Compartilhar conteúdo", question: "Para disponibilizar materiais de forma confiável, é importante:", options: ["Ignorar a conexão", "Enviar arquivos sem organização", "Organizar recursos e garantir acesso adequado"], answer: 2, success: "Organização e acesso adequado facilitam o uso dos recursos educacionais." }
    ]
  }
};

const DEFAULT_MISSION = {
  theme: "Pensamento computacional",
  intro: "Resolva desafios de lógica, análise e tecnologia.",
  tasks: [
    { title: "Analisar", question: "Qual atitude ajuda a resolver um problema complexo?", options: ["Dividi-lo em partes menores", "Ignorar informações", "Escolher ao acaso"], answer: 0, success: "Decompor o problema facilita sua resolução." },
    { title: "Comparar", question: "Ao avaliar duas soluções, o que devemos considerar?", options: ["Somente a aparência", "Critérios e resultados", "A primeira opção sempre"], answer: 1, success: "Critérios claros permitem comparar soluções." },
    { title: "Validar", question: "Como saber se uma solução funciona?", options: ["Supor que funciona", "Evitar testes", "Testar e analisar os resultados"], answer: 2, success: "Testes ajudam a verificar se a solução atende ao objetivo." }
  ]
};

export default function Museum({ researcher, onExit = () => {}, onComplete = () => {} }) {
  const mission = useMemo(
    () => MISSIONS[researcher?.id] || DEFAULT_MISSION,
    [researcher]
  );

  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [finished, setFinished] = useState(false);

  const currentTask = mission.tasks[step];

  const confirmAnswer = () => {
    if (answer === "") {
      setFeedback("Escolha uma resposta antes de confirmar.");
      return;
    }

    if (Number(answer) !== currentTask.answer) {
      setFeedback("Ainda não! Revise o desafio e tente outra resposta.");
      return;
    }

    setFeedback(currentTask.success);

    if (step === mission.tasks.length - 1) {
      setFinished(true);
      onComplete();
    } else {
      setStep((previous) => previous + 1);
      setAnswer("");
    }
  };

  const restart = () => {
    setStep(0);
    setAnswer("");
    setFeedback("");
    setFinished(false);
  };

  return (
    <main className="museum-screen">
      <header className="game-header">
        <div>
          <span className="eyebrow">OPERAÇÃO LOVELACE • FASE BÔNUS</span>
          <h2>Museu da Ciência</h2>
        </div>

        <button className="close-button" onClick={onExit}>
          VOLTAR À CIDADE
        </button>
      </header>

      <section className="museum-stage">
        <div
          className="museum-scene"
          style={{
            backgroundImage: `url("${process.env.PUBLIC_URL}/cenarios/museu.png")`,
          }}
        >
          <div className="scene-label">
            <span>MISSÃO CIENTÍFICA • {researcher?.name || "PESQUISADORA"}</span>
            <strong>{mission.theme}</strong>
          </div>

          <div className="museum-challenge-card">
            {!finished ? (
              <>
                <span className="eyebrow">
                  DESAFIO {step + 1} DE {mission.tasks.length}
                </span>

                <div className="museum-progress-track">
                  <div
                    className="museum-progress-fill"
                    style={{
                      width: `${(step / mission.tasks.length) * 100}%`,
                    }}
                  />
                </div>

                <h2>{currentTask.title}</h2>
                <p>{currentTask.question}</p>

                <div className="museum-options">
                  {currentTask.options.map((option, index) => (
                    <button
                      type="button"
                      key={option}
                      className={`museum-option ${
                        answer === String(index) ? "selected" : ""
                      }`}
                      onClick={() => {
                        setAnswer(String(index));
                        setFeedback("");
                      }}
                    >
                      <span>{String.fromCharCode(65 + index)}</span>
                      {option}
                    </button>
                  ))}
                </div>

                {feedback && (
                  <p className="museum-feedback">{feedback}</p>
                )}

                <button className="start-button" onClick={confirmAnswer}>
                  CONFIRMAR RESPOSTA
                </button>
              </>
            ) : (
              <>
                <span className="eyebrow">MISSÃO CONCLUÍDA</span>
                <div className="museum-trophy">✦</div>
                <h2>Desafio científico concluído!</h2>
                <p>
                  Você completou as três etapas sobre{" "}
                  {researcher?.name || "a pesquisadora"}. Uma nova habilidade
                  foi adicionada ao seu arquivo de investigação.
                </p>

                <button className="start-button" onClick={onExit}>
                  VOLTAR À CIDADE
                </button>

                <button className="close-button" onClick={restart}>
                  REFAZER DESAFIO
                </button>
              </>
            )}
          </div>

          <img
            className="scene-ada"
            src={`${process.env.PUBLIC_URL}/personagens/ada.png`}
            alt="Ada Lovelace"
          />
        </div>
      </section>

      <div className="museum-footer">
        <p>{mission.intro}</p>
        <span>Progresso: {finished ? 3 : step}/{mission.tasks.length}</span>
      </div>
    </main>
  );
}
