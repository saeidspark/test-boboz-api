import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { buildOpenSeaJson } from "@/lib/metadata";

interface DynData {
  xp: number;
  level: number;
}

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const numericId = parseInt(id); // Token ID از URL
  if (isNaN(numericId)) {
    return NextResponse.json({ error: "Invalid token ID" }, { status: 400 });
  }

  const metadataPath = path.join(process.cwd(), "data", "metadata.json");
  const dynPath = path.join(process.cwd(), "data", "dyn.json");

  const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));

  let dynData: Record<string, DynData> = {};
  try {
    dynData = JSON.parse(fs.readFileSync(dynPath, "utf-8"));
  } catch {
    dynData = {};
  }

  // شیفت +1: Token ID = 0 → edition = 1
  const item = metadata.find((i: any) => i.edition === numericId + 1);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const dyn: DynData = dynData[item.edition] || { xp: 0, level: 0 };

  return NextResponse.json(buildOpenSeaJson(item, dyn));
}
