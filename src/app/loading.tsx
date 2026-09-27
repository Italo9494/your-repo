export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8" aria-busy="true">
      <span className="sr-only">Carregando conteúdo…</span>

      <div className="h-4 w-40 animate-pulse-soft rounded-full bg-line" />

      <div className="mt-6 h-10 w-2/3 max-w-xl animate-pulse-soft rounded-2xl bg-line" />
      <div className="mt-4 h-4 w-full max-w-2xl animate-pulse-soft rounded-full bg-line" />
      <div className="mt-3 h-4 w-4/5 max-w-xl animate-pulse-soft rounded-full bg-line" />

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-3xl border border-line bg-surface p-0"
          >
            <div className="h-36 w-full animate-pulse-soft bg-line" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-24 animate-pulse-soft rounded-full bg-line" />
              <div className="h-5 w-3/4 animate-pulse-soft rounded-full bg-line" />
              <div className="h-4 w-full animate-pulse-soft rounded-full bg-line" />
              <div className="h-4 w-5/6 animate-pulse-soft rounded-full bg-line" />
              <div className="h-9 w-full animate-pulse-soft rounded-full bg-line" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
