export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const originalError = console.error;

  console.error = (...args: unknown[]) => {
    const message = args
      .map((arg) => (arg instanceof Error ? arg.message : String(arg)))
      .join(" ");

    if (message.includes("NoFallbackError")) return;

    originalError.apply(console, args);
  };
}
