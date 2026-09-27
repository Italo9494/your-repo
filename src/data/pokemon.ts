import type { Pokemon, PokemonEvolutionMember } from "./types";
import pokemonCatalog from "./pokemon-catalog.json";

export const evolutionFamilies: Record<string, PokemonEvolutionMember[]> = {
  "bulbasaur-line": [
    { slug: "bulbasaur", name: "Bulbasaur", method: "Escolha inicial no laboratório" },
    { slug: "ivysaur", name: "Ivysaur", method: "Evolução por nível (nível 16)" },
    { slug: "venusaur", name: "Venusaur", method: "Evolução por nível (nível 32)" },
  ],
  "charmander-line": [
    { slug: "charmander", name: "Charmander", method: "Escolha inicial no laboratório" },
    { slug: "charmeleon", name: "Charmeleon", method: "Evolução por nível (nível 16)" },
    { slug: "charizard", name: "Charizard", method: "Evolução por nível (nível 36)" },
  ],
  "squirtle-line": [
    { slug: "squirtle", name: "Squirtle", method: "Escolha inicial no laboratório" },
    { slug: "wartortle", name: "Wartortle", method: "Evolução por nível (nível 16)" },
    { slug: "blastoise", name: "Blastoise", method: "Evolução por nível (nível 36)" },
  ],
  pikachu: [
    { slug: "pichu", name: "Pichu", method: "Encontro na floresta e nas rotas" },
    { slug: "pikachu", name: "Pikachu", method: "Evolução por nível (nível 10)" },
    { slug: "raichu", name: "Raichu", method: "Uso da Pedra do Trovão" },
  ],
  eevee: [
    { slug: "eevee", name: "Eevee", method: "Presente do professor ou captura rara" },
    { slug: "vaporeon", name: "Vaporeon", method: "Uso da Pedra da Água" },
    { slug: "jolteon", name: "Jolteon", method: "Uso da Pedra do Trovão" },
    { slug: "flareon", name: "Flareon", method: "Uso da Pedra de Fogo" },
    { slug: "espeon", name: "Espeon", method: "Evolução por amizade durante o dia" },
    { slug: "umbreon", name: "Umbreon", method: "Evolução por amizade durante a noite" },
  ],
  gengar: [
    { slug: "gastly", name: "Gastly", method: "Encontro em torres e cavernas" },
    { slug: "haunter", name: "Haunter", method: "Evolução por nível (nível 25)" },
    { slug: "gengar", name: "Gengar", method: "Troca entre jogadores" },
  ],
  gyarados: [
    { slug: "magikarp", name: "Magikarp", method: "Pesca ou encontro com vara fraca" },
    { slug: "gyarados", name: "Gyarados", method: "Evolução por nível (nível 20)" },
  ],
  dragonite: [
    { slug: "dratini", name: "Dratini", method: "Pesca em águas profundas" },
    { slug: "dragonair", name: "Dragonair", method: "Evolução por nível (nível 30)" },
    { slug: "dragonite", name: "Dragonite", method: "Evolução por nível (nível 55)" },
  ],
  "cyndaquil-line": [
    { slug: "cyndaquil", name: "Cyndaquil", method: "Escolha inicial em Johto" },
    { slug: "quilava", name: "Quilava", method: "Evolução por nível (nível 14)" },
    { slug: "typhlosion", name: "Typhlosion", method: "Evolução por nível (nível 36)" },
  ],
  "totodile-line": [
    { slug: "totodile", name: "Totodile", method: "Escolha inicial em Johto" },
    { slug: "croconaw", name: "Croconaw", method: "Evolução por nível (nível 18)" },
    { slug: "feraligatr", name: "Feraligatr", method: "Evolução por nível (nível 30)" },
  ],
  togepi: [
    { slug: "togepi", name: "Togepi", method: "Ovo recebido no início de Johto" },
    { slug: "togetic", name: "Togetic", method: "Evolução por nível (nível 20)" },
    { slug: "togekiss", name: "Togekiss", method: "Uso da Evolstone" },
  ],
  tyranitar: [
    { slug: "larvitar", name: "Larvitar", method: "Encontro nas cavernas profundas" },
    { slug: "pupitar", name: "Pupitar", method: "Evolução por nível (nível 30)" },
    { slug: "tyranitar", name: "Tyranitar", method: "Evolução por nível (nível 55)" },
  ],
  ampharos: [
    { slug: "mareep", name: "Mareep", method: "Encontro nas pastagens de Johto" },
    { slug: "flaaffy", name: "Flaaffy", method: "Evolução por nível (nível 15)" },
    { slug: "ampharos", name: "Ampharos", method: "Evolução por nível (nível 30)" },
  ],
  "treecko-line": [
    { slug: "treecko", name: "Treecko", method: "Escolha inicial em Hoenn" },
    { slug: "grovyle", name: "Grovyle", method: "Evolução por nível (nível 16)" },
    { slug: "sceptile", name: "Sceptile", method: "Evolução por nível (nível 36)" },
  ],
  "torchic-line": [
    { slug: "torchic", name: "Torchic", method: "Escolha inicial em Hoenn" },
    { slug: "combusken", name: "Combusken", method: "Evolução por nível (nível 16)" },
    { slug: "blaziken", name: "Blaziken", method: "Evolução por nível (nível 36)" },
  ],
  "mudkip-line": [
    { slug: "mudkip", name: "Mudkip", method: "Escolha inicial em Hoenn" },
    { slug: "marshtomp", name: "Marshtomp", method: "Evolução por nível (nível 16)" },
    { slug: "swampert", name: "Swampert", method: "Evolução por nível (nível 36)" },
  ],
  gardevoir: [
    { slug: "ralts", name: "Ralts", method: "Encontro nas rotas de Hoenn" },
    { slug: "kirlia", name: "Kirlia", method: "Evolução por nível (nível 20)" },
    { slug: "gardevoir", name: "Gardevoir", method: "Evolução por nível (nível 30)" },
  ],
  metagross: [
    { slug: "beldum", name: "Beldum", method: "Presente após a liga" },
    { slug: "metang", name: "Metang", method: "Evolução por nível (nível 20)" },
    { slug: "metagross", name: "Metagross", method: "Evolução por nível (nível 45)" },
  ],
  salamence: [
    { slug: "bagon", name: "Bagon", method: "Encontro em cavernas de Hoenn" },
    { slug: "shelgon", name: "Shelgon", method: "Evolução por nível (nível 30)" },
    { slug: "salamence", name: "Salamence", method: "Evolução por nível (nível 50)" },
  ],
  "turtwig-line": [
    { slug: "turtwig", name: "Turtwig", method: "Escolha inicial em Sinnoh" },
    { slug: "grotle", name: "Grotle", method: "Evolução por nível (nível 18)" },
    { slug: "torterra", name: "Torterra", method: "Evolução por nível (nível 32)" },
  ],
  "chimchar-line": [
    { slug: "chimchar", name: "Chimchar", method: "Escolha inicial em Sinnoh" },
    { slug: "monferno", name: "Monferno", method: "Evolução por nível (nível 14)" },
    { slug: "infernape", name: "Infernape", method: "Evolução por nível (nível 36)" },
  ],
  "piplup-line": [
    { slug: "piplup", name: "Piplup", method: "Escolha inicial em Sinnoh" },
    { slug: "prinplup", name: "Prinplup", method: "Evolução por nível (nível 16)" },
    { slug: "empoleon", name: "Empoleon", method: "Evolução por nível (nível 36)" },
  ],
  garchomp: [
    { slug: "gible", name: "Gible", method: "Encontro nas cavernas de Sinnoh" },
    { slug: "gabite", name: "Gabite", method: "Evolução por nível (nível 24)" },
    { slug: "garchomp", name: "Garchomp", method: "Evolução por nível (nível 48)" },
  ],
  lucario: [
    { slug: "riolu", name: "Riolu", method: "Ovo com amizade alta" },
    { slug: "lucario", name: "Lucario", method: "Evolução por amizade durante o dia" },
  ],
  "snivy-line": [
    { slug: "snivy", name: "Snivy", method: "Escolha inicial em Unova" },
    { slug: "servine", name: "Servine", method: "Evolução por nível (nível 17)" },
    { slug: "serperior", name: "Serperior", method: "Evolução por nível (nível 36)" },
  ],
  "tepig-line": [
    { slug: "tepig", name: "Tepig", method: "Escolha inicial em Unova" },
    { slug: "pignite", name: "Pignite", method: "Evolução por nível (nível 17)" },
    { slug: "emboar", name: "Emboar", method: "Evolução por nível (nível 36)" },
  ],
  "oshawott-line": [
    { slug: "oshawott", name: "Oshawott", method: "Escolha inicial em Unova" },
    { slug: "dewott", name: "Dewott", method: "Evolução por nível (nível 17)" },
    { slug: "samurott", name: "Samurott", method: "Evolução por nível (nível 36)" },
  ],
  zoroark: [
    { slug: "zorua", name: "Zorua", method: "Encontro raro nas florestas de Unova" },
    { slug: "zoroark", name: "Zoroark", method: "Evolução por nível (nível 30)" },
  ],
  chandelure: [
    { slug: "litwick", name: "Litwick", method: "Encontro noturno em Unova" },
    { slug: "lampent", name: "Lampent", method: "Evolução por nível (nível 41)" },
    { slug: "chandelure", name: "Chandelure", method: "Uso da Evolstone" },
  ],
  hydreigon: [
    { slug: "deino", name: "Deino", method: "Encontro raro nas cavernas" },
    { slug: "zweilous", name: "Zweilous", method: "Evolução por nível (nível 50)" },
    { slug: "hydreigon", name: "Hydreigon", method: "Evolução por nível (nível 64)" },
  ],
};

export const pokemonList: Pokemon[] = pokemonCatalog as Pokemon[];

export function getPokemon(slug: string): Pokemon | undefined {
  return pokemonList.find((item) => item.slug === slug);
}

export function getFamily(pokemon: Pokemon): PokemonEvolutionMember[] {
  return evolutionFamilies[pokemon.familyId] ?? [];
}

export const pokemonTypes = Array.from(new Set(pokemonList.flatMap((item) => item.types))).sort((a, b) =>
  a.localeCompare(b, "pt-BR"),
);

export const pokemonRegions = Array.from(new Set(pokemonList.map((item) => item.region)));
