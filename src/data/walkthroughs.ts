import type { Walkthrough } from "./types";

const fireRedChapters = [
  {
    slug: "pallet-town",
    title: "Pallet Town",
    order: 1,
    intro:
      "Sua história começa na pequena vila de Pallet, onde o laboratório do Professor Carvalho já está de portas abertas. Antes de sair pelo mundo, vale conferir a casa ao lado do laboratório e falar com todos os moradores: cada diálogo esconde uma dica útil sobre batalhas e centros de Pokémon.",
    objective:
      "Escolher seu Pokémon inicial e registrar a jornada no primeiro passo da Pokédex.",
    route:
      "Entre na vila pelo sul, visite a casa do seu rival, suba até o laboratório e converse com o professor. Depois siga pela rota ao norte para alcançar a Cidade Viridian.",
    pokemon: [
      { name: "Bulbasaur", note: "Opção equilibrada com vantagem contra os dois primeiros ginásios." },
      { name: "Charmander", note: "Risco maior no início, mas ótimo contra Weedle e Caterpie da Rota 1." },
      { name: "Squirtle", note: "Defesa sólida e water gun resolve Brock com menos problema." },
    ],
    items: [
      { name: "Pokédex", note: "Receba do professor Carvalho ao escolher seu inicial." },
      { name: "Poké Bolas (5)", note: "Entregues pelo professor para as primeiras capturas." },
    ],
    trainers: [
      { name: "Rival (primeira batalha)", note: "Time dele parte do tipo que tem vantagem contra o seu." },
    ],
    tips: [
      "Salve no centro de Pokémon antes de qualquer batalha difícil.",
      "Fale com todos os moradores: vários entregam itens pequenos de graça.",
      "Guarde os potions iniciais para a floresta, onde os encontros se acumulam.",
    ],
    mapNote:
      "Pallet Town tem duas casas, um laboratório e uma saída ao norte. Não há capturas obrigatórias aqui.",
  },
  {
    slug: "route-1",
    title: "Rota 1",
    order: 2,
    intro:
      "A Rota 1 é um corredor simples de grama que conecta Pallet Town a Viridian City. É o melhor lugar para treinar seu inicial até o nível 5 ou 6 antes de encarar qualquer treinador.",
    objective:
      "Subir alguns níveis e capturar um segundo Pokémon para cobrir a fraqueza do seu inicial.",
    route:
      "Siga a estrada reta ao norte. Há grama alta dos dois lados; entre nela para encontrar Pokémon selvagens e continue até o portão da cidade.",
    pokemon: [
      { name: "Pidgey", note: "Comum e confiável, evolui cedo e ajuda desde o começo." },
      { name: "Rattata", note: "Rápida, fácil de capturar e útil para absorver dano." },
    ],
    items: [{ name: "Poké Bola extra", note: "Consiga derrotando treinadores ou em drops raros." }],
    trainers: [
      { name: "Treinador de aves", note: "Pouca vida, mas muitos encontros de tipo Voador na rota." },
    ],
    tips: [
      "Capture um Pidgey aqui: ele resolve vários encontros na Viridian Forest.",
      "Evite lutar contra todos os Pokémon selvagens; o tempo de batalha é melhor gasto em treino.",
    ],
  },
  {
    slug: "viridian-city",
    title: "Cidade Viridian",
    order: 3,
    intro:
      "Viridian City é a porta de entrada do centro de Kanto. O ginásio ainda está fechado, então seu foco aqui é recuperar energia, organizar o time e entender o mapa da região.",
    objective:
      "Curar o time, explorar a cidade e descobrir como avançar pelo caminho bloqueado ao norte.",
    route:
      "Entre pela Rota 1, cure no centro de Pokémon, visite o ginásio para confirmar que está fechado e procure o caminho ao norte, bloqueado por um senhor idoso e seu cachorro.",
    pokemon: [
      { name: "Oddish", note: "Aparece na Rota 2 e ajuda contra o ginásio de pedra." },
      { name: "Bellsprout", note: "Alternativa ofensiva com ataques de planta desde cedo." },
    ],
    items: [
      { name: "Mapa da região", note: "Entregue pelo assistente no centro de Pokémon." },
      { name: "Potion", note: "Encontrado nas casas pela cidade." },
    ],
    trainers: [
      { name: "Treinador de cachorro", note: "Bloqueia o caminho norte enquanto você não tiver o cão vencido." },
    ],
    tips: [
      "O ginásio de Viridian só abre depois da história avançar; volte mais tarde.",
      "Compre Poké Bolas extras aqui, a loja é mais barata que as da rota.",
    ],
    mapNote:
      "Destinos importantes: centro de Pokémon, loja, ginásio (fechado) e saída para a Rota 2.",
  },
  {
    slug: "route-2",
    title: "Rota 2",
    order: 4,
    intro:
      "A Rota 2 liga Viridian City à Viridian Forest. É um trecho curto, mas cheio de grama alta e de um portão que só abre depois que você resolve o mistério do senhor e do cão.",
    objective:
      "Atravessar a rota até a entrada da Floresta Viridian e reunir experience pelo caminho.",
    route:
      "Siga ao norte, entre na casa ao lado do portão, resolva a situação com o cão e continue até a entrada da floresta.",
    pokemon: [
      { name: "Caterpie", note: "Evolui rápido e é uma fonte barata de níveis." },
      { name: "Weedle", note: "Aguilhão de veneno dá trabalho se você não levar antídoto." },
    ],
    items: [{ name: "Antídoto", note: "Vale carregar dois antes de entrar na floresta." }],
    trainers: [
      { name: "Youngster da rota", note: "Times simples, bons para farm de experiência." },
    ],
    tips: [
      "Fale com o senhor da casa: ele resolve o bloqueio do caminho.",
      "Você pode pular a floresta pelo caminho lateral se já tiver o Flash, mas a versão principal passa por dentro.",
    ],
  },
  {
    slug: "viridian-forest",
    title: "Floresta Viridian",
    order: 5,
    intro:
      "A Floresta Viridian é um labirinto de árvores com vários treinadores de insetos escondidos. O ambiente é escuro, os encontros são frequentes e é aqui que muita gente perde o primeiro time inteiro.",
    objective:
      "Cruzar a floresta até a saída para a Cidade Pewter acumulando níveis e capturas.",
    route:
      "Entre pela Rota 2, siga sempre pela margem esquerda até encontrar a clareira central, derrote os treinadores no caminho e saia pela porta norte.",
    pokemon: [
      { name: "Pikachu", note: "Aparece em encontros raros; leve bolas extras para a captura." },
      { name: "Metapod", note: "Endurecer deixa as batalhas longas; traga um ataque de fogo ou voador." },
    ],
    items: [
      { name: "Antídoto", note: "Essencial contra Weedle e Kakuna." },
      { name: "Potion", note: "Encontrado em alguns cantos da floresta." },
    ],
    trainers: [
      { name: "Bug Catchers", note: "Vários treinadores em sequência; cure entre as lutas." },
      { name: "Líder da floresta", note: "Time com metapods endurecidos; ataques especiais resolvem." },
    ],
    tips: [
      "Salve em um ponto seguro entre as batalhas: a floresta é longa.",
      "Capture um Pikachu se aparecer: ele é útil contra o segundo ginásio.",
      "Nível recomendado ao sair: 10 ou 11.",
    ],
    mapNote:
      "A saída norte leva direto à Cidade Pewter. Há um caminho lateral que liga a Rota 2 ao norte da floresta.",
  },
  {
    slug: "pewter-city",
    title: "Cidade Pewter",
    order: 6,
    intro:
      "Pewter City é uma cidade de pedra com um ginásio de tipo Pedro no centro. Antes de desafiar o líder, vale explorar o museu e aprender sobre os fósseis da região.",
    objective:
      "Preparar o time para o duelo com Brock e obter qualquer vantagem extra disponível na cidade.",
    route:
      "Entre pela floresta, cure no centro de Pokémon, visite o museu pela esquerda e só depois entre no ginásio.",
    pokemon: [
      { name: "Mankey", note: "Encontrado na Rota 3; luta corpo a corpo resolve Brock." },
      { name: "Bulbasaur", note: "Growth mais Razor Leaf derruba os pedras depressa." },
    ],
    items: [
      { name: "Old Amber", note: "Disponível no museu após vencer Brock." },
      { name: "Escape Rope", note: "Útil para sair de cavernas sem voltar pelo caminho." },
    ],
    trainers: [
      { name: "Museu (visitante)", note: "Diálogos explicam a história dos fósseis de Kanto." },
    ],
    tips: [
      "Suba para nível 13 com seu inicial antes do ginásio.",
      "Water Gun ou Vine Whip torna a luta trivial, mesmo sem vantagem de nível.",
    ],
  },
  {
    slug: "pewter-gym",
    title: "Ginásio de Pewter",
    order: 7,
    intro:
      "O primeiro ginásio da jornada é conduzido por Brock, especialista em Pokémon Pedro. A arena tem esculturas no centro que forçam você a andar em volta antes de alcançar o líder.",
    objective:
      "Derrotar Brock e conquistar a Boulder Badge, a primeira insígnia da liga.",
    route:
      "Entre no ginásio, derrote o único treinador da entrada, contorne as esculturas pelo lado direito e fale com Brock para iniciar o duelo.",
    pokemon: [
      { name: "Geodude", note: "Primeiro Pokémon de Brock; rápido, mas frágil contra plantas e água." },
      { name: "Onix", note: "Grande defesa; priorize ataques especiais ou golpes de água." },
    ],
    items: [{ name: "Boulder Badge", note: "Confere acesso a Flash fora de combate e aumenta o poder." }],
    trainers: [
      { name: "Brock", note: "Geodude e Onix; nível recomendado 12 a 14." },
    ],
    tips: [
      "Golpes de planta e água funcionam muito melhor que golpes físicos comuns.",
      "Se o seu inicial for Charmander, leve um Squirtle capturado na floresta.",
      "Após vencer, você desbloqueia a Rota 3 e a loja vende itens melhores.",
    ],
    mapNote: "Saída do ginásio dá acesso direto ao leste, para a Rota 3.",
  },
  {
    slug: "route-3",
    title: "Rota 3",
    order: 8,
    intro:
      "A Rota 3 é um vale aberto com vários treinadores espalhados e uma estrutura de caminhos que sobe e desce em ziguezague. É um trecho bom para consolidar níveis antes da caverna.",
    objective:
      "Vencer os treinadores da rota e chegar ao acampamento antes da Montanha Lua.",
    route:
      "Saia de Pewter pelo leste, desça o degrau, siga pela faixa central e suba até o acampamento no fim da rota.",
    pokemon: [
      { name: "Spearow", note: "Comum na rota e evolui em Fearow cedo." },
      { name: "Jigglypuff", note: "Sono é uma ferramenta de captura excelente." },
    ],
    items: [
      { name: "Potion", note: "Escondido no canto inferior da rota." },
      { name: "Poké Bola", note: "Recarga rápida no acampamento." },
    ],
    trainers: [
      { name: "Lass e Youngsters", note: "Cadeias de batalhas curtas; mantenha o time curado." },
    ],
    tips: [
      "O acampamento no fim da rota cura de graça se você falar com a enfermeira ambulante.",
      "Encontros da rota dão muito experiência: use o repouso antes de seguir.",
    ],
  },
  {
    slug: "mt-moon",
    title: "Montanha Lua",
    order: 9,
    intro:
      "A Montanha Lua é uma caverna cheia de pedras brilhantes, zubats e equipes de ladrões. Aqui você encontra fósseis e o primeiro confronto direto com a Equipe Rocket.",
    objective:
      "Cruzar a caverna até a saída leste, recuperando um fóssil e derrotando os ladrões.",
    route:
      "Entre pela Rota 3, desça o primeiro andar, siga pelo corredor central até o elevador de pedras e continue pelo andar inferior até a saída para a Rota 4.",
    pokemon: [
      { name: "Zubat", note: "Comum em todas as camadas; brilho noturno é útil depois." },
      { name: "Paras", note: "Aparece nas profundezas e evolui em Parasect." },
      { name: "Clefairy", note: "Encontro raro perto do centro; vale uma Poké Bola extra." },
    ],
    items: [
      { name: "Fóssil (Dome ou Helix)", note: "Escolha um no centro da caverna; o outro fica perdido." },
      { name: "Moon Stone", note: "Item raro escondido em um dos corredores laterais." },
      { name: "Escape Rope", note: "Vários pela caverna para sair rapidamente." },
    ],
    trainers: [
      { name: "Cientistas e ladrões", note: "Times curtos, mas com muitos encontros seguidos." },
      { name: "Líder da Equipe Rocket", note: "Rivaliza com você pelo fóssil no último andar." },
    ],
    tips: [
      "Leve repelentes: encontros de zubat atrasam muito o avanço.",
      "O fóssil escolhido define qual Pokémon você reanimará mais tarde no laboratório.",
      "Salve antes do confronto com a Equipe Rocket; a luta é mais longa que as anteriores.",
    ],
    mapNote:
      "A saída leste cai na Rota 4, que leva direto à Cidade Cerulean.",
  },
  {
    slug: "cerulean-city",
    title: "Cidade Cerulean",
    order: 10,
    intro:
      "Cerulean é uma cidade azul banhada por um lago, com o segundo ginásio da região. A cidade também guarda a entrada para a Rota 24 e o início da trama da Equipe Rocket nos fundos das casas.",
    objective:
      "Explorar a cidade, encarar Misty no ginásio e preparar o time para a próxima região.",
    route:
      "Saia da Montanha Lua pela Rota 4, cure no centro, suba até o ginásio ao norte e, depois da vitória, siga para a Rota 24.",
    pokemon: [
      { name: "Abra", note: "Aparece na Rota 24 e teletransporta você pelo mapa depois." },
      { name: "Psyduck", note: "Encontrado perto do lago; bom contra o ginásio de água." },
    ],
    items: [
      { name: "S.S. Ticket", note: "Entregue após a batalha na cidade, abre o navio em Vermilion." },
      { name: "Bike Voucher", note: "Conseguido na casa da esquerda para trocar por uma bicicleta." },
    ],
    trainers: [
      { name: "Misty", note: "Staryu e Starmie; nível recomendado 18 a 21." },
    ],
    tips: [
      "Ataques elétricos ou de planta resolvem o segundo ginásio com facilidade.",
      "A Rota 24 ao norte tem treinadores que dão muito experiência antes de seguir para a Rota 25.",
      "Fale com os moradores da cidade para iniciar a missão do bicicleta.",
    ],
    mapNote:
      "Pontos importantes: ginásio, centro de Pokémon, loja, saída para a Rota 24 e entrada da Rota 5 ao sul.",
  },
  {
    slug: "route-24",
    title: "Rota 24",
    order: 11,
    intro:
      "A Rota 24 liga Cerulean City ao caminho de acesso a Vermilion e marca a transição do início de Kanto para a fase de grandes cidades da rota costeira.",
    objective:
      "Treinar antes do terceiro ginásio e recuperar o S.S. Ticket para atravessar até Vermilion.",
    route:
      "Siga ao norte pela Rota 24, derrote os treinadores do caminho e avance até a ponte para a rota mais longa e o acesso a Vermilion.",
    pokemon: [
      { name: "Abra", note: "Tem encontros rápidos e ajuda a compor um time versátil para o próximo desafio." },
      { name: "Psyduck", note: "Bom para enfrentar treinadores de água e para ganhar níveis antes da próxima cidade." },
    ],
    items: [
      { name: "Poké Bola", note: "Utilize para capturar Pokémon de apoio antes do próximo ginásio." },
      { name: "Potion", note: "É comum dentro da rota, valendo a pena manter seu time curado." },
    ],
    trainers: [
      { name: "Treinadores da rota", note: "Batalhas rápidas para consolidar níveis antes de Vermilion." },
    ],
    tips: [
      "Leve um tipo elétrico ou planta para quebrar a formação de água da rota.",
      "A Rota 24 é um bom ponto para igualar o nível do time antes do ginásio de Vermilion.",
    ],
  },
  {
    slug: "route-25",
    title: "Rota 25",
    order: 12,
    intro:
      "A Rota 25 encurta a distância até Vermilion City e abre a possibilidade de rotas mais longas e combates de nível mais alto antes da próxima aula de ginásio.",
    objective:
      "Chegar à cidade costeira com o time preparado para o combate contra Lt. Surge.",
    route:
      "Passe pela rota de campo e siga em direção ao porto, aproveitando a área antes do cruzamento para Vermilion.",
    pokemon: [
      { name: "Pidgey", note: "Típo voador útil na rota e ajuda na transição entre áreas." },
      { name: "Rattata", note: "Encontro simples e rápido, perfeito para farm leve." },
    ],
    items: [{ name: "Cure Item", note: "Aproveite o descanso em Vermilion para reabastecer antes do ginásio." }],
    trainers: [
      { name: "Treinadores de rota", note: "Combates curtos que ajudam a nivelar o time antes do líder." },
    ],
    tips: [
      "Não exagere em batalhas sem objetivo: a rota ganha sentido quando você chega ao ginásio.",
      "A porta de Vermilion é um bom ponto de descanso para todos os membros do time.",
    ],
  },
  {
    slug: "vermillion-city",
    title: "Cidade Vermilion",
    order: 13,
    intro:
      "Vermilion City é a cidade portuária de Kanto, com a torre Pokémon no litoral e o terceiro ginásio focado em eletricidade. O porto também abre a rota marítima para o restante da região.",
    objective:
      "Explorar o porto, resolver a Torre Pokémon e preparar o time para a batalha contra Lt. Surge.",
    route:
      "Entregue o S.S. Ticket, visite o porto e siga pela cidade até a entrada do ginásio de eletricidade.",
    pokemon: [
      { name: "Voltorb", note: "Cuidado com eletricidade em áreas urbanas e torres; é uma ameaça real no início da cidade." },
      { name: "Magnemite", note: "Apresenta uma boa cobertura para o próximo líder." },
    ],
    items: [
      { name: "Bicicleta", note: "Use o voucher recebido em Cerulean para se movimentar mais rápido pela região." },
      { name: "HM05 (Flash)", note: "Útil em cavernas como a montanha e em rotas mais escuras." },
    ],
    trainers: [
      { name: "Lt. Surge", note: "Eletricidade e agressividade em alta; o time precisa de resistência e respostas rápidas." },
    ],
    tips: [
      "O melhor caminho é ter um Pokémon de terra ou de planta no time antes do ginásio.",
      "A torre oferece uma boa chance de farm antes do próximo confronto importante.",
    ],
    mapNote:
      "A cidade tem o porto, a Torre Pokémon, a loja de itens e o ginásio de eletricidade ao centro.",
  },
  {
    slug: "vermillion-gym",
    title: "Ginásio de Vermilion",
    order: 14,
    intro:
      "Lt. Surge é o terceiro líder e usa Pokémon elétricos com agressividade, pressão e velocidade. Ele não costuma deixar espaço para um time frágil ou sem resposta defensiva.",
    objective:
      "Vencer Lt. Surge e conquistar a Thunder Badge, abrindo caminho para a parte sul de Kanto.",
    route:
      "Entre no ginásio, derrote os treinadores e desafie Lt. Surge no centro da arena de eletricidade.",
    pokemon: [
      { name: "Pikachu", note: "O principal parceiro de Lt. Surge se sente confortável com eletricidade e velocidade." },
      { name: "Raichu", note: "Variação poderosa e pronta a pressionar combates mais lentos." },
    ],
    items: [{ name: "Thunder Badge", note: "Permite uso de Fly e garante acesso ao próximo bloco do mapa." }],
    trainers: [
      { name: "Lt. Surge", note: "Pikachu e Raichu; nível recomendado 22 a 24." },
    ],
    tips: [
      "Termos de terra são a resposta mais segura contra eletricidade.",
      "Um ataque de planta ou um Pokémon robusto minimiza o risco de perder o confronto por danos contínuos.",
      "Depois da vitória, a região de Kanto começa a abrir para rotas mais longas e cidades maiores.",
    ],
    mapNote: "A saída leva ao restante da zona leste, com acesso a rotas e cidades mais densas de Kanto.",
  },
  {
    slug: "route-6",
    title: "Rota 6",
    order: 15,
    intro:
      "A Rota 6 é uma mistura de campo, trilha de entrada e momentos de farm valiosos para o próximo ginásio. O caminho é curto, mas se torna importante ao entrar em Celadon.",
    objective:
      "Subir o nível do time antes da capital da região e seguir rumo ao ginásio de planta.",
    route:
      "Siga em direção à cidade de Celadon, aproveitando os treinadores para ajustar o nível antes do confronto com Erika.",
    pokemon: [
      { name: "Nidoran♂", note: "Bom para melhorar o nível de um time em evolução e reforçar as áreas abertas de Kanto." },
      { name: "Oddish", note: "Aparece em áreas de planta e ajuda nas conquistas do próximo ginásio." },
    ],
    items: [{ name: "Potion", note: "Reabasteça antes de entrar na rota mais longa do centro de Kanto." }],
    trainers: [
      { name: "Treinadores da rota", note: "Farm leve para manter a equipe em um nível confortável." },
    ],
    tips: [
      "Mantenha a equipe curada antes das batalhas de longo alcance.",
      "A rota é um bom ponto de preparação antes de entrar em Celadon City.",
    ],
  },
  {
    slug: "celadon-city",
    title: "Cidade Celadon",
    order: 16,
    intro:
      "Celadon City é a cidade grande e comercial de Kanto, com um ginásio de planta e uma zona urbana cheia de lojas, hotéis e complicações de gameplay. É o coração de Kanto em termos de logística.",
    objective:
      "Preparar a equipe para a batalha contra Erika e explorar a cidade antes da próxima parte da jornada.",
    route:
      "Cure no centro, visite a loja de itens e siga para o ginásio ao centro da cidade.",
    pokemon: [
      { name: "Oddish", note: "Comum no cenário urbano e útil para o próximo ginásio de planta." },
      { name: "Gloom", note: "Seu tipo de planta/veneno exige cuidado na preparação." },
    ],
    items: [
      { name: "Celadon Mart", note: "Maior loja de Kanto; sempre vale dar uma olhada antes da rota final." },
      { name: "Revive", note: "Itens de resgate ajudam quando a evolução se torna mais agressiva." },
    ],
    trainers: [
      { name: "Erika", note: "Vinewhip e Espeon em time de planta; nível recomendado 27 a 29." },
    ],
    tips: [
      "Fogo, gelo e voador resolvem boa parte dos problemas contra plantas.",
      "Celadon é um bom momento para revisar seu inventário e ajustar o time antes do caminho para Fuchsia.",
    ],
    mapNote:
      "O centro, a loja e o ginásio da cidade formam o maior ponto de logística antes das rotas mais difíceis.",
  },
  {
    slug: "celadon-gym",
    title: "Ginásio de Celadon",
    order: 17,
    intro:
      "Erika, a líder do ginásio de planta, usa Pokémon de alta defesa e muito controle de dano. Seu time exige um planejamento de alto nível para não prolongar a batalha.",
    objective:
      "Vencer Erika e conquistar a Rainbow Badge, abrindo o caminho para o restante de Kanto.",
    route:
      "Entre no ginásio, derrote os treinadores da entrada e desafie Erika no centro do salão de planta.",
    pokemon: [
      { name: "Victreebel", note: "Seções de planta com ataques rápidos e muito dano em sequência." },
      { name: "Tangela", note: "A organização do ginásio reforça o tema de planta e controle de campo." },
    ],
    items: [{ name: "Rainbow Badge", note: "A participação ativa da insígnia qualifica o time para o próximo bloco do mapa." }],
    trainers: [
      { name: "Erika", note: "Vileplume e Victreebel; nível recomendado 27 a 29." },
    ],
    tips: [
      "Pokémon de fogo fortemente melhoram o combo na luta contra planta.",
      "Se o seu time estiver lento, o melhor caminho é capturar apoio com cobertura antes de abrir a rota seguinte.",
    ],
    mapNote: "Após a vitória, a zona norte e o caminho para Fuchsia ficam muito mais acessíveis.",
  },
  {
    slug: "route-8",
    title: "Rota 8",
    order: 18,
    intro:
      "A Rota 8 desvenda a parte mais longa da jornada rumo a Fuchsia, com muito terreno e treinadores de nível mais alto do que os anteriores da região.",
    objective:
      "Preparar a equipe para a parte sul de Kanto, especialmente o confronto com Koga e a zona de Fuchsia.",
    route:
      "Siga pela rota em direção ao sul, atravessando o caminho de maior risco da região e chegando a Fuchsia City.",
    pokemon: [
      { name: "Pidgeotto", note: "Aparece com frequência e ajuda a manter o time flexível em batalhas longas." },
      { name: "Nidorino", note: "Boa opção ofensiva e útil na fase antes de Fuchsia." },
    ],
    items: [{ name: "Potion", note: "Ao longo da rota, vale manter o estoque em alta. " }],
    trainers: [
      { name: "Treinadores da rota", note: "A partir daqui, é preciso ter mais cuidado com a sequência de batalhas." },
    ],
    tips: [
      "Aproveite os treinadores para evoluir antes de enfrentar o próximo líder.",
      "Respeite o nível: uma visita sem preparo costuma ser dolorosa nessa parte da jornada.",
    ],
  },
  {
    slug: "fuchsia-city",
    title: "Cidade Fuchsia",
    order: 19,
    intro:
      "Fuchsia City é uma cidade noturna de Kanto, com parques e uma atmosfera mais forte e misteriosa. Aqui o foco muda para a parte mais desafiadora da região e para o ginásio de veneno.",
    objective:
      "Acessar o ginásio e preparar o time para a batalha contra Koga, o líder do veneno.",
    route:
      "Entre na cidade pelo sul, visite as áreas de apoio e siga ao centro para o ginásio de Fuchsia.",
    pokemon: [
      { name: "Golbat", note: "Voador/veneno que exige cuidado e muito tempo no campo antes do confronto." },
      { name: "Grimer", note: "Ajuda a formar a base de um time resistente contra variações de tipo social." },
    ],
    items: [
      { name: "Safari Zone Pass", note: "Complementa a exploração da zona e aumenta o valor de Fuchsia." },
      { name: "Potion", note: "Sempre vale reabastecer aqui antes do próximo ginásio." },
    ],
    trainers: [
      { name: "Koga", note: "Ataca com antony e veneno em um padrão de pressão constante; o time deve resistir ao dano contínuo." },
    ],
    tips: [
      "Ter uma resposta rápida contra veneno aumenta muito a margem de segurança.",
      "Fique atento à duração das batalhas: o tipo veneno exige atenção à sobrevivência.",
    ],
    mapNote:
      "Fuchsia City concentra várias áreas de apoio, além do ginásio e de um ponto de descanso para a fase final de Kanto.",
  },
  {
    slug: "fuchsia-gym",
    title: "Ginásio de Fuchsia",
    order: 20,
    intro:
      "Koga é o líder de veneno e um dos últimos testes de resistência do atalho principal de Kanto. O problema aqui é a pressão contínua e a dificuldade em manter o time em condições estáveis.",
    objective:
      "Derrotar Koga e conquistar a Soul Badge, saindo da zona sul e avançando para Saffron.",
    route:
      "Entre no ginásio, derrote a pressão inicial e enfrente Koga no centro da arena silenciada pela toxicidade.",
    pokemon: [
      { name: "Muk", note: "Veneno e resistência alta; exige atenção ao tipo e ao dano acumulado." },
      { name: "Weezing", note: "Um segundo nível de veneno e pressão, exigindo tempo de combate bem administrado." },
    ],
    items: [{ name: "Soul Badge", note: "Insígnia essencial para a final do mapa principal de Kanto." }],
    trainers: [
      { name: "Koga", note: "Muk e Weezing; nível recomendado 33 a 36." },
    ],
    tips: [
      "Ataques psíquicos, de solo e de gelo costumam quebrar a pressão dos tipos de veneno.",
      "Esta é uma etapa para reforçar a resistência do time e carregar curas.",
    ],
    mapNote: "A saída leva ao sul e ao caminho para a parte central de Kanto, incluindo Saffron.",
  },
  {
    slug: "saffron-city",
    title: "Cidade Saffron",
    order: 21,
    intro:
      "Saffron City é a cidade de intelecto, tecnologia e um dos maiores desafios da região, com o ginásio de psíquico. Aqui a preparação do time é mais importante que a força bruta.",
    objective:
      "Preparar o time para Sabrina e concluir a parte central da jornada antes de seguir rumo ao oeste e à parte final de Kanto.",
    route:
      "Siga pelo caminho principal da região, passe por Saffron e chegue ao ginásio de psíquico para o próximo confronto.",
    pokemon: [
      { name: "Abra", note: "A partir daqui, o tipo psíquico se torna mais dominante e precisa de cuidado.",
      },
      { name: "Kadabra", note: "Boa referência para a preparação contra Sabrina." },
    ],
    items: [
      { name: "Saffron Cubes", note: "Itens de incubação e apoio ao desenvolvimento do time antes do restante da região." },
      { name: "Potion", note: "Sempre útil antes do próximo ginásio." },
    ],
    trainers: [
      { name: "Sabrina", note: "Psíquico e golpes certeiros; a resposta precisa ser bem pensada." },
    ],
    tips: [
      "Tipos de inseto, fantasma e escuro são especialmente úteis contra psíquicos.",
      "A cidade tem pontos de descanso e itens importantes para o final da região.",
    ],
    mapNote:
      "A área central de Kanto é a base para o último conjunto de ginásios e para a rota final da Liga.",
  },
  {
    slug: "saffron-gym",
    title: "Ginásio de Saffron",
    order: 22,
    intro:
      "Sabrina utiliza um time psíquico com controle, velocidade e dano bem distribuído. O foco dessa batalha é a inteligência do time e o tempo em que o combate se prolonga.",
    objective:
      "Vencer Sabrina e conquistar a Marsh Badge, abrindo o caminho para Cinnabar e a parte final de Kanto.",
    route:
      "Entre no ginásio, derrote os treinadores e termine o confronto contra Sabrina no centro do salão psíquico.",
    pokemon: [
      { name: "Alakazam", note: "A ameaça central do time de Sabrina; seu dano e velocidade são muito altos." },
      { name: "Jynx", note: "Um Pokémon de psíquico com alto valor de dano em sequência." },
    ],
    items: [{ name: "Marsh Badge", note: "Uma insígnia importante para avançar para a fase final da região." }],
    trainers: [
      { name: "Sabrina", note: "Alakazam e Jynx; nível recomendado 37 a 40." },
    ],
    tips: [
      "Fantasma e inseto costumam dobrar a vantagem do time em batalhas contra psíquicos.",
      "Atenção ao tempo: a prática de cura e o foco de dano fazem toda a diferença nessa luta.",
    ],
    mapNote: "Com a insígnia em mãos, o caminho para Cinnabar e a rota final da Liga fica muito mais claro.",
  },
  {
    slug: "cinnabar-island",
    title: "Ilha Cinnabar",
    order: 23,
    intro:
      "Cinnabar Island representa o último grande salto de Kanto em direção à liga. A ilha possui uma paisagem de vulcão, portal de pesquisa e o ginásio do fogo.",
    objective:
      "Explorar a ilha, preparar o time para Blaine e garantir a última insígnia antes da Elite Four.",
    route:
      "Passe pela rota final, atravesse a ilha e chegue ao ginásio de Blaine para o confronto que marca o fim da rota principal.",
    pokemon: [
      { name: "Ponyta", note: "Bom aliado para a última parte da jornada, com velocidade e dano em sequência." },
      { name: "Magmar", note: "Apresenta um tipo de fogo muito forte, exigindo apoio de contra-ataques eficazes." },
    ],
    items: [
      { name: "Cinnabar Lab", note: "A pesquisa e o laboratório abrem o caminho para itens e apoio no final da jornada." },
      { name: "Potion", note: "Como sempre, vale manter o estoque porque o final de Kanto é agressivo." },
    ],
    trainers: [
      { name: "Blaine", note: "Em uma batalha final cheia de fogo e pressão, o time precisa estar em alta forma." },
    ],
    tips: [
      "Pokémon de planta, água e pedra ajudam contra o tipo fogo.",
      "Mantenha o time com bons níveis para a batalha contra os antigos líderes da região.",
    ],
    mapNote:
      "A ilha marca o último bloco da rota principal antes da travessia para a Elite Four e a Liga Pokémon.",
  },
  {
    slug: "cinnabar-gym",
    title: "Ginásio de Cinnabar",
    order: 24,
    intro:
      "Blaine, o líder de Cinnabar, usa fogo e maturidade em combate. A luta exige um time com boa resistência e um bom plano contra o dano contínuo de fogo.",
    objective:
      "Vencer Blaine e conquistar a Volcano Badge, deixando o time pronto para a Elite Four.",
    route:
      "Entre no ginásio, derrote os treinadores de fogo e enfrente Blaine no centro da arena.",
    pokemon: [
      { name: "Moltres", note: "Pokémon lendário que reforça a crueldade do encontro e o nível da arena." },
      { name: "Magmar", note: "O principal ataque do ginásio, com dano que por vezes derruba o time sem aviso." },
    ],
    items: [{ name: "Volcano Badge", note: "Última insígnia antes da elite e da liga final de Kanto." }],
    trainers: [
      { name: "Blaine", note: "Moltres e Magmar; nível recomendado 42 a 46." },
    ],
    tips: [
      "Ter um Pokémon de água ou pedra torna a sequência bem mais segura.",
      "Se você chegar no ponto certo, a elite se torna a fase mais decisiva de sua jornada.",
    ],
    mapNote: "A insígnia abre a rota para a elite e para a última sequência de Kanto.",
  },
  {
    slug: "viridian-gym",
    title: "Ginásio de Viridian",
    order: 25,
    intro:
      "O melhor e mais difícil ginásio de Kanto é o de Viridian City: Giovanni usa força, resistência e um time muito eficiente em combate direto. Depois das oito insígnias, é o pilar final antes da Liga.",
    objective:
      "Derrotar Giovanni e completar o conjunto de insígnias de Kanto antes da Elite Four.",
    route:
      "Volte para Viridian, entre no ginásio e desafie o líder no centro da arena para a última grande prova da jornada.",
    pokemon: [
      { name: "Rhydon", note: "Dano e resistência muito fortes, exigindo um time com boa atenção e controles." },
      { name: "Nidoqueen", note: "Espécie de chão muito útil para portar a pressão e a resistência do ginásio final." },
    ],
    items: [{ name: "Earth Badge", note: "Ultima insígnia antes da Elite Four e da Liga. " }],
    trainers: [
      { name: "Giovanni", note: "Rhydon, Nidoqueen e o último grande teste de Kanto; nível recomendado 45 a 50." },
    ],
    tips: [
      "A melhor resposta é um time bem equilibrado, não apenas forte em potência.",
      "Esta batalha costuma ser onde muitas equipas perdem o melhor aproveitamento do treinamento.",
    ],
    mapNote: "Depois dessa vitória, o caminho para a Elite Four e a Indigo Plateau fica oficialmente aberto.",
  },
  {
    slug: "elite-four",
    title: "Elite Four",
    order: 26,
    intro:
      "A Elite Four representa a última barreira antes da Liga Pokémon e seu time se torna cada vez mais sofisticado e agressivo. Aqui, o foco de Kanto se transforma em uma prova de preparo total.",
    objective:
      "Sobreviver a quatro líderes consecutivos e preparar o time para a grande final da Liga Pokémon.",
    route:
      "Entre no prédio da Elite Four, marque os confrontos em sequência e gerencie o estoque de curas e status para a fase final.",
    pokemon: [
      { name: "Lapras", note: "A forma clássica de pressão em batalhas de elite, com velocidade e dano muito fortes." },
      { name: "Gengar", note: "Uma ameaça de veneno e fantasma que deve ser respeitada em qualquer time.",
      },
      { name: "Snorlax", note: "Força bruta e resistência que fazem qualquer tipo de sequência difícil." },
    ],
    items: [
      { name: "Elite Four Pass", note: "Acesso ao último bloqueio da rota e a preparação do time para a liga final." },
      { name: "Full Restore", note: "Essencial em batalhas longas e consecutivas." },
    ],
    trainers: [
      { name: "Lorelei", note: "Líder de gelo com grande poder de controle e dano; nível recomendado 48 a 52." },
      { name: "Bruno", note: "Foco em lutador e força bruta; o time precisa aguentar o dano da sequência." },
      { name: "Agatha", note: "Fantasma e sombra, um grande teste para o time." },
      { name: "Lance", note: "A última encarnação da parte final, focada em força, velocidade e risco." },
    ],
    tips: [
      "A Elite Four não aceita erros: leve um time com opções que cubram cada tipo da sequência.",
      "O ponto mais importante é manter o estoque de cura em ordem e o time preparado para a última batalha.",
      "Mesmo o melhor time precisa de estratégia — a prova final exige concentração máxima.",
    ],
    mapNote: "O prédio da Elite Four leva ao topo da região e à última batalha da jornada principal.",
  },
  {
    slug: "indigo-plateau",
    title: "Indigo Plateau",
    order: 27,
    intro:
      "A última etapa da jornada é a Liga Pokémon em Indigo Plateau, onde tudo o que você treinou, preparou e aprimorou aparece em um único duelo final. Esta é a prova final de Kanto.",
    objective:
      "Vencer a Liga Pokémon e fechar a jornada com a maior conquista da região.",
    route:
      "Entre no estádio da Liga, cumpra o ritual final e enfrente o campeão de Kanto na batalha que encerra a criação do time.",
    pokemon: [
      { name: "Charizard", note: "Atacante ofensivo e poderoso, excelente na fase final da liga." },
      { name: "Pikachu", note: "A estrela da jornada e símbolo de todo o desenvolvimento do time." },
      { name: "Snorlax", note: "Força de resistência extrema e pressão final em qualquer momento da luta." },
    ],
    items: [
      { name: "Liga Medal", note: "A expressão máxima da jornada e de todo o percurso de Kanto." },
      { name: "Pokédex final", note: "O registro completo do mundo que você percorreu durante a aventura." },
    ],
    trainers: [
      { name: "Campeão de Kanto", note: "A última batalha da região: preparação, estratégia, coragem e tempo de jogo em um só momento." },
    ],
    tips: [
      "A vitória final vem do equilíbrio do time e não apenas da força bruta.",
      "Se o seu grupo tem opções para tipos diferentes, a Liga se torna muito mais previsível.",
      "Chegue neste ponto com a equipe curada, com foco e com a própria confiança que você ganhou durante toda a jornada.",
    ],
    mapNote:
      "Indigo Plateau é o clímax da jornada em Kanto: o fim da rota, do desafio e da grande conquista do treinador.",
  },
];

const emeraldChapters = [
  {
    slug: "littleroot-town",
    title: "Littleroot Town",
    order: 1,
    intro:
      "Sua família se muda para Hoenn e a cidade pequena recebe você de braços abertos. O laboratório do Professor Birch está a poucos passos da nova casa.",
    objective: "Conhecer a cidade e escolher seu Pokémon inicial.",
    route:
      "Entre na cidade pelo sul, visite sua casa, suba até o laboratório e escolha entre Treecko, Torchic e Mudkip.",
    pokemon: [
      { name: "Treecko", note: "Rápido e eficiente contra os dois primeiros ginásios." },
      { name: "Torchic", note: "Linha de evolução com ataque especial forte." },
      { name: "Mudkip", note: "Cobertura de tipo ampla e evolução terrestre no meio do caminho." },
    ],
    items: [
      { name: "Pokédex", note: "Entregue por Birch após a escolha." },
      { name: "Poké Bolas", note: "Primeiro lote para a rota lateral." },
    ],
    trainers: [{ name: "Birch (fuga inicial)", note: "Você ajuda o professor contra um Poochyena selvagem." }],
    tips: ["Escolha com calma: qualquer inicial leva você até a liga.", "Fale com sua mãe para ganhar um item de cura."],
    mapNote: "A cidade tem duas casas, um laboratório e saídas para as rotas 101 e 103.",
  },
  {
    slug: "route-101",
    title: "Rota 101",
    order: 2,
    intro:
      "A Rota 101 liga Littleroot a Oldale Town e serve como tutorial prático do sistema de batalhas.",
    objective: "Treinar o inicial e alcançar a primeira cidade de Hoenn.",
    route: "Siga ao norte pela grama, derrote os poucos treinadores e entre em Oldale Town.",
    pokemon: [
      { name: "Poochyena", note: "Comum e fácil de evoluir para cobrir tipos escuros." },
      { name: "Wurmple", note: "Base de uma linha de evolução longa e interessante." },
    ],
    items: [{ name: "Potion", note: "Encontrado na grama alta da rota." }],
    trainers: [{ name: "Trainer Kids", note: "Batalhas curtas para ajustar o nível do inicial." }],
    tips: ["Capture um Poochyena: ele ajuda na Rota 102.", "Salve em Oldale antes de seguir para oeste."],
  },
  {
    slug: "oldale-town",
    title: "Oldale Town",
    order: 3,
    intro:
      "Oldale Town é a primeira cidade com estrutura completa: centro de Pokémon, loja e conexões para as rotas 102 e 103.",
    objective: "Curar o time, comprar suprimentos e explorar a rota lateral ao norte.",
    route:
      "Cure no centro, compre Poké Bolas e potions na loja e suba para a Rota 103 antes de seguir pelo oeste.",
    pokemon: [
      { name: "Zigzagoon", note: "Encontra itens durante as batalhas e é excelente para rotas longas." },
      { name: "Taillow", note: "Aparece na rota norte e é um atacante voador confiável." },
    ],
    items: [
      { name: "Potion", note: "Encontrado na Rota 103." },
      { name: "Oran Berry", note: "Árvores da região dão frutas de cura gratuitas." },
    ],
    trainers: [{ name: "Rival (Rota 103)", note: "Primeiro duelo formal com o rival." }],
    tips: ["Plante frutas para ter cura infinita.", "Não compre tudo na primeira loja: preços sobem no meio do jogo."],
  },
  {
    slug: "route-102",
    title: "Rota 102",
    order: 4,
    intro:
      "A Rota 102 atravessa campos e riachos até Rustboro City, com vários treinadores e um primeiro contato com a Equipe Magma.",
    objective: "Atravessar a rota e chegar à cidade industrial de Rustboro.",
    route:
      "Siga pelo oeste, atravesse as pontes de água, derrote os treinadores e entre em Rustboro pelo leste.",
    pokemon: [
      { name: "Lotad", note: "Evolui em Lombre e cobre tipo água e planta." },
      { name: "Seedot", note: "Alternativa de planta com evolução para Ludicolo." },
    ],
    items: [
      { name: "Stone Button", note: "Item de história ligado à Equipe Magma." },
      { name: "Escape Rope", note: "Encontrado perto da ponte." },
    ],
    trainers: [{ name: "Camper e Picnicker", note: "Times curtos, bons para treino." }],
    tips: ["Leve um Pokémon de planta para os encontros de água da rota.", "Fale com os moradores para conseguir frutas."],
  },
  {
    slug: "rustboro-city",
    title: "Rustboro City",
    order: 5,
    intro:
      "Rustboro é a sede da Devon Corporation e recebe o primeiro ginásio de Hoenn, conduzido por Roxanne de tipo Pedro.",
    objective: "Investigar a Devon Corporation e conquistar a primeira insígnia.",
    route:
      "Entre na cidade, visite a Devon pelo norte, converse com o presidente e só depois entre no ginásio ao sul.",
    pokemon: [
      { name: "Geodude", note: "Capturável nas rotas próximas e ótimo contra Roxanne." },
      { name: "Makuhita", note: "Encontrado na Rota 107; luta corpo a corpo resolve o ginásio." },
    ],
    items: [{ name: "Devon Goods", note: "Entrega que desbloqueia a missão da Rota 116." }],
    trainers: [{ name: "Roxanne", note: "Geodude e Nosepass; nível recomendado 12 a 14." }],
    tips: ["Golpes de água ou planta funcionam bem contra Pedro.", "Resolva a missão da Devon antes de seguir para oeste."],
    mapNote: "A cidade tem ginásio, loja, centro e saída para a Rota 116 ao norte.",
  },
  {
    slug: "rusturf-tunnel",
    title: "Rusturf Tunnel",
    order: 6,
    intro:
      "O túnel liga Rustboro a Verdanturf e guarda uma cena clássica com a Equipe Magma bloqueando a passagem.",
    objective: "Recuperar o item roubado e abrir o caminho para oeste de Hoenn.",
    route:
      "Entre pela Rota 116, desça o túnel, derrote os vilões e saia pela porta oeste.",
    pokemon: [
      { name: "Whismur", note: "Som alto marca encontros; evolui em três estágios." },
      { name: "Poochyena", note: "Ainda comum nas entradas do túnel." },
    ],
    items: [
      { name: "Pokeblock Case", note: "Libera o sistema de concursos." },
      { name: "Super Potion", note: "Encontrado em um canto do túnel." },
    ],
    trainers: [{ name: "Equipe Magma", note: "Primeiro confronto com os vilões da versão." }],
    tips: ["Salve antes do confronto; os vilões têm times dobrados.", "O túnel é curto, não desperdice escape ropes."],
  },
  {
    slug: "dewford-town",
    title: "Dewford Town",
    order: 7,
    intro:
      "Dewford é uma vila de ilha com um porto escuro e o segundo ginásio de Hoenn, conduzido por Brawly de tipo Lutador.",
    objective: "Vencer Brawly e obter a segunda insígnia de Hoenn.",
    route:
      "Atravesse de barco a partir de Slateport, entre no ginásio da caverna e desafie o líder.",
    pokemon: [
      { name: "Makuhita", note: "Base ideal para o ginásio de luta." },
      { name: "Abra", note: "Capturável na ilha; teleporte economiza tempo." },
    ],
    items: [{ name: "HM01 (Cut)", note: "Recebido após a batalha, abre caminhos com árvores." }],
    trainers: [{ name: "Brawly", note: "Machop e Meditite; nível recomendado 15 a 17." }],
    tips: ["Pokémon voador ou psíquico domina o ginásio de luta.", "Leve bolas extras para a ilha: a loja é pequena."],
  },
  {
    slug: "route-110",
    title: "Rota 110 e Mauville City",
    order: 8,
    intro:
      "A Rota 110 é uma pista de bicicleta longa e cheia de treinadores, que termina em Mauville City, o centro de Hoenn.",
    objective: "Percorrer a rota, desafiar Wally e chegar à terceira insígnia.",
    route:
      "Siga a pista até Mauville, cure no centro e entre no ginásio de Watts (tipo Elétrico) conduzido por Wattson.",
    pokemon: [
      { name: "Electrike", note: "Encontrado na rota e útil para o próprio ginásio." },
      { name: "Marill", note: "Aparece perto da água e cobre tipo água cedo." },
    ],
    items: [
      { name: "Bike", note: "Trocada na loja de bicicletas de Mauville." },
      { name: "HM04 (Strength)", note: "Desbloqueada após o ginásio." },
    ],
    trainers: [
      { name: "Wattson", note: "Electrike e Magnemite; nível recomendado 18 a 20." },
      { name: "Wally", note: "Duelo de história na entrada da cidade." },
    ],
    tips: [
      "Pokémon terrestre anula a maioria dos ataques elétricos do ginásio.",
      "A pista de bicicleta exige a bike: pegue na loja antes de tentar atravessar rápido.",
    ],
  },
];

const diamondChapters = [
  {
    slug: "twinleaf-town",
    title: "Twinleaf Town",
    order: 1,
    intro:
      "Sua história começa em Twinleaf Town, ao lado do Lago Vermeer. Seu melhor amigo Barry já está ansioso para começar a jornada.",
    objective: "Escolher seu Pokémon inicial no laboratório de Rowan.",
    route:
      "Saia de casa, fale com Barry, suba até o lago e siga para Sandgem Town, onde o Professor Rowan espera.",
    pokemon: [
      { name: "Turtwig", note: "Inicial de planta, equilibrado para Sinnoh." },
      { name: "Chimchar", note: "Inicial de fogo, evolui em Infernape." },
      { name: "Piplup", note: "Inicial de água, boa defesa inicial." },
    ],
    items: [
      { name: "Pokédex", note: "Entregue por Rowan na demonstração da rota." },
      { name: "Poké Bolas", note: "Primeiro lote para capturas iniciais." },
    ],
    trainers: [{ name: "Barry", note: "Seu rival troca de time conforme a sua escolha inicial." }],
    tips: ["Escolha o inicial que cobre mais fraquezas do time rival.", "Fale com sua mãe para registrar pontos de teleporte."],
  },
  {
    slug: "route-201",
    title: "Rota 201",
    order: 2,
    intro:
      "A Rota 201 liga Twinleaf a Sandgem Town e funciona como a primeira trilha de treino da região.",
    objective: "Treinar o inicial e alcançar o laboratório do professor.",
    route: "Siga para leste pela grama alta, derrote os primeiros treinadores e entre em Sandgem Town.",
    pokemon: [
      { name: "Starly", note: "Comum, evolui rápido e é um atacante voador confiável." },
      { name: "Bidoof", note: "Absorve dano e aprende HM cedo." },
    ],
    items: [{ name: "Potion", note: "Escondido na grama alta." }],
    trainers: [{ name: "Trainer Kids", note: "Batalhas curtas para ajustar o nível." }],
    tips: ["Capture um Starly: ele acompanha você por boa parte do jogo.", "Salve em Sandgem antes de seguir para Jubilife."],
  },
  {
    slug: "jubilife-city",
    title: "Jubilife City",
    order: 3,
    intro:
      "Jubilife City é a metrópole inicial de Sinnoh, com escola, televisão e o trio de ginásios da região ao redor.",
    objective: "Concluir as missões iniciais e obter o Vs. Seeker.",
    route:
      "Entre pela Rota 202, visite a escola, resolva os enigmas dos garotos da cidade e siga para Oreburgh.",
    pokemon: [
      { name: "Budew", note: "Encontrado na rota leste; evolução por amizade." },
      { name: "Shinx", note: "Comum na rota oeste e evolui em Luxray." },
    ],
    items: [
      { name: "Vs. Seeker", note: "Recompensa das missões da cidade." },
      { name: "Town Map", note: "Entregue na escola." },
    ],
    trainers: [{ name: "Garotos da cidade", note: "Duelos com enigmas rápidos no início." }],
    tips: ["O Vs. Seeker permite reenfrentar treinadores: essencial para farm.", "Fale com todo mundo na escola: a recompensa vale a pena."],
  },
  {
    slug: "oreburgh-city",
    title: "Oreburgh City",
    order: 4,
    intro:
      "Oreburgh é a cidade mineradora de Sinnoh, com o primeiro ginásio conduzido por Roark de tipo Pedro.",
    objective: "Descer à mina, recuperar o relatório e derrotar Roark.",
    route:
      "Entre na cidade pelo sul, desça a mina para encontrar Roark, volte ao ginásio e desafie o líder.",
    pokemon: [
      { name: "Geodude", note: "Comum na mina e eficiente contra o próprio ginásio." },
      { name: "Machop", note: "Encontrado nas profundezas da mina." },
    ],
    items: [
      { name: "Old Charm", note: "Item da história entregue na mina." },
      { name: "HM06 (Rock Smash)", note: "Desbloqueado após a insígnia." },
    ],
    trainers: [{ name: "Roark", note: "Cranidos e Geodude; nível recomendado 12 a 14." }],
    tips: ["Golpes de água ou planta resolvem o ginásio de pedra.", "A mina é longa: leve escape ropes para voltar rápido."],
    mapNote: "A saída leste da cidade liga a Rota 207 para Floaroma Town.",
  },
  {
    slug: "eterna-city",
    title: "Eterna City",
    order: 5,
    intro:
      "Eterna City guarda o segundo ginásio, conduzido por Gardenia de tipo Planta, e o início da trama da Equipe Galáctica.",
    objective: "Vencer Gardenia e avançar para o coração de Sinnoh.",
    route:
      "Siga a Rota 205, atravesse o túnel e entre na cidade pelo sul para desafiar o ginásio.",
    pokemon: [
      { name: "Budew", note: "Evolui para Roselia e cobre dois tipos ao mesmo tempo." },
      { name: "Buizel", note: "Encontrado perto da água; evolui em Floatzel." },
    ],
    items: [{ name: "HM01 (Cut)", note: "Recebido após o ginásio." }],
    trainers: [{ name: "Gardenia", note: "Cherubi e Roserade; nível recomendado 19 a 21." }],
    tips: ["Pokémon voador ou de fogo domina o ginásio de planta.", "Resolva a casa da equipe Galáctica antes de seguir para Hearthome."],
  },
  {
    slug: "hearthome-city",
    title: "Hearthome City",
    order: 6,
    intro:
      "Hearthome é a cidade dos concursos e da sede da liga, com o terceiro ginásio conduzido por Fantina de tipo Fantasma.",
    objective: "Conquistar a terceira insígnia e explorar as atrações da cidade.",
    route:
      "Entre pela Rota 208, visite o Contesta Hall e suba ao ginásio depois de resolver a missão do olho treinador.",
    pokemon: [
      { name: "Drifloon", note: "Encontrado na rota sul; evolução por nível." },
      { name: "Misdreavus", note: "Aparece em encontros noturnos." },
    ],
    items: [
      { name: "Contest Kit", note: "Libera as competições de beleza." },
      { name: "TM", note: "Recompensa das missões da cidade." },
    ],
    trainers: [{ name: "Fantina", note: "Mismagius e Duskull; nível recomendado 21 a 24." }],
    tips: ["Ataques normais têm efeito reduzido contra fantasmas: leve um tipo sombrio ou psíquico.", "A casa de trocas da cidade é ótima para completar a Pokédex."],
  },
];

export const walkthroughs: Walkthrough[] = [
  {
    slug: "pokemon-fire-red",
    gameSlug: "pokemon-fire-red",
    title: "Detonado de Pokémon FireRed",
    summary:
      "Guia passo a passo de Kanto: da Pallet Town ao ginásio de Cerulean, com rotas, itens, treinadores e dicas para cada capítulo.",
    difficulty: "Médio",
    featured: true,
    updatedAt: "2026-09-20",
    chapters: fireRedChapters,
  },
  {
    slug: "pokemon-emerald",
    gameSlug: "pokemon-emerald",
    title: "Detonado de Pokémon Emerald",
    summary:
      "Os primeiros passos em Hoenn, do laboratório de Birch até o ginásio elétrico de Mauville, com todas as rotas principais.",
    difficulty: "Difícil",
    featured: true,
    updatedAt: "2026-09-14",
    chapters: emeraldChapters,
  },
  {
    slug: "pokemon-diamond",
    gameSlug: "pokemon-diamond",
    title: "Detonado de Pokémon Diamond",
    summary:
      "Guia inicial de Sinnoh cobrindo Twinleaf Town até Hearthome City, com foco em rotas, ginásios e itens obrigatórios.",
    difficulty: "Difícil",
    featured: true,
    updatedAt: "2026-09-08",
    chapters: diamondChapters,
  },
  {
    slug: "pokemon-red",
    gameSlug: "pokemon-red",
    title: "Detonado de Pokémon Red",
    summary:
      "Guia completo da versão original de Kanto, cobrindo rotas, cidades, líderes de ginásio, itens, treinadores e o caminho para a Liga Pokémon.",
    difficulty: "Médio",
    featured: true,
    updatedAt: "2026-09-20",
    chapters: fireRedChapters,
  },
  {
    slug: "pokemon-blue",
    gameSlug: "pokemon-blue",
    title: "Detonado de Pokémon Blue",
    summary:
      "Guia completo da versão original de Kanto em Pokémon Blue, cobrindo rotas, cidades, líderes de ginásio, Elite Four e a jornada até a Liga Pokémon.",
    difficulty: "Médio",
    featured: true,
    updatedAt: "2026-09-26",
    chapters: fireRedChapters,
  },
  {
    slug: "pokemon-yellow",
    gameSlug: "pokemon-yellow",
    title: "Detonado de Pokémon Yellow",
    summary: "A jornada cinematográfica de Kanto ao lado do Pikachu que acompanha o treinador.",
    difficulty: "Médio",
    featured: false,
    updatedAt: "2026-08-28",
    chapters: [],
    plannedChapters: [
      "Pallet Town",
      "Rota 1",
      "Cidade Viridian",
      "Floresta Viridian",
      "Cidade Cerulean",
      "Casa da Equipe Rocket",
    ],
  },
  {
    slug: "pokemon-gold",
    gameSlug: "pokemon-gold",
    title: "Detonado de Pokémon Gold",
    summary: "Guia de Johto cobrindo o caminho de New Bark Town até Blackthorn City.",
    difficulty: "Médio",
    featured: false,
    updatedAt: "2026-09-02",
    chapters: [],
    plannedChapters: [
      "New Bark Town",
      "Cherrygrove City",
      "Violet City",
      "Azalea Town",
      "Goldenrod City",
      "Ecruteak City",
    ],
  },
  {
    slug: "pokemon-silver",
    gameSlug: "pokemon-silver",
    title: "Detonado de Pokémon Silver",
    summary: "A versão prateada de Johto, com a trilha completa das oito insígnias.",
    difficulty: "Médio",
    featured: false,
    updatedAt: "2026-09-02",
    chapters: [],
    plannedChapters: [
      "New Bark Town",
      "Violet City",
      "Azalea Town",
      "Goldenrod City",
      "Olivine City",
      "Blackthorn City",
    ],
  },
  {
    slug: "pokemon-crystal",
    gameSlug: "pokemon-crystal",
    title: "Detonado de Pokémon Crystal",
    summary: "Johto em sua edição aprimorada, com Suicune como fio condutor da história.",
    difficulty: "Médio",
    featured: false,
    updatedAt: "2026-09-02",
    chapters: [],
    plannedChapters: [
      "New Bark Town",
      "Violet City",
      "Azalea Town",
      "Ecruteak City",
      "Olivine City",
      "Ruínas de Tin Tower",
    ],
  },
  {
    slug: "pokemon-ruby",
    gameSlug: "pokemon-ruby",
    title: "Detonado de Pokémon Ruby",
    summary: "A aventura de Hoenn contra a Equipe Magma, com rotas e ginásios principais.",
    difficulty: "Médio",
    featured: false,
    updatedAt: "2026-08-25",
    chapters: [],
    plannedChapters: [
      "Littleroot Town",
      "Oldale Town",
      "Rustboro City",
      "Dewford Town",
      "Slateport City",
      "Mauville City",
    ],
  },
  {
    slug: "pokemon-sapphire",
    gameSlug: "pokemon-sapphire",
    title: "Detonado de Pokémon Sapphire",
    summary: "O lado aquático de Hoenn e o confronto com a Equipe Áqua.",
    difficulty: "Médio",
    featured: false,
    updatedAt: "2026-08-25",
    chapters: [],
    plannedChapters: [
      "Littleroot Town",
      "Oldale Town",
      "Rustboro City",
      "Dewford Town",
      "Slateport City",
      "Petalburg City",
    ],
  },
  {
    slug: "pokemon-leaf-green",
    gameSlug: "pokemon-leaf-green",
    title: "Detonado de Pokémon LeafGreen",
    summary: "Kanto na versão verde, com tabela de captura própria e pós-jogo nas Ilhas Sete.",
    difficulty: "Médio",
    featured: false,
    updatedAt: "2026-09-18",
    chapters: [],
    plannedChapters: [
      "Pallet Town",
      "Rota 1",
      "Cidade Viridian",
      "Cidade Pewter",
      "Cidade Cerulean",
      "Ilhas Sete",
    ],
  },
  {
    slug: "pokemon-platinum",
    gameSlug: "pokemon-platinum",
    title: "Detonado de Pokémon Platinum",
    summary: "Sinnoh com o Distortion World e a narrativa ampliada da edição de platina.",
    difficulty: "Difícil",
    featured: false,
    updatedAt: "2026-08-20",
    chapters: [],
    plannedChapters: [
      "Twinleaf Town",
      "Jubilife City",
      "Oreburgh City",
      "Floaroma Town",
      "Hearthome City",
      "Distortion World",
    ],
  },
  {
    slug: "pokemon-heart-gold",
    gameSlug: "pokemon-heart-gold",
    title: "Detonado de Pokémon HeartGold",
    summary: "Johto com Pokémon acompanhante, Pokéwalker e a travessia de volta para Kanto.",
    difficulty: "Difícil",
    featured: false,
    updatedAt: "2026-08-18",
    chapters: [],
    plannedChapters: [
      "New Bark Town",
      "Violet City",
      "Azalea Town",
      "Goldenrod City",
      "Ecruteak City",
      "Indigo Plateau",
    ],
  },
  {
    slug: "pokemon-soul-silver",
    gameSlug: "pokemon-soul-silver",
    title: "Detonado de Pokémon SoulSilver",
    summary: "A versão prateada de Johto com os mesmos aprimoramentos de exploração.",
    difficulty: "Difícil",
    featured: false,
    updatedAt: "2026-08-18",
    chapters: [],
    plannedChapters: [
      "New Bark Town",
      "Cherrygrove City",
      "Violet City",
      "Goldenrod City",
      "Olivine City",
      "Blackthorn City",
    ],
  },
  {
    slug: "pokemon-black",
    gameSlug: "pokemon-black",
    title: "Detonado de Pokémon Black",
    summary: "Unova do início ao fim, com a trama da Torre Celestial e as rotas animadas.",
    difficulty: "Difícil",
    featured: false,
    updatedAt: "2026-08-12",
    chapters: [],
    plannedChapters: [
      "Nuvema Town",
      "Accumula Town",
      "Striaton City",
      "Nacrene City",
      "Castelia City",
      "Nimbasa City",
    ],
  },
  {
    slug: "pokemon-white",
    gameSlug: "pokemon-white",
    title: "Detonado de Pokémon White",
    summary: "A versão branca de Unova, com a Encruzilhada Branca e os encontros animados.",
    difficulty: "Difícil",
    featured: false,
    updatedAt: "2026-08-12",
    chapters: [],
    plannedChapters: [
      "Nuvema Town",
      "Accumula Town",
      "Striaton City",
      "Nacrene City",
      "Castelia City",
      "Driftveil City",
    ],
  },
];

export function getWalkthrough(slug: string): Walkthrough | undefined {
  return walkthroughs.find((item) => item.slug === slug);
}

export function getWalkthroughByGame(gameSlug: string): Walkthrough | undefined {
  return walkthroughs.find((item) => item.gameSlug === gameSlug);
}

export function getFeaturedWalkthroughs(): Walkthrough[] {
  return walkthroughs.filter((item) => item.featured);
}

export function getChapter(walkthrough: Walkthrough, chapterSlug: string) {
  return walkthrough.chapters.find((chapter) => chapter.slug === chapterSlug);
}

export function getAdjacentChapters(walkthrough: Walkthrough, chapterSlug: string) {
  const index = walkthrough.chapters.findIndex((chapter) => chapter.slug === chapterSlug);
  if (index < 0) return { prev: null, next: null, index: -1 };
  return {
    prev: index > 0 ? walkthrough.chapters[index - 1] : null,
    next: index < walkthrough.chapters.length - 1 ? walkthrough.chapters[index + 1] : null,
    index,
  };
}
