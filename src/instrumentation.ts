export async function onRequestError(
  error: unknown,
  request: { method?: string; path?: string }
) {
  try {
    const fs = await import("node:fs");
    const message = error instanceof Error ? `${error.message}\n${error.stack ?? ""}` : String(error);
    fs.appendFileSync(
      "error.log",
      `\n[${new Date().toISOString()}] [request] ${request.method ?? ""} ${request.path ?? ""} :: ${message}\n`
    );
  } catch {}
}
