import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { buildOpenSeaJson } from "@/lib/metadata";

interface DynData {
  xp: number;
  level: number;
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const metadataPath = path.join(process.cwd(), "data", "metadata.json");
  const dynPath = path.join(process.cwd(), "data", "dyn.json");

  const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"));
  let dynData: Record<string, DynData> = {};

  try {
    dynData = JSON.parse(fs.readFileSync(dynPath, "utf-8"));
  } catch {
    dynData = {};
  }

  const item = metadata.find((i: any) => i.edition.toString() === id);
  if (!item) {
    return new NextResponse(
      JSON.stringify({ error: "Not found" }, null, 2),
      {
        status: 404,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }
    );
  }

  const dyn: DynData = dynData[id] || { xp: 0, level: 0 };
  const responseData = buildOpenSeaJson(item, dyn);

  return new NextResponse(JSON.stringify(responseData, null, 2), {
    status: 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
