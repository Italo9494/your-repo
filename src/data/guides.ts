import type { Guide, GuideCategory } from "./types";

export const guideCategories: GuideCategory[] = [
  { slug: "iniciantes", name: "Iniciantes", description: "Primeiros passos para quem está começando na franquia." },
  { slug: "captura", name: "Captura", description: "Técnicas para completar a Pokédex sem perder Pokémon raros." },
  { slug: "evolucao", name: "Evolução", description: "Formas, níveis, pedras e métodos alternativos de evolução." },
  { slug: "batalhas", name: "Batalhas", description: "Estratégias de time, vantagens de tipo e preparação." },
  { slug: "itens", name: "Itens", description: "Onde encontrar itens importantes e como usá-los melhor." },
  { slug: "ginasios", name: "Ginásios", description: "Como vencer cada líder com o mínimo de frustração." },
  { slug: "elite-four", name: "Elite Four", description: "Preparação completa para o desafio final da liga." },
  { slug: "pos-jogo", name: "Pós-jogo", description: "O que fazer depois de conquistar a Liga Pokémon." },
  { slug: "segredos", name: "Segredos", description: "Áreas secretas, eventos ocultos e curiosidades do mapa." },
];

export const guides: Guide[] = [
  {
    slug: "como-comecar-sua-jornada",
    title: "Como começar sua jornada em qualquer jogo de Pokémon",
    category: "iniciantes",
    summary:
      "Um roteiro simples para as primeiras horas: escolha do inicial, primeiras capturas, leitura do mapa e hábitos que facilitam a aventura.",
    date: "2026-09-18",
    readTime: 6,
    gameSlugs: ["pokemon-fire-red", "pokemon-emerald", "pokemon-diamond"],
    colors: ["#2a75bb", "#1d5a94"],
    sections: [
      {
        heading: "Antes de escolher seu inicial",
        paragraphs: [
          "O Pokémon inicial define o ritmo das primeiras horas, mas não decide a jornada inteira. Pense em cobertura de tipos: um inicial de planta facilita os dois primeiros ginásios clássicos, enquanto um inicial de água dá mais segurança contra líderes resistentes.",
          "Se é a sua primeira vez, prefira o inicial que gosta visualmente. A curva de aprendizado é suave o suficiente para qualquer escolha chegar até a liga.",
        ],
        bullets: [
          "Planta: vantagem cedo, mas encontros de voador exigem cuidado.",
          "Água: defesa alta e ataques confiáveis em qualquer situação.",
          "Fogo: ofensiva forte, porém exige mais curas nas primeiras rotas.",
        ],
      },
      {
        heading: "Os primeiros hábitos que evitam retrabalho",
        paragraphs: [
          "Salve sempre em centros de Pokémon antes de entrar em cavernas, florestas ou ginásios. Essa simples rotina evita perder meia hora de progresso em um encontro ruim.",
          "Fale com todos os moradores das cidades: parte dos itens iniciais, vouchers e dicas de mapa vem de diálogos opcionais que ninguém marca no mapa.",
        ],
        bullets: [
          "Mantenha ao menos dois Pokémon com tipos diferentes no time.",
          "Compre Poké Bolas em lotes: elas ficam mais baratas em cidades maiores.",
          "Guarde os itens de cura raros para as batalhas de ginásio.",
        ],
      },
    ],
  },
  {
    slug: "capturar-pokemon-raros",
    title: "Técnicas para capturar Pokémon raros sem desperdiçar bolas",
    category: "captura",
    summary:
      "Reduza a vida do alvo, aplique status e escolha a bola certa: o método completo para não perder encontros difíceis.",
    date: "2026-09-15",
    readTime: 7,
    gameSlugs: ["pokemon-fire-red", "pokemon-gold"],
    colors: ["#e3350d", "#8f1f06"],
    sections: [
      {
        heading: "A matemática da captura",
        paragraphs: [
          "A chance de captura cresce conforme a vida do Pokémon desce e conforme o status alterado é aplicado. Dormir e paralisia são os estados mais seguros: ambos reduzem a ação do alvo sem arriscar a captura.",
          "Evite derrubar o oponente até zero: a batalha encerra e o Pokémon é perdido. Trabalhe com uma faixa baixa de vida e mantenha o status ativo enquanto tenta a bola.",
        ],
        bullets: [
          "Reduza a vida até menos de um quarto do total.",
          "Aplique sono, paralisia ou congelo conforme o tipo do alvo.",
          "Escolha a bola mais barata possível para encontros comuns.",
        ],
      },
      {
        heading: "Qual bola usar em cada situação",
        paragraphs: [
          "Poké Bola comum resolve a maioria dos encontros nas rotas iniciais. Great Ball vale a pena em cavernas, Ultra Ball em pós-jogo e bolas especializadas em alvos de tipos específicos.",
          "Pesque quando o alvo for de tipo água: a bola é ignorada pela física da rede e funciona em qualquer profundidade.",
        ],
        bullets: [
          "Nivel 1 a 20: Poké Bola comum.",
          "Cavernas e florestas profundas: Great Ball.",
          "Lendários e pós-jogo: Ultra Ball com status aplicado.",
        ],
      },
    ],
  },
  {
    slug: "evolucoes-por-amizade",
    title: "Evoluções por amizade: como fazer evoluir sem adivinhar",
    category: "evolucao",
    summary:
      "Passo a passo para criar amizade com seus Pokémon, incluindo caminhos, itens que aceleram o processo e cuidados com níveis altos.",
    date: "2026-09-12",
    readTime: 5,
    gameSlugs: ["pokemon-gold", "pokemon-heart-gold"],
    colors: ["#f2a83b", "#b26a10"],
    sections: [
      {
        heading: "O que aumenta a amizade",
        paragraphs: [
          "Batalhas vencidas, itens de cura e caminhar pelo mapa com o Pokémon na equipe aumentam o laço. Frutas e doces dão um impulso maior quando o tempo é curto.",
          "Amizade cai com desmaios e com o uso excessivo de itens estranhos. Evite desmaiá-lo repetidamente enquanto prepara a evolução.",
        ],
        bullets: [
          "Derrote treinadores com o Pokémon no time.",
          "Use frutas e doces entre as batalhas.",
          "Mantenha o Pokémon na equipe principal, não na caixa.",
        ],
      },
      {
        heading: "Cuidado com o nível",
        paragraphs: [
          "Algumas linhas evoluem por amizade em um nível específico. Se o nível já passou, o jogo ainda reconhece a condição na próxima subida.",
          "Para alvos que evoluem por amizade durante o dia ou à noite, faça a batalha final no período correto: o relógio do jogo conta para a evolução.",
        ],
      },
    ],
  },
  {
    slug: "montando-time-equilibrado",
    title: "Montando um time equilibrado para a liga",
    category: "batalhas",
    summary:
      "Como distribuir tipos, funções e cobertura de fraquezas para enfrentar a Elite Four com confiança.",
    date: "2026-09-10",
    readTime: 8,
    gameSlugs: ["pokemon-fire-red", "pokemon-emerald", "pokemon-diamond"],
    colors: ["#3aa655", "#1f6d38"],
    sections: [
      {
        heading: "Cobertura antes de força",
        paragraphs: [
          "Um time vencível não é o que tem os maiores níveis, e sim o que cobre o maior número de tipos com ataques confiáveis. Priorize Pokémon que aprendem golpes de dois ou três tipos diferentes.",
          "Distribua as funções: um tanque para absorver dano, um atacante rápido para encerrar encontros e um suporte com curas ou status.",
        ],
        bullets: [
          "Cinco tipos atacantes diferentes cobrem a maioria dos líderes.",
          "Mantenha ao menos um Pokémon resistente a golpes fantasma e psíquico.",
          "Reserve um espaço para um Pokémon utilitário com HM.",
        ],
      },
      {
        heading: "Preparação para os quatro desafiantes",
        paragraphs: [
          "Leve itens de cura em quantidade dobrada em relação ao que você usa normalmente. A liga não tem loja entre os duelos, então cada potion importa.",
          "Estude o tipo de cada desafiante e posicione seu Pokémon mais vantajoso na abertura. A primeira troca define o ritmo de cada batalha.",
        ],
        bullets: [
          "Restauradores totais para status duráveis.",
          "Hiper pocões compradas antes de entrar.",
          "Um Pokémon com golpe de área para encontros duplos.",
        ],
      },
    ],
  },
  {
    slug: "itens-que-vale-a-pena-guardar",
    title: "Itens que valem a pena guardar até o fim do jogo",
    category: "itens",
    summary:
      "Uma lista prática de itens que parecem inúteis no início e se tornam essenciais na reta final.",
    date: "2026-09-07",
    readTime: 4,
    gameSlugs: ["pokemon-fire-red", "pokemon-ruby"],
    colors: ["#ffcb05", "#c99400"],
    sections: [
      {
        heading: "Itens de história e evolution",
        paragraphs: [
          "Pedras evolutivas raras e itens de troca devem ser guardados até você ter certeza da linha que quer completar. Destrui-las cedo costuma ser o erro mais comum de quem está aprendendo.",
          "Fósseis, conchas e pedras especiais encontradas em cavernas quase sempre têm uso melhor no pós-jogo.",
        ],
        bullets: [
          "Fósseis: decida a reanimação depois de ver a tabela do laboratório.",
          "Pedras raras: guarde para linhas que exigem troca.",
          "Itens de cura grandiosos: reserve para a Elite Four.",
        ],
      },
      {
        heading: "Itens de uso no mapa",
        paragraphs: [
          "Cordas de escape, repelentes e frutas de cura parecem supérfluos, mas encurtam muito travessias longas de caverna.",
          "Guarde um espaço fixo na mochila para cada categoria: isso evita perder tempo procurando itens durante batalhas difíceis.",
        ],
      },
    ],
  },
  {
    slug: "vencendo-primeiro-ginasio",
    title: "Vencendo o primeiro ginásio sem depender de sorte",
    category: "ginasios",
    summary:
      "Preparação de nível, escolha de golpes e alternativas quando seu inicial tem desvantagem de tipo.",
    date: "2026-09-05",
    readTime: 5,
    gameSlugs: ["pokemon-fire-red", "pokemon-leaf-green"],
    colors: ["#9aa7bd", "#565f73"],
    sections: [
      {
        heading: "Nível e leitura do oponente",
        paragraphs: [
          "O primeiro ginásio quase sempre testa se você entende vantagem de tipo. Chegue com seu inicial alguns níveis acima do líder e com um segundo Pokémon que cubra a fraqueza dele.",
          "Leia a equipe do líder antes de entrar: se os dois Pokémon são do mesmo tipo, um golpe eficaz resolve a batalha inteira.",
        ],
        bullets: [
          "Nível recomendado: entre 12 e 14.",
          "Leve um Pokémon de tipo alternativo capturado na rota.",
          "Cure o time completo antes da entrada.",
        ],
      },
      {
        heading: "Quando o inicial tem desvantagem",
        paragraphs: [
          "Se o seu inicial é fraco contra o tipo do líder, capture um Pokémon auxiliar logo antes. Um inicial de fogo, por exemplo, sofre contra pedra, mas resolve o problema com um ataque de água capturado na floresta.",
          "Ataques especiais costumam ignorar a defesa alta dos líderes iniciais: priorize-os quando o golpe físico não causar dano suficiente.",
        ],
      },
    ],
  },
  {
    slug: "preparando-elite-four",
    title: "Preparação completa para a Elite Four",
    category: "elite-four",
    summary:
      "Roteiro de farm, lista de itens e sugestões de time para encarar os quatro desafiantes e o campeão em sequência.",
    date: "2026-09-02",
    readTime: 9,
    gameSlugs: ["pokemon-fire-red", "pokemon-diamond", "pokemon-black"],
    colors: ["#e3350d", "#2a75bb"],
    sections: [
      {
        heading: "Antes de entrar no prédio",
        paragraphs: [
          "Termine a Pokédex regional pelo menos até ter os tipos essenciais e garanta que seu time principal está com nível compatível com o campeão.",
          "Compre o máximo possível de hiper pocões e restauradores totais. Depois da primeira batalha, a loja desaparece da rotina: tudo precisa estar na mochila.",
        ],
        bullets: [
          "Nível médio do time: 5 a 8 níveis acima do primeiro desafiante.",
          "Dois restauradores totais por desafiante.",
          "Um Pokémon rápido com ataque de área.",
        ],
      },
      {
        heading: "Estratégia por desafiante",
        paragraphs: [
          "Comece cada duelo com o Pokémon que tem vantagem de tipo e derrube o primeiro oponente antes de trocar. Isso reduz o dano recebido e preserva suas curas.",
          "Reserve o time completo para o campeão: ele quase sempre mistura tipos e exige pelo menos duas trocas bem planejadas.",
        ],
        bullets: [
          "Estude a ordem dos Pokémon de cada desafiante.",
          "Não guarde itens para depois: use-os durante os duelos.",
          "Se um Pokémon desmaiar, avalie a troca antes de usar restaurador.",
        ],
      },
    ],
  },
  {
    slug: "o-que-fazer-pos-jogo",
    title: "O que fazer depois de vencer a liga",
    category: "pos-jogo",
    summary:
      "Atividades que abrem depois do título final: novas áreas, aprofundamento da Pokédex, desafios de nível e coleções.",
    date: "2026-08-29",
    readTime: 6,
    gameSlugs: ["pokemon-fire-red", "pokemon-emerald"],
    colors: ["#4fc0e8", "#1d7ba0"],
    sections: [
      {
        heading: "Novas áreas e lendas",
        paragraphs: [
          "Após a liga, várias rotas liberam áreas que antes estavam bloqueadas por HM ou por eventos da história. É o momento de voltar a cidades antigas e conferir caminhos fechados.",
          "Lendários e áreas de alto nível aparecem nessas janelas: leve time curado e bolas reservadas.",
        ],
        bullets: [
          "Revisite rotas antigas com HM novos.",
          "Confira ilhas e cavernas que exigiam itens de história.",
          "Guarde espaço na caixa para capturas raras.",
        ],
      },
      {
        heading: "Desafios de nível e coleção",
        paragraphs: [
          "Batalhas alternativas, torneios e missões secundárias dão propósito ao treino depois da liga. É também o melhor momento para completar evoluções por troca.",
          "Organize a caixa por região e tipo: manter a Pokédex ordenada facilita concluir 100% sem capturas repetidas.",
        ],
      },
    ],
  },
  {
    slug: "areas-secretas-de-kanto",
    title: "Áreas secretas de Kanto que quase ninguém visita",
    category: "segredos",
    summary:
      "Locais escondidos, passagens laterais e detalhes de mapa que mudam a forma de explorar a região clássica.",
    date: "2026-08-26",
    readTime: 5,
    gameSlugs: ["pokemon-fire-red", "pokemon-yellow"],
    colors: ["#3aa655", "#1f6d38"],
    sections: [
      {
        heading: "Por trás das casas e árvores",
        paragraphs: [
          "Kanto tem vários caminhos que só aparecem quando você tem HM de corte ou força. Árvores suspeitas na entrada de rotas escondem passagens curas com itens e treinadores.",
          "Algumas casas têm portas traseiras que ligam ruas aparentemente separadas. Percorrer as cidades de trás para frente revela atalhos úteis.",
        ],
        bullets: [
          "Confira cada árvore marcada no início das rotas.",
          "Fale com treinadores ocultos em cantos de cidade.",
          "Use corda de escape para conferir andares altos de cavernas.",
        ],
      },
      {
        heading: "Detalhes que mudam a rota",
        paragraphs: [
          "Muitos jogadores seguem sempre o caminho principal e perdem áreas com Pokémon exclusivos. Reserve uma hora para explorar sem objetivo: é nesse tipo de passeio que as capturas raras aparecem.",
          "Marque no mapa os locais que exigem item: quando conseguir a HM certa, você terá um roteiro pronto de revisão.",
        ],
      },
    ],
  },
  {
    slug: "tipos-na-pratica",
    title: "Vantagem de tipo na prática: quando realmente importa",
    category: "batalhas",
    summary:
      "Como usar a tabela de tipos sem decorar nada, com exemplos de trocas que resolvem batalhas difíceis.",
    date: "2026-08-22",
    readTime: 6,
    gameSlugs: ["pokemon-platinum", "pokemon-soul-silver"],
    colors: ["#2a75bb", "#e3350d"],
    sections: [
      {
        heading: "Pense em cobertura, não em tabela",
        paragraphs: [
          "Em vez de decorar a tabela inteira, aprenda três relações essenciais: fogo vence planta, planta vence água e água vence fogo. Com essas três, você cobre a maior parte das rotas iniciais.",
          "Golpes psíquicos e sombrios formam um par que se anula: tenha sempre um golpe físico ou de outro tipo para quebrar esse impasse.",
        ],
        bullets: [
          "Planta: fraco contra fogo, gelo, voador e veneno.",
          "Água: fraco contra planta e elétrico.",
          "Pedra: fraco contra água, planta e luta.",
        ],
      },
      {
        heading: "Trocas que valem a pena",
        paragraphs: [
          "Trocar de Pokémon no meio da batalha custa um turno. Faça isso só quando a vantagem for grande ou quando o próximo golpe do oponente for letal.",
          "Se o oponente já está com status alterado, aproveite para curar ou preparar um buff antes de trocar.",
        ],
      },
    ],
  },
  {
    slug: "completando-pokedex",
    title: "Completando a Pokédex sem guias de terceiros",
    category: "captura",
    summary:
      "Um método simples de registro, troca e organização para fechar a Pokédex usando só o que o jogo oferece.",
    date: "2026-08-18",
    readTime: 7,
    gameSlugs: ["pokemon-fire-red", "pokemon-diamond"],
    colors: ["#e3350d", "#ffcb05"],
    sections: [
      {
        heading: "Organize a caixa desde cedo",
        paragraphs: [
          "Capture tudo o que encontrar nas primeiras rotas e separe em duas caixas: uma para uso imediato e outra para evolução. Isso evita refazer capturas antigas quando a tabela começa a ficar cheia.",
          "Marque os números ausentes da Pokédex com um papel ou planilha: o jogo registra o que você viu, mas não diz onde capturar de novo.",
        ],
        bullets: [
          "Uma caixa por região.",
          "Anote local e horário dos encontros raros.",
          "Evite evoluir antes de registrar a forma base.",
        ],
      },
      {
        heading: "Evoluções e trocas pendentes",
        paragraphs: [
          "Liste as linhas que exigem troca e resolva-as em bloco, aproveitando a mesma sessão de jogo. É mais rápido do que voltar várias vezes ao mesmo ponto.",
          "Confira se o Pokémon precisa de nível, amizade ou item: a ordem dessas condições muda o resultado da evolução.",
        ],
      },
    ],
  },
  {
    slug: "ataques-opcionais-valem-a-pena",
    title: "Quando vale a pena perder um ataque para aprender outro",
    category: "segredos",
    summary:
      "Como decidir entre manter um golpe de mobilidade e abrir espaço para ofensiva sem se arrepender depois.",
    date: "2026-08-14",
    readTime: 4,
    gameSlugs: ["pokemon-emerald", "pokemon-heart-gold"],
    colors: ["#8d6cb8", "#4d3470"],
    sections: [
      {
        heading: "A regra dos quatro espaços",
        paragraphs: [
          "Guarde sempre um espaço para um golpe de status ou utilidade. Times com quatro ataques puros perdem eficiência em batalhas longas, quando o dano acumulado passa a pesar.",
          "HM podem ocupar um espaço fixo em um Pokémon dedicado: escolha um que já tenha boa cobertura de tipos.",
        ],
        bullets: [
          "Um golpe de status por time é suficiente.",
          "Reserve um Pokémon para as HM do mapa.",
          "Reaprenda golpes só quando a configuração do time mudar.",
        ],
      },
      {
        heading: "Sinais de que é hora de trocar",
        paragraphs: [
          "Quando um golpe não causa mais dante relevante contra três inimigos seguidos, ele perdeu a vaga. Meça a utilidade real em batalhas práticas, não na descrição.",
          "Golpes com efeito de campo duram a batalha inteira: priorize-os quando você joga de forma mais cautelosa.",
        ],
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((guide) => guide.slug === slug);
}


export function getCategory(slug: string): GuideCategory | undefined {
  return guideCategories.find((category) => category.slug === slug);
}
