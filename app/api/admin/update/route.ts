import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface DynData {
  xp: number;
  level: number;
}

export async function POST(req: Request) {
  const body = await req.json();
  const { id, xp, level } = body;

  if (id === undefined || xp === undefined || level === undefined) {
    return NextResponse.json({ error: "id, xp, level required" }, { status: 400 });
  }

  const dynPath = path.join(process.cwd(), "data", "dyn.json");
  let dynData: Record<string, DynData> = {};

  try {
    dynData = JSON.parse(fs.readFileSync(dynPath, "utf-8"));
  } catch {
    dynData = {};
  }

  dynData[id] = { xp, level };
  fs.writeFileSync(dynPath, JSON.stringify(dynData, null, 2));

  return NextResponse.json({ success: true, data: dynData[id] });
}
