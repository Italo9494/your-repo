import type { GameMap, MapLocation } from "./types";

const kantoLocations: MapLocation[] = [
  { name: "Pallet Town", note: "Ponto de partida e laboratório do Professor Carvalho." },
  { name: "Viridian City", note: "Primeira cidade completa, com ginásio fechado no início." },
  { name: "Viridian Forest", note: "Labirinto de árvores com treinadores de insetos." },
  { name: "Pewter City", note: "Primeiro ginásio, de tipo Pedro, e o museu de fósseis." },
  { name: "Mt. Moon", note: "Caverna com fósseis e o primeiro confronto com a Equipe Rocket." },
  { name: "Cerulean City", note: "Cidade azul com lago, segundo ginásio e saída para a Rota 24." },
  { name: "Vermilion City", note: "Porto do S.S. Anne e ginásio elétrico." },
  { name: "Celadon City", note: "Maior loja da região e torre Pokémon." },
  { name: "Saffron City", note: "Sede da Silph Co. e do ginásio psíquico." },
  { name: "Fuchsia City", note: "Cidade de safari e ginásio voador." },
  { name: "Cinnabar Island", note: "Ilha vulcânica com mansão e laboratório de fósseis." },
  { name: "Indigo Plateau", note: "Sede da Liga Pokémon e da Elite Four." },
];

const johtoLocations: MapLocation[] = [
  { name: "New Bark Town", note: "Cidade inicial ao lado do Lago Acuity." },
  { name: "Cherrygrove City", note: "Primeira cidade de Johto com centro e loja." },
  { name: "Violet City", note: "Ginásio de tipo Voador e a Torre Pokémon." },
  { name: "Azalea Town", note: "Cidade das flores com a caverna Murcovy." },
  { name: "Goldenrod City", note: "Metrópole com centro comercial e rádio." },
  { name: "Ecruteak City", note: "Cidade histórica das torres e do balé de fogos." },
  { name: "Olivine City", note: "Porto com farol e ginásio elétrico." },
  { name: "Cianwood City", note: "Cidade costeira com o ginásio de luta." },
  { name: "Mahogany Town", note: "Cidade de montanha com base secreta." },
  { name: "Blackthorn City", note: "Última cidade de Johto, com dragões e a Dragon Den." },
];

const hoennLocations: MapLocation[] = [
  { name: "Littleroot Town", note: "Vila inicial com o laboratório do Professor Birch." },
  { name: "Oldale Town", note: "Primeira cidade com estrutura completa." },
  { name: "Rustboro City", note: "Sede da Devon Corporation e primeiro ginásio." },
  { name: "Dewford Town", note: "Ilha escura com ginásio de luta." },
  { name: "Slateport City", note: "Cidade portuária com mercado e concursos." },
  { name: "Mauville City", note: "Centro de Hoenn com ginásio elétrico." },
  { name: "Lavaridge Town", note: "Cidade termal com ginásio de fogo." },
  { name: "Fortree City", note: "Cidade nas árvores com ginásio voador." },
  { name: "Lilycove City", note: "Museu e centro de concursos da região." },
  { name: "Sootopolis City", note: "Cidade na cratera com ginásio de água." },
  { name: "Ever Grande City", note: "Porta de entrada da Liga Pokémon." },
];

const sinnohLocations: MapLocation[] = [
  { name: "Twinleaf Town", note: "Cidade inicial às margens do Lago Vermeer." },
  { name: "Sandgem Town", note: "Cidade do laboratório do Professor Rowan." },
  { name: "Jubilife City", note: "Metrópole com escola, TV e o trio de ginásios." },
  { name: "Oreburgh City", note: "Cidade mineradora com o primeiro ginásio." },
  { name: "Floaroma Town", note: "Cidade das flores e entrada para o vale." },
  { name: "Hearthome City", note: "Cidade dos concursos e da sede da liga." },
  { name: "Veilstone City", note: "Cidade comercial com ginásio de luta." },
  { name: "Pastoria City", note: "Cidade dos pântanos e ginásio de água." },
  { name: "Canalave City", note: "Cidade de biblioteca e antiga pirâmide." },
  { name: "Snowpoint City", note: "Cidade de neve com ginásio de gelo." },
  { name: "Victory Road", note: "Caminho final para a Liga Pokémon." },
];

const unovaLocations: MapLocation[] = [
  { name: "Nuvema Town", note: "Cidade inicial de Unova com o laboratório." },
  { name: "Accumula Town", note: "Cidade de parque e primeiras batalhas." },
  { name: "Striaton City", note: "Cidade dos três ginásios irmãos." },
  { name: "Nacrene City", note: "Cidade de museu com ginásio fantasma." },
  { name: "Castelia City", note: "Metrópole vertical com ginásio de bichos." },
  { name: "Nimbasa City", note: "Cidade dos entretenimentos e ginásio elétrico." },
  { name: "Driftveil City", note: "Cidade portuária com ginásio de gelo." },
  { name: "Mistralton City", note: "Cidade de aeroporto e ginásio voador." },
  { name: "Opelucid City", note: "Cidade futurista com ginásio de dragão." },
  { name: "Humilau City", note: "Cidade costeira com o último ginásio." },
];

export const maps: GameMap[] = [
  {
    slug: "mapa-kanto",
    name: "Mapa de Kanto",
    region: "Kanto",
    gameSlug: "pokemon-fire-red",
    summary:
      "A região clássica com doze pontos principais, do laboratório de Pallet ao Indigo Plateau.",
    locations: kantoLocations,
    colors: ["#2a75bb", "#1d5a94"],
  },
  {
    slug: "mapa-johto",
    name: "Mapa de Johto",
    region: "Johto",
    gameSlug: "pokemon-gold",
    summary:
      "Uma região compacta de oeste a leste, com cidades históricas e ligação direta com Kanto.",
    locations: johtoLocations,
    colors: ["#f2a83b", "#b26a10"],
  },
  {
    slug: "mapa-hoenn",
    name: "Mapa de Hoenn",
    region: "Hoenn",
    gameSlug: "pokemon-emerald",
    summary:
      "Região costeira com ilhas, vulcões e uma malha de rotas que contorna o continente.",
    locations: hoennLocations,
    colors: ["#2fa672", "#166044"],
  },
  {
    slug: "mapa-sinnoh",
    name: "Mapa de Sinnoh",
    region: "Sinnoh",
    gameSlug: "pokemon-diamond",
    summary:
      "Região de montanhas e cavernas, com a Grande Caverna e o Distortion World nos subterrâneos.",
    locations: sinnohLocations,
    colors: ["#4aa3d8", "#1e5f88"],
  },
  {
    slug: "mapa-unova",
    name: "Mapa de Unova",
    region: "Unova",
    gameSlug: "pokemon-black",
    summary:
      "A região mais urbana da série, com a Encruzilhada Branca dividindo as rotas ao norte e ao sul.",
    locations: unovaLocations,
    colors: ["#3b3f52", "#15171f"],
  },
];

export function getMap(slug: string): GameMap | undefined {
  return maps.find((map) => map.slug === slug);
}

