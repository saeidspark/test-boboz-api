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

  if (!id || xp === undefined || level === undefined) {
    return new NextResponse(
      JSON.stringify({ error: "id, xp, level required" }, null, 2),
      {
        status: 400,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }
    );
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

  return new NextResponse(
    JSON.stringify({ success: true, data: dynData[id] }, null, 2),
    {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}
