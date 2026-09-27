import type { TipArticle } from "./types";

export const tips: TipArticle[] = [
  {
    slug: "economizar-pp-nas-rotas",
    title: "Como atravessar rotas longas sem acabar com o PP dos golpes",
    category: "Exploração",
    summary:
      "Um roteiro simples para gerenciar energia, frutas e descanso durante travessias que duram mais de uma hora.",
    date: "2026-09-21",
    readTime: 4,
    colors: ["#3aa655", "#1f6d38"],
    sections: [
      {
        heading: "Divida a rota em blocos curtos",
        paragraphs: [
          "Travessias longas ficam mais fáceis quando você planeja paradas: cure no centro de cada cidade, guarde o restante para o treino. O tempo de caminhada é menor do que o tempo gasto refazendo caminho depois de um desmaio.",
          "Frutas dão um pequeno impulso de PP e custam nada. Plante-as em árvores perto do caminho principal e colha a cada passagem.",
        ],
        bullets: [
          "Cure sempre ao sair de uma cidade.",
          "Colete frutas antes de entrar em cavernas.",
          "Evite treinar com golpes de PP baixo em rotas comuns.",
        ],
      },
      {
        heading: "Quando usar um item de restauração",
        paragraphs: [
          "Restauradores totais valem mais em batalhas de ginásio do que em rotas. Guarde-os para o momento em que o líder aplicar confusão ou paralisia no seu atacante principal.",
        ],
      },
    ],
  },
  {
    slug: "farm-de-experiencia",
    title: "Farm de experiência rápido em qualquer região",
    category: "Treino",
    summary:
      "Onde treinar sem repetir batalhas inúteis e como aproveitar experiência multiplicada entre os membros do time.",
    date: "2026-09-19",
    readTime: 5,
    colors: ["#e3350d", "#8f1f06"],
    sections: [
      {
        heading: "Escolha o local certo",
        paragraphs: [
          "Rotas com treinadores renováveis, como as que usam o Vs. Seeker, dão muito mais experiência do que encontros selvagens aleatórios. Fique na mesma área por algumas rodadas e cure entre elas.",
          "Cavernas profundas têm níveis altos e menos gente: se o seu time já aguenta, o ganho por batalha é maior.",
        ],
        bullets: [
          "Torres e pokéspots: encontros renováveis.",
          "Cavernas: níveis altos, menos curas disponíveis.",
          "Rotas pós-liga: experiência multiplicada.",
        ],
      },
      {
        heading: "Aproveitando a experiência dividida",
        paragraphs: [
          "Quando vários Pokémon participam da batalha, a experiência se divide. Para treinar um recruta fraco, leve-o junto, troque-o logo no início e deixe o time principal encerrar o combate.",
          "Itens que dobram experiência valem mais em batalhas contra treinadores do que contra selvagens.",
        ],
      },
    ],
  },
  {
    slug: "pokemon-que-vale-a-pena-desde-cedo",
    title: "Cinco Pokémon que valem a pena captar desde cedo",
    category: "Equipe",
    summary:
      "Capturas fáceis nos primeiros níveis que continuam úteis até a liga, mesmo sem linhas lendárias.",
    date: "2026-09-16",
    readTime: 6,
    colors: ["#ffcb05", "#c99400"],
    sections: [
      {
        heading: "Escolha por cobertura, não por raridade",
        paragraphs: [
          "Pokémon comuns como rato, ave e inseto evoluem rápido e resolvem as primeiras vinte horas com folga. O que importa é a cobertura de tipos que eles trazem para o time.",
          "Reserve ao menos um espaço para um capturado raro: ele pode ser o diferencial contra o segundo ou terceiro ginásio.",
        ],
        bullets: [
          "Ave voadora: resolve encontros de planta e luta.",
          "Rato normal: evolui cedo e absorve dano.",
          "Inseto: disponível na primeira floresta, ideal para farm.",
        ],
      },
      {
        heading: "Sinais de que um Pokémon é bom investimento",
        paragraphs: [
          "Linhas que evoluem por nível simples, sem pedra ou troca, são as mais seguras. Prefira-as enquanto você ainda está montando a base do time.",
        ],
      },
    ],
  },
  {
    slug: "erros-comuns-no-primeiro-jogo",
    title: "Erros comuns de quem joga o primeiro jogo da franquia",
    category: "Iniciantes",
    summary:
      "Uma lista curta dos tropeços mais frequentes e como evitá-los sem estragar a diversão.",
    date: "2026-09-13",
    readTime: 5,
    colors: ["#2a75bb", "#1d5a94"],
    sections: [
      {
        heading: "Cuidado com o tempo de batalha",
        paragraphs: [
          "Usar golpes que não causam dano logo no início parece inofensivo, mas aumenta o tempo de cada encontro. Nos primeiros níveis, prefira ataques diretos e economize status para batalhas de líder.",
        ],
        bullets: [
          "Não capture tudo: caixas lotadas custam tempo.",
          "Não guarde tudo para depois: itens baratos ajudam agora.",
          "Não ignore o centro de Pokémon: cura grátis é ouro.",
        ],
      },
      {
        heading: "Equipe desequilibrada",
        paragraphs: [
          "Ter seis Pokémon do mesmo tipo parece poderoso até encontrar um adversário com vantagem. Mantenha pelo menos três tipos diferentes até o terceiro ginásio.",
        ],
      },
    ],
  },
  {
    slug: "uso-eficiente-da-corda-de-escape",
    title: "Uso eficiente da corda de escape",
    category: "Exploração",
    summary:
      "Quando usar a corda compensa e quando é melhor caminhar até o fim da caverna.",
    date: "2026-09-11",
    readTime: 3,
    colors: ["#8d6cb8", "#4d3470"],
    sections: [
      {
        heading: "Cordas são atalhos, não pânico",
        paragraphs: [
          "Use a corda quando o objetivo já foi cumprido: item coletado, treinador derrotado, captura feita. Guardá-la para emergências faz você gastar mais tempo refazendo caminhos.",
          "Em cavernas com dois andares, desça primeiro e use a corda só depois de explorar o andar de baixo.",
        ],
      },
    ],
  },
  {
    slug: "horario-e-pokemon-exclusivos",
    title: "Horário do jogo e encontros exclusivos",
    category: "Captura",
    summary:
      "Por que alguns Pokémon só aparecem de dia, de noite ou em dias específicos do calendário.",
    date: "2026-09-09",
    readTime: 4,
    colors: ["#4c5468", "#232733"],
    sections: [
      {
        heading: "Dia, noite e crepúsculo",
        paragraphs: [
          "Jogos a partir da segunda geração respeitam o relógio interno: encontros, evoluções e até certos eventos mudam conforme a hora. Ajuste o relógio se quiser caçar um alvo específico.",
          "Evoluções por amizade também respeitam o período do dia, então prepare a amizade antes de salvar no horário certo.",
        ],
        bullets: [
          "Dia: encontros de tipo planta e voador.",
          "Noite: encontros fantasma e sombrio.",
          "Fins de semana: eventos rotativos de loja.",
        ],
      },
    ],
  },
  {
    slug: "organizando-a-caixa-de-pokemon",
    title: "Como organizar a caixa de Pokémon sem virar refém dela",
    category: "Organização",
    summary:
      "Um sistema simples de caixas por região e tipo que elimina a bagunça no meio da aventura.",
    date: "2026-09-06",
    readTime: 4,
    colors: ["#4fc0e8", "#1d7ba0"],
    sections: [
      {
        heading: "Separe por função, não por número",
        paragraphs: [
          "Uma caixa para uso imediato, outra para evolução e uma terceira para completar a Pokédex. Com três caixas bem definidas, você nunca perde tempo procurando um Pokémon.",
          "Ordene as linhas de evolução lado a lado: visualmente fica fácil ver o que falta evoluir.",
        ],
      },
    ],
  },
  {
    slug: "antes-de-desafiar-o-ginasio",
    title: "Checklist antes de desafiar um ginásio",
    category: "Batalhas",
    summary:
      "Seis verificações rápidas que evitam derrotas evitáveis e refazimento de caminho.",
    readTime: 4,
    date: "2026-09-04",
    colors: ["#e3350d", "#9aa7bd"],
    sections: [
      {
        heading: "A lista completa",
        paragraphs: [
          "Ginásios são batalhas longas e sem loja entre os duelos. Passar por esta lista leva dois minutos e evita refazer o caminho inteiro.",
        ],
        bullets: [
          "Time curado no centro de Pokémon.",
          "Golpes com PP cheio ou perto disso.",
          "Pelo menos dois itens de cura na mochila.",
          "Um Pokémon com vantagem de tipo disponível.",
          "Salvo antes de entrar.",
          "Mochila organizada para achar itens rápido.",
        ],
      },
    ],
  },
  {
    slug: "capturar-sem-perder-o-alvo",
    title: "O que fazer quando o alvo foge da batalha",
    category: "Captura",
    summary:
      "Reagir a encontros que fujam, gerenciar status e não perder tempo tentando de novo no lugar errado.",
    date: "2026-09-01",
    readTime: 3,
    colors: ["#3aa655", "#ffcb05"],
    sections: [
      {
        heading: "Quando o Pokémon sempre escapa",
        paragraphs: [
          "Alguns encontros exigem que você bloqueie a fuga com uma habilidade ou status antes da primeira rodada. Paralisia e sono funcionam bem porque impedem a ação imediata.",
          "Se o alvo sair da tela, mude de área e volte: a maioria dos jogos sorteia o encontro novamente em poucos passos.",
        ],
      },
    ],
  },
];

export function getTip(slug: string): TipArticle | undefined {
  return tips.find((tip) => tip.slug === slug);
}
