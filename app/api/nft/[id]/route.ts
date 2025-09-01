import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { buildOpenSeaJson } from "@/lib/metadata";

interface DynData { xp: number; level: number }

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const filePath = path.join(process.cwd(), "data", "metadata.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const item = data.find((i: any) => i.edition.toString() === id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const dyn: DynData = { xp: 0, level: 0 }; // می‌تونید داینامیک کنید بعداً
  const url = undefined;

  return NextResponse.json(buildOpenSeaJson(item, dyn, url));
}
