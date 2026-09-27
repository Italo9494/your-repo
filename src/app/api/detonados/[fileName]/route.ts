import fs from "node:fs";
import path from "node:path";

import { NextResponse } from "next/server";

const IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"];

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ fileName: string }> },
) {
  const { fileName } = await params;
  const decoded = decodeURIComponent(fileName);
  const filePath = path.join(process.cwd(), "Detonados", decoded);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Arquivo não encontrado." }, { status: 404 });
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType =
    ext === ".pdf"
      ? "application/pdf"
      : IMAGE_EXTENSIONS.includes(ext)
        ? `image/${ext === ".jpg" || ext === ".jpeg" ? "jpeg" : ext.slice(1)}`
        : "application/octet-stream";

  const buffer = fs.readFileSync(filePath);
  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600, immutable",
    },
  });
}
