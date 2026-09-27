import Link from "next/link";

import { PokeballIcon } from "@/components/icons/PokeballIcon";

const footerLinks = [
  {
    title: "Navegar",
    links: [
      { label: "Início", href: "/" },
      { label: "Jogos", href: "/jogos" },
      { label: "Detonados", href: "/detonados" },
      { label: "Categorias", href: "/categorias" },
      { label: "Guias", href: "/guias" },
    ],
  },
  {
    title: "Conteúdos",
    links: [
      { label: "Pokémon", href: "/pokemon" },
      { label: "Mapas", href: "/mapas" },
      { label: "Dicas", href: "/dicas" },
      { label: "Favoritos", href: "/favoritos" },
      { label: "Histórico", href: "/historico" },
    ],
  },
  {
    title: "Institucional",
    links: [
      { label: "Sobre", href: "/sobre" },
      { label: "Contato", href: "/contato" },
      { label: "Política de Privacidade", href: "/politica-de-privacidade" },
      { label: "Termos de Uso", href: "/termos-de-uso" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2" aria-label="PokéDetonado">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-red text-white">
                <PokeballIcon className="h-5 w-5" />
              </span>
              <span className="text-lg font-extrabold tracking-tight">
                <span className="text-brand-red">Poké</span>
                <span className="text-brand-blue">Detonado</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Portal independente com detonados, guias passo a passo, mapas e dicas para
              quem quer completar os jogos de Pokémon sem perder tempo.
            </p>
          </div>

          {footerLinks.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-sm font-bold uppercase tracking-wider text-ink">
                {group.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition hover:text-brand-blue"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 space-y-3 border-t border-line pt-6 text-xs leading-relaxed text-muted">
          <p>
            PokéDetonado é um projeto independente e não possui afiliação oficial com a
            Nintendo, The Pokémon Company ou Game Freak.
          </p>
          <p>
            Pokémon e todas as marcas relacionadas são propriedade de seus respectivos
            detentores. Os textos e guias deste site são de autoria própria.
          </p>
          <p>© {new Date().getFullYear()} PokéDetonado. Conteúdo original em português do Brasil.</p>
        </div>
      </div>
    </footer>
  );
}
