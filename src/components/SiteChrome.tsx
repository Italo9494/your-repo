"use client";

import { usePathname } from "next/navigation";
import { Suspense, type ReactNode } from "react";

interface Props {
  header: ReactNode;
  footer: ReactNode;
  tracker: ReactNode;
  storage: ReactNode;
  children: ReactNode;
}

export function SiteChrome({ header, footer, tracker, storage, children }: Props) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-blue focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Pular para o conteúdo
      </a>
      {storage}
      <Suspense fallback={null}>{tracker}</Suspense>
      {header}
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      {footer}
    </>
  );
}
