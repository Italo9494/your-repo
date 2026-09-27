# PokéDetonado

Portal independente de **detonados, guias, mapas e dicas** dos jogos de Pokémon, em
português do Brasil. Projeto construído em **Next.js (App Router) + TypeScript +
Tailwind CSS**, com dados em módulos TypeScript prontos para serem trocados por um
banco de dados no futuro.

## Como rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm start        # serve o build de produção
npm run lint     # ESLint
```

## Rotas principais

| Rota                       | Descrição                                            |
| -------------------------- | ---------------------------------------------------- |
| `/`                        | Página inicial (hero, jogos, progresso, populares, guias, mapas) |
| `/jogos`                   | Filtros por geração, plataforma, região, dificuldade, disponibilidade e ordenação |
| `/detonados`               | Detonados publicados e em produção + botão “continuar” |
| `/detonado/[slug]`         | Detonado: índice, progresso, Pokémon do guia e conteúdos relacionados |
| `/detonado/[slug]/[etapa]` | Etapa do guia com sidebar, dicas e navegação anterior/próxima |
| `/guias` e `/guias/[slug]` | Guias por categoria, artigos relacionados e jogos citados |
| `/categorias` e `/categorias/[slug]` | Hub de categorias (guias + dicas por tema) |
| `/pokemon` e `/pokemon/[slug]` | Pokédex com filtros de tipo, região, geração e ordenação |
| `/mapas` e `/mapas/[slug]` | Mapas por região com locais importantes               |
| `/dicas` e `/dicas/[slug]` | Dicas curtas com categorias e relacionadas             |
| `/pesquisa?q=&tipo=`       | Busca global com filtro por tipo de conteúdo e destaques |
| `/favoritos`               | Favoritos e progresso salvos no navegador              |
| `/historico`               | Páginas visitadas, buscas recentes e “continuar de onde parei” |
| `/sobre`, `/contato`, `/politica-de-privacidade`, `/termos-de-uso` | Páginas institucionais |

## Recursos

- **Categorias** — hub em `/categorias` que agrega guias e dicas por tema, com contagem e
  páginas próprias por categoria.
- **Pesquisa global** — busca sem acento em todo o conteúdo, filtro por tipo de conteúdo
  (`?tipo=`), trecho encontrado destacado e buscas recentes salvas.
- **Filtros** — jogos (geração, plataforma, região, dificuldade, disponibilidade,
  ordenação) e Pokédex (tipo, região, geração, ordenação).
- **Favoritos e progresso** — salvos em `localStorage` (`pokedetonado:favoritos` e
  `pokedetonado:progresso`), com barra de progresso por detonado.
- **Histórico** — últimas páginas visitadas e buscas recentes
  (`pokedetonado:historico`), com página própria em `/historico`.
- **Continuar de onde parei** — botão no cabeçalho e card na home/detonados que aponta
  para a última etapa visitada ou para a próxima etapa não concluída.
- **Breadcrumbs, anterior/próxima e índice lateral** — em todas as páginas de conteúdo.
- **Relacionados** — artigos, jogos e Pokémon relacionados nas páginas de detalhe.
- **Mais populares / Atualizados recentemente** — seções da home geradas a partir de
  `src/lib/rankings.ts` (métricas de demonstração prontas para virarem API).

`sitemap.xml` e `robots.txt` são gerados por `src/app/sitemap.ts` e `src/app/robots.ts`.
O favicon (`src/app/icon.tsx`) e a imagem social (`src/app/opengraph-image.tsx`) são
gerados em PNG pelo próprio Next em cada build — a mesma arte entra em `og:image` e
`twitter:image` de todas as páginas.

## Estrutura

```
src/
  app/            # rotas, layouts, metadata, sitemap, robots, 404
  components/     # componentes reutilizáveis (Header, Footer, cards, sidebar…)
  data/           # base de dados em TypeScript (trocar por API/banco depois)
  lib/            # stores locais, busca global e utilitários de SEO
```

### Base de dados

- `src/data/games.ts` — 18 jogos com geração, plataforma, região e cores de capa.
- `src/data/walkthroughs.ts` — detonados; **FireRed** é o exemplo completo (10 etapas),
  Emerald e Diamond têm etapas publicadas e os demais jogos têm capítulos planejados.
- `src/data/pokemon.ts` — Pokédex com tipos, região e famílias de evolução.
- `src/data/guides.ts`, `tips.ts`, `maps.ts` — artigos e mapas das regiões.

Para adicionar um detonado: acrescente um objeto em `walkthroughs.ts` com a lista de
`chapters`. As rotas `/detonado/[slug]/[etapa]` são geradas automaticamente
(`generateStaticParams`).

### Imagens

Nenhuma imagem externa é usada. As capas são ilustrações geradas em CSS pelo componente
`CoverArt`. Para usar uma arte própria, preencha o campo `cover` (caminho/URL) no objeto
do jogo ou do mapa — o componente troca automaticamente por `next/image`, sem alterar o
layout.

### Dados no navegador (sem backend)

- **Favoritos** (`src/lib/favorites.ts`): jogos, guias, Pokémon e etapas.
- **Progresso** (`src/lib/progress.ts`): etapas concluídas por jogo, exibido em barras
  de progresso e no painel de favoritos.

Ambos usam `localStorage` por meio de um store pequeno com `useSyncExternalStore`
(`src/lib/local-store.ts`), o que mantém a primeira renderização idêntica ao HTML do
servidor. Para conectar um banco de dados, basta substituir o conteúdo desses módulos
por chamadas de API mantendo a mesma interface.

## Convenções

- Conteúdo da interface 100% em português do Brasil; textos originais.
- Componentes funcionam como Server Components sempre que possível; só o que precisa de
  estado (menu, filtros, favoritos, progresso) é Client Component.
- Acessibilidade: HTML semântico, links de atalho para o conteúdo, `aria-*` em menus e
  barras de progresso, foco visível e contraste alto.
- Aviso de independência no rodapé: sem afiliação com Nintendo, The Pokémon Company ou
  Game Freak.
