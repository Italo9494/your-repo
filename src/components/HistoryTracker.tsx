"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { recordVisit } from "@/lib/history";

/**
 * Registra cada página visitada no histórico do navegador (localStorage).
 * Fica dentro de <Suspense> no layout porque lê os search params.
 */
export function HistoryTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    const href = search ? `${pathname}?${search}` : pathname;
    recordVisit(href, document.title);
  }, [pathname, search]);

  return null;
}
