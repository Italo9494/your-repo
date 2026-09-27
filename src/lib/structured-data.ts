import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

interface CrumbInput {
  label: string;
  href?: string;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "pt-BR",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/pesquisa?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items: CrumbInput[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: absoluteUrl(item.href) } : {}),
    })),
  };
}

interface ArticleInput {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}

export function articleJsonLd({
  title,
  description,
  path,
  datePublished,
  dateModified,
  image,
}: ArticleInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(path),
    inLanguage: "pt-BR",
    mainEntityOfPage: absoluteUrl(path),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(image ? { image: [absoluteUrl(image)] } : {}),
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: absoluteUrl("/icon") },
    },
  };
}
